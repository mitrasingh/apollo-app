import { TopicCard } from "../components/TopicCard"
import { Container } from "react-bootstrap"
import { CreateTopicForm } from "../components/CreateTopicForm"
import { useEffect, useState } from "react"
import { Button } from 'react-bootstrap'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '../utils/firebase-config'

export const Shoutboard = () => {

  // current state of data retrieved from getTopics function
  const [topics, setTopics] = useState([])

  // boolean state displaying the component CreateTopicForm.jsx when user invokes an action
  const [isCreateTopic, setIsCreateTopic] = useState(false)

  // boolean state which refreshes topic list when user posts a new topic via CreateTopicForm.jsx
  const [postRefresh, setPostRefresh] = useState(false)

  // function that retrieves data from firestore database by querying "topics" collection
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
  },[postRefresh])

  // button that handles boolean behavior for the display of component CreateTopicForm.jsx
  const handleCreateTopic = () => {
    !isCreateTopic ? setIsCreateTopic(true) : setIsCreateTopic(false)
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

        {isCreateTopic ? <CreateTopicForm setIsCreateTopic={setIsCreateTopic} setPostRefresh={setPostRefresh} /> : null}

        {topics.map((topic) => {
          return (
            <TopicCard topic={topic} key={topic.topicId}/>
          )
        })}
      </Container>
  )
}
