import { Container, Form, Button } from 'react-bootstrap'

export const CreateTopicForm = () => {
  return (
    <Container style={{border: "2px solid grey", maxWidth:"97.5%"}} className="mt-3 pb-3">
    <Container style={{maxWidth: "85%"}} className="mt-3">
        <Form>
            <Form.Group className="mb-3" controlId="title">
            <Form.Control 
            style={{fontSize: "10px"}} 
            maxLength={50}
            type="text" 
            placeholder="Title" 
            />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
            <Form.Control 
            style={{fontSize: "10px"}} 
            maxLength={100000}
            rows={5}
            type="text" 
            as="textarea"
            placeholder="Shout it out..." 
            />
            </Form.Group>
        </Form>
        <Button 
            style={{fontSize: "10px", maxHeight: "30px"}} 
            className="ms-2" 
            variant="secondary" 
            size="sm" 
            >
            Cancel
        </Button>

       <Button 
            style={{fontSize: "10px", maxHeight: "30px", MozColumnWidth:"40px"}} 
            className="ms-2" 
            variant="primary" 
            size="sm" 
            type="submit"
            >
            Post
        </Button>        
    </Container>
    </Container>
  )
}
