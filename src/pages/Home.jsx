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
  const [filteredTasks, setFilteredTasks] = useState([])

  const [displaySorted, setDisplaySorted] = useState(false)
  const [displayFiltered, setDisplayFiltered] = useState(false)

  // refreshes data retrieval, also used for editing task and seeing the task update when modal is closed
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

  // useEffect(() => {
  //   // setTasks(backupTasks)
  //   console.log(`setTasks to backupTasks: ${tasks[0].userId}`)
  // },[refresh])
  
  // resets to original task data when user clicks refresh button
  const refreshTasksHandle = () => setRefresh(true)

  // filter fuctionality for filter button 
  const filterNewestHandle = () => {
    setTasks([...tasks].sort((a,b) => new Date(b.dueDate) - new Date(a.dueDate)))
    setDisplaySorted(true)
    setDisplayFiltered(false)
    // setFilteredTasks([])
    // const filterNewestTasks = [...tasks].sort((a,b) => new Date(b.dueDate) - new Date(a.dueDate));
    // setTasks(filterNewestTasks)
  }

  const filterOldestHandle = () => {
    setTasks([...tasks].sort((a,b) => new Date(a.dueDate) - new Date(b.dueDate)))
    setDisplaySorted(true)
    setDisplayFiltered(false)
    // setFilteredTasks([])
    // const filterOldestTasks = [...tasks].sort((a,b) => new Date(a.dueDate) - new Date(b.dueDate));
    // setTasks(filterOldestTasks)
  }
  
  const filterPriorityHandle = (priority) => {
    setFilteredTasks(tasks.filter(task => task.priorityLevel === priority))
    setDisplaySorted(false)
    setDisplayFiltered(true)
    // const filterPriorityTasks = tasks.filter(task => task.priorityLevel === priority)
    // setTasks(filterPriorityTasks)
  }

  const filterStatusHandle = (status) => {
    setFilteredTasks(tasks.filter(task => task.statusProject === status))
    setDisplaySorted(false)
    setDisplayFiltered(true)
  }
  
  return (
    <>
      <SearchBar />
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


      {!displayFiltered && !displaySorted ?
        tasks.map((task) => {
          return (
            <TaskCard refreshTasksHandle={refreshTasksHandle} task={task} key={task.taskId} />
          )
        })
      :
        null
      }


      {displayFiltered ? 
        filteredTasks.map((task) => {
          return (
            <TaskCard refreshTasksHandle={refreshTasksHandle} task={task} key={task.taskId} />
          )  
        })
      :  
        null
      } 

      {displayFiltered && filteredTasks.length == 0 ? (<h5>No tasks to display</h5>) : null}
      

      
      {displaySorted ? 
        tasks.map((task) => {
          return (
            <TaskCard refreshTasksHandle={refreshTasksHandle} task={task} key={task.taskId} />
          )
        })
      :
        null
      } 

      {displaySorted && tasks.length == 0 ? (<h5>No tasks to display</h5>) : null}
      

     </Container>
    </>
  )
} 
