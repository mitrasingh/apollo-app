import { TaskCard } from '../components/TaskCard'
import { SearchBar } from '../components/SearchBar'
import { Filter } from '../components/Filter'
import { Refresh } from '../components/Refresh'
import { useEffect, useState } from 'react'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '../utils/firebase-config'
import { Row, Col, Container } from 'react-bootstrap'


export const Home = () => {

  // initial state for task data from database
  const [tasks, setTasks] = useState([])

  // result of tasks that have been filtered by options from filterbutton (Filter.jsx)
  const [filteredTasks, setFilteredTasks] = useState([])

  // displays which array of tasks should be shown 
  const [displaySorted, setDisplaySorted] = useState(false)
  const [displayFiltered, setDisplayFiltered] = useState(false)
  const [displaySearched, setDisplaySearched] = useState(false)

  //user input for SearchBar
  const [userInput, setUserInput] = useState("")

  // refreshes the tasks state which retrieve any new tasks from database
  const [refresh, setRefresh] = useState(false) 

  // pulling data from database and mapping each task into the tasks variable
  useEffect(() => {
    const getTasks = async () => {
      try {
        const data = await getDocs(query(collection(db, "tasks")))
        setTasks(data.docs.map((doc) => ({...doc.data(), taskId: doc.id})))
      } catch (error) {
        console.log(error)
      }
    }
      getTasks()
      setRefresh(false)
      console.log('api retrieval')
  },[refresh])
  
  // refreshes tasks state by retrieving any new data from database, clears displays to original list, clears user search value
  const refreshTasksHandle = () => {
    setRefresh(true)
    setUserInput("")
    setDisplaySorted(false)
    setDisplayFiltered(false)
    setDisplaySearched(false)
  }  

  // receiving user input from SearchBar component
  const userInputSearchBar = (formInput) => {
    if (userInput.length > 0) {
      refreshTasksHandle()
    }
    setUserInput(formInput)
    setDisplaySearched(true)
  }



  // filter options fuctionality for the dropdown filter button 
  const filterNewestHandle = () => {
    setTasks([...tasks].sort((a,b) => new Date(b.dueDate) - new Date(a.dueDate)))
    setDisplaySorted(true)
    setDisplayFiltered(false)
    setDisplaySearched(false)
  }

  const filterOldestHandle = () => {
    setTasks([...tasks].sort((a,b) => new Date(a.dueDate) - new Date(b.dueDate)))
    setDisplaySorted(true)
    setDisplayFiltered(false)
    setDisplaySearched(false)
  }
  
  const filterPriorityHandle = (priority) => {
    setFilteredTasks(tasks.filter(task => task.priorityLevel === priority))
    setDisplayFiltered(true)
    setDisplaySorted(false)
    setDisplaySearched(false)
  }

  const filterStatusHandle = (status) => {
    setFilteredTasks(tasks.filter(task => task.statusProject === status))
    setDisplayFiltered(true)
    setDisplaySorted(false)
    setDisplaySearched(false)
  }
  
  return (
    <>
      <SearchBar userInputSearchBar={userInputSearchBar} />
      <Container className="mt-2">
        <Row>
          <Col xs lg="1">
            <Filter 
              filterNewestHandle={filterNewestHandle} 
              filterOldestHandle={filterOldestHandle} 
              filterPriorityHandle={filterPriorityHandle}
              filterStatusHandle={filterStatusHandle}
            />      
          </Col>
          <Col xs lg="2" className="mt-1 px-3">
            <Refresh refreshTasksHandle={refreshTasksHandle} />
          </Col>
        </Row>

        {/* initial display that is shown */}
        {!displayFiltered && !displaySorted && userInput === "" ?
          tasks.map((task) => {
            return (
              <TaskCard refreshTasksHandle={refreshTasksHandle} task={task} key={task.taskId} />
            )
          })
        :
          null
        }

        {/* if user inputs any value into search bar */}
        {displaySearched ? 
        tasks
          .filter((task) => {
              return userInput.toLowerCase() === "" ? null : task.taskName.toLowerCase().includes(userInput)
        })
          .map((task) => (
            <TaskCard refreshTasksHandle={refreshTasksHandle} task={task} key={task.taskId} />
        ))
        :
          null
        }


        {/* if filtered options (priority level or status) is clicked via filter button */}
        {displayFiltered ? 
          filteredTasks.map((task) => {
            return (
              <TaskCard refreshTasksHandle={refreshTasksHandle} task={task} key={task.taskId} />
            )  
          })
        :  
          null
        } 

        {/* if filtered options (priority levl or status) is clicked and no tasks match criteria */}
        {displayFiltered && filteredTasks.length == 0 ? (<h5>No tasks to display</h5>) : null}


        {/* if sorted options (newest or oldest) is clicked via filter button */}
        {displaySorted ? 
          tasks.map((task) => {
            return (
              <TaskCard refreshTasksHandle={refreshTasksHandle} task={task} key={task.taskId} />
            )
          })
        :
          null
        } 

        {/* if sorted options (newest or oldest) is clicked and no tasks match criteria */}
        {displaySorted && tasks.length == 0 ? (<h5>No tasks to display</h5>) : null}

     </Container>
    </>
  )
} 
