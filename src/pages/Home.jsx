import { TaskCard } from '../components/TaskCard'
import { SearchBar } from '../components/SearchBar'
import { Filter } from '../components/Filter'
import { useEffect, useState } from 'react'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '../utils/firebase-config'

export const Home = () => {

  const [tasks, setTasks] = useState([])

  // SHOULD MAPPING TASK BE DONE AS A USEEFFECT? IN CONSOLE IT IS BEING REPEATED
  // MANY TIMES!!! 

  // pulling data from database and mapping each task into the tasks variable
  useEffect(() => {
    const getTasks = async () => {
      const data = await getDocs(query(collection(db, "tasks")))
      setTasks(data.docs.map((doc) => ({...doc.data(), taskId: doc.id})))
    }
    getTasks()
  },[])

  return (
    <>
      <SearchBar />
      <Filter />

      {/* mapping each task from tasks variable as per TaskCard */}
      {tasks.map((task) => {
        console.log(task.taskName)
        return (
            <TaskCard task={task} key={task.taskId} />
        )
      })}
    </>
  )
} 

