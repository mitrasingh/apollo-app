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
      console.log(tasks)
  },[refresh]) 

  
  // filter fuctionality for filter button 
  const filterNewestHandle = () => {
    const filterNewestTasks = [...tasks].sort((a,b) => new Date(b.dueDate) - new Date(a.dueDate));
    setTasks(filterNewestTasks)  
  }

  const filterOldestHandle = () => {
    const filterOldestTasks = [...tasks].sort((a,b) => new Date(a.dueDate) - new Date(b.dueDate));
    setTasks(filterOldestTasks)
  }
  
  const filterPriorityHandle = (level) => {
    const filterPriorityTasks = tasks.filter(task => task.priorityLevel === level)
    setTasks(filterPriorityTasks)
  }

  const filterStatusHandle = (level) => {
    const filterPriorityTasks = tasks.filter(task => task.statusProject === level)
    setTasks(filterPriorityTasks)
  }

  // resets to original task data when user clicks refresh button
  const refreshTasksHandle = () => setRefresh(true)

  // console.log(typeof refreshTasksHandle)

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
      </Container>

      {/* mapping each task from tasks variable as per TaskCard */}
      {tasks.map((task) => {
        return (
            <TaskCard refreshTasksHandle={refreshTasksHandle} task={task} key={task.taskId} />
        )
      })}
    </>
  )
} 
