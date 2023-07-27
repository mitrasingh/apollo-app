import { CreateTopicButton } from "../components/CreateTopicButton"
import { TopicCard } from "../components/TopicCard"
import { Container } from "react-bootstrap"
import { CreateTopicForm } from "../components/CreateTopicForm"

export const Shoutboard = () => {
  return (
      <Container className="mt-4">
        <CreateTopicButton />
        <CreateTopicForm />
        <TopicCard />        
      </Container>
  )
}
