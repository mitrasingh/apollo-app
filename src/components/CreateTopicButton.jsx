import { Container, Button } from 'react-bootstrap'

export const CreateTopicButton = () => {
  return (
    <Container>
        <Button
            style={{fontSize: "9px", maxHeight: "20px"}}
            className="d-flex align-items-center"
            variant="dark"
        >
            + Create Topic
        </Button>
    </Container>
  )
}
