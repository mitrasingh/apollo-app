import { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { useNavigate } from "react-router-dom"  
import { useSelector } from "react-redux"
import { collection, addDoc } from "firebase/firestore"
import { db } from "../utils/firebase-config"

export const CreateTask = () => {
  
  // state to retrieve and hold users form field information
  const [taskName, setTaskName] = useState("")
  const [descriptionTask, setDescriptionTask] = useState("")
  const [statusProject, setStatusProject] = useState("")
  const [priorityLevel, setPriorityLevel] = useState("")
  const [dueDate, setDueDate] = useState("")

  // redirect user to home after submission via react router
  const navigate = useNavigate()

  // accessing redux state for users current properties
  const user = useSelector((state) => state.user)

  // sets state status level of the task
  const handleSetStatusProjectChange = (e) => {
    e.preventDefault()
    setStatusProject(e.target.value)
  }

  // sets state priority level of the task
  const handleSetPriorityLevel = (e) => {
    e.preventDefault()
    setPriorityLevel(e.target.value)
  }

  // uploads new task to database
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db,"tasks"), { //using firestore to generate task ID
        taskName,
        descriptionTask,
        statusProject,
        priorityLevel,
        dueDate,
        userId: user.userId,
      })
      navigate("/")
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <Container className="mt-4">
    <Form>

      <Form.Group className="mb-3" controlId="taskName">
        <Form.Label style={{fontSize: "10px"}} className="fw-bold">Task name</Form.Label>
        <Form.Control 
          style={{fontSize: "10px"}} 
          maxLength={50}
          type="text" 
          placeholder="Enter the name of task" 
          onChange={(e) => setTaskName(e.target.value)}
          />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label style={{fontSize: "10px"}} className="fw-bold">Description of task</Form.Label>
        <Form.Control 
          style={{fontSize: "10px", resize: "none"}} 
          as="textarea" 
          rows={3}
          maxLength={450}
          type="text" 
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
            <option value="">Select status options</option>
            <option value="On Hold">On Hold</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
            <option value="Cancelled">Cancelled</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="progress">
        <Form.Label style={{fontSize: "10px"}} className="fw-bold">What is the priority level of this project?</Form.Label>
        <Form.Select 
          style={{fontSize: "10px"}} 
          aria-label="Default select example"
          value={priorityLevel}
          onChange={handleSetPriorityLevel}>
            <option value="">Select priority level options</option>
            <option value="Urgent">Urgent</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="dueDate">
        <Form.Label style={{fontSize: "10px"}} className="fw-bold">Due date</Form.Label>
        <Form.Control 
          style={{fontSize: "10px"}} 
          type="text" 
          placeholder="mm/dd/yyyy" 
          onChange={(e) => setDueDate(e.target.value)}
        />
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
