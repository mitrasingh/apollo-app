import { TaskCard } from '../components/TaskCard'
import { SearchBar } from '../components/SearchBar'
import { Filter } from '../components/Filter'
import { useEffect, useState } from 'react'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '../utils/firebase-config'

export const Home = () => {

  const [tasks, setTasks] = useState([])
  const queryTasks = query(collection(db, "tasks"))

  useEffect(() => {
    const getTasks = async () => {
      const data = await getDocs(queryTasks)
      setTasks(data.docs.map((doc) => ({...doc.data(), taskId: doc.id})))
    }
    getTasks()
  },[])
  
  return (
    <>
      <SearchBar />
      <Filter />
      {tasks.map((task) => {
        return (
            <TaskCard task={task} key={task.taskId} />
        )
      })}
    </>
  )
} 

