import { TopicCard } from "../components/TopicCard"
import { Container } from "react-bootstrap"
import { CreateTopicForm } from "../components/CreateTopicForm"
import { useState } from "react"
import { Button } from 'react-bootstrap'

export const Shoutboard = () => {

  const [isCreateTopic, setIsCreateTopic] = useState(false)

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

        <TopicCard />        
      </Container>
  )
}
