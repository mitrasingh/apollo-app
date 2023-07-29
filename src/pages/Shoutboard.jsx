import { TopicCard } from "../components/TopicCard"
import { Container } from "react-bootstrap"
import { CreateTopicForm } from "../components/CreateTopicForm"
import { useEffect, useState } from "react"
import { Button } from 'react-bootstrap'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '../utils/firebase-config'

export const Shoutboard = () => {

  // data state from firestore database from topics collection
  const [topics, setTopics] = useState([])

  // displays create topic form if user clicks create topic button
  const [isCreateTopic, setIsCreateTopic] = useState(false)

  // queries data from firestore database from topics collection
  useEffect(() => {
    const getTopics = async () => {
      try {
        const data = await getDocs(query(collection(db,"topics")))
        setTopics(data.docs.map((doc) => ({...doc.data(), topicId: doc.id})))
      } catch (error) {
        console.log(error)
      }
    }
      getTopics()
      console.log(topics)
  },[])

  // displays true/false of the display for create topic form
  const handleCreateTopic = () => {
    !isCreateTopic ? setIsCreateTopic(true) : setIsCreateTopic(false)
    console.log('shown')
  }

  return (
      <Container className="mt-4">

        <Button
          style={{fontSize: "9px", maxHeight: "20px"}}
          className="d-flex align-items-center"
          variant="dark"
          onClick={handleCreateTopic}
        >
          {!isCreateTopic ? "+ Create Topic" : "- Close"}
        </Button>

        {isCreateTopic ? <CreateTopicForm setIsCreateTopic={setIsCreateTopic} /> : null}

        {topics.map((topic) => {
          return (
            <TopicCard topic={topic} key={topic.topicId}/>        
          )
        })}
      </Container>
  )
}
