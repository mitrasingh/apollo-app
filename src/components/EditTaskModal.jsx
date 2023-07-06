import { Button, Form, Modal, Stack, Image } from 'react-bootstrap'
import PropTypes from 'prop-types';
import { useState } from 'react';


export const EditTaskModal = ({ showEditModal, handleEditModalClose, creatorPhoto, creatorName }) => {

    const [taskName, setTaskName] = useState("")
    const [descriptionTask, setDescriptionTask] = useState("")
    const [statusProject, setStatusProject] = useState("")
    const [priorityLevel, setPriorityLevel] = useState("")
    const [dueDate, setDueDate] = useState("")

    const handleSetStatusProjectChange = (e) => {
        setStatusProject(e.target.value)
    }

    const handleSetPriorityLevel = (e) => {
        setPriorityLevel(e.target.value)
    }

    const handleSubmit = () => {
        console.log(taskName)
        console.log(descriptionTask)
        console.log(statusProject)
        console.log(priorityLevel)
        console.log(dueDate)

        setTimeout(() => {
            handleEditModalClose()
        }, 2000)
    }
    
    return (
            <>
            <Modal show={showEditModal} onHide={handleEditModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Project Name</Modal.Title>
                </Modal.Header>

                <Modal.Body style={{fontSize:"11px"}}>
                    <Form.Group className="mb-3" controlId="progress">
                        <Form.Label className="fw-bold" style={{margin: "2px"}}>Current Task Name</Form.Label>
                        <Form.Control 
                            style={{fontSize: "10px"}} 
                            type="text" 
                            placeholder="Current Name"
                            onChange={(e) => setTaskName(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="progress">
                        <Form.Label className="fw-bold" style={{margin: "2px"}}>Description of Task</Form.Label>
                        <Form.Control 
                            style={{fontSize: "10px"}} 
                            type="text" as="textarea" 
                            rows={3} 
                            placeholder="Here will be the description of the individual task. Will put a limit on how many characters will be in this area. Maybe will implement a scroll feature if it's too long." 
                            onChange={(e) => setDescriptionTask(e.target.value)}
                        />
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="progress">
                        <Form.Label className="fw-bold" style={{margin: "2px"}}>Status of Project</Form.Label>
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

                    <Form.Group className="mb-3" controlId="progress">
                        <Form.Label className="fw-bold" style={{margin: "2px"}}>Due Date</Form.Label>
                        <Form.Control 
                            style={{fontSize: "10px"}} 
                            type="text" 
                            placeholder="06/14/2023"
                            onChange={(e) => setDueDate(e.target.value)}
                            />
                    </Form.Group>

                    <Stack direction="horizontal">
                        <Image
                            style={{
                                height: "35px",
                                width: "35px",
                                objectFit: "cover",
                                borderRadius: "50%"
                            }} 
                            src={creatorPhoto} // user photo will be placed here
                            roundedCircle 
                        />
                        <p style={{fontSize: "10px"}} className="mt-3 ms-2">Created by: {creatorName}</p>
                    </Stack>

                </Modal.Body>

                <Modal.Footer>
                    <Button 
                        style={{fontSize: "10px", maxHeight: "30px"}} 
                        className="ms-2" 
                        variant="secondary" 
                        size="sm" 
                        onClick={handleEditModalClose}>
                        Cancel
                    </Button>

                    <Button 
                        style={{fontSize: "10px", maxHeight: "30px"}} 
                        className="ms-2" 
                        variant="primary" 
                        size="sm" 
                        type="submit"
                        onClick={handleSubmit}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>     
            </>
        )
    }

EditTaskModal.propTypes = {
    showEditModal: PropTypes.any,
    handleEditModalClose: PropTypes.any,
    creatorPhoto: PropTypes.any,
    creatorName: PropTypes.any
}