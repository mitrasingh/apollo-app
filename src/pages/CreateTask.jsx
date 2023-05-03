import { Button, Container, Form } from 'react-bootstrap'

export const CreateTask = () => {
  return (
    <Container className="mt-4">
    <Form>

      <Form.Group className="mb-3" controlId="taskName">
        <Form.Label style={{fontSize: "10px"}} className="fw-bold">Task name</Form.Label>
        <Form.Control style={{fontSize: "10px"}} type="text" placeholder="Enter the name of task" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label style={{fontSize: "10px"}} className="fw-bold">Description of task</Form.Label>
        <Form.Control style={{fontSize: "10px", resize: "none"}} as="textarea" rows={3} placeholder="Give a short description of the task you are requesting."/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="progress">
        <Form.Label style={{fontSize: "10px"}} className="fw-bold">What is the status of this project?</Form.Label>
        <Form.Select style={{fontSize: "10px"}} aria-label="Default select example">
          <option>Select options</option>
          <option value="1">On Hold</option>
          <option value="2">In Progress</option>
          <option value="3">Done</option>
          <option value="4">Cancelled</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="progress">
        <Form.Label style={{fontSize: "10px"}} className="fw-bold">What percent of the task is complete?</Form.Label>
        <Form.Control style={{fontSize: "10px"}} type="text" placeholder="i.e. 25%" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="dueDate">
        <Form.Label style={{fontSize: "10px"}} className="fw-bold">Due date</Form.Label>
        <Form.Control style={{fontSize: "10px"}} type="text" placeholder="mm/dd/yyyy" />
      </Form.Group>

      <Button style={{fontSize: "10px", maxHeight: "30px"}} variant="secondary" size="sm" href="/">
        Cancel
      </Button>

      <Button style={{fontSize: "10px", maxHeight: "30px"}} className="ms-2" variant="primary" size="sm" type="submit">
        Submit
      </Button>
    </Form>
    </Container>
  )
}
