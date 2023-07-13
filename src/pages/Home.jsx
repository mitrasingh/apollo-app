import { TaskCard } from '../components/TaskCard'
import { SearchBar } from '../components/SearchBar'
import { Filter } from '../components/Filter'
import { Refresh } from '../components/Refresh'
import { useEffect, useState } from 'react'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '../utils/firebase-config'
import { Row, Col, Container } from 'react-bootstrap'

export const Home = () => {

  const [tasks, setTasks] = useState([])
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


  const refreshTasksHandle = () => setRefresh(true)


  // console.log(typeof refreshTasksHandle)

  return (
    <>
      <SearchBar />
      <Container className="mt-2">
        <Row>
          <Col xs lg="1">
            <Filter />      
          </Col>
          <Col className="mt-1 px-3">
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
