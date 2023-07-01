import { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export const CreateTask = () => {
  
  const [taskName, setTaskName] = useState("")
  const [descriptionTask, setDescriptionTask] = useState("")
  const [statusProject, setStatusProject] = useState("")
  const [percentComplete, setPercentComplete] = useState("")

  const [startDate, setStartDate] = useState(new Date()); //react-datepicker

  const handleSetStatusProjectChange = (e) => {
    e.preventDefault()
    setStatusProject(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(taskName)
    console.log(descriptionTask)
    console.log(statusProject)
    console.log(percentComplete)
    console.log(startDate)
  }

  // changing the input font size so it matches the other form fields font size
  const datePickerStyle = {
    fontSize: "10px",
  };

  return (
    <Container className="mt-4">
    <Form>

      <Form.Group className="mb-3" controlId="taskName">
        <Form.Label style={{fontSize: "10px"}} className="fw-bold">Task name</Form.Label>
        <Form.Control 
          style={{fontSize: "10px"}} 
          type="text" 
          placeholder="Enter the name of task" 
          onChange={(e) => setTaskName(e.target.value)}
          />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label style={{fontSize: "10px"}} className="fw-bold">Description of task</Form.Label>
        <Form.Control 
          style={{fontSize: "10px", resize: "none"}} 
          as="textarea" rows={3} 
          placeholder="Give a short description of the task you are requesting."
          onChange={(e) => setDescriptionTask(e.target.value)}
          />
      </Form.Group>

      <Form.Group className="mb-3" controlId="progress">
        <Form.Label style={{fontSize: "10px"}} className="fw-bold">What is the status of this project?</Form.Label>
        <Form.Select 
          style={{fontSize: "10px"}} 
          aria-label="Default select example"
          value={statusProject}
          onChange={handleSetStatusProjectChange}>
            <option value="">Select options</option>
            <option value="On Hold">On Hold</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
            <option value="Cancelled">Cancelled</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="progress">
        <Form.Label style={{fontSize: "10px"}} className="fw-bold">What percent of the task is complete?</Form.Label>
        <Form.Control 
          style={{fontSize: "10px"}} 
          type="text" 
          placeholder="What is the project percent completion?"
          value={statusProject === "Done" ? "100%" : "What is the project percent completion?"} 
          onChange={(e) => setPercentComplete(e.target.value)}
          />
      </Form.Group>

      <Form.Group className="mb-3" controlId="dueDate">
        <Form.Label style={{fontSize: "10px"}} className="fw-bold">Due date</Form.Label>
        {/* <Form.Control 
          style={{fontSize: "10px"}} 
          type="text" 
          placeholder="mm/dd/yyyy" 
          onChange={(e) => setDueDate(e.target.value)}
        /> */}
        <div style={datePickerStyle}>
          <DatePicker
            className="form-control"
            selected={startDate} 
            onChange={(date) => setStartDate(date)} 
          />
        </div>
          
      </Form.Group>


      <Button style={{fontSize: "10px", maxHeight: "30px"}} variant="secondary" size="sm" href="/">
        Cancel
      </Button>

      <Button 
        style={{fontSize: "10px", maxHeight: "30px"}} 
        className="ms-2" variant="primary" 
        size="sm" 
        type="submit"
        onClick={handleSubmit}
        >
        Submit
      </Button>
    </Form>
    </Container>
  )
}
