import { Button, Form, Modal, Stack } from 'react-bootstrap'
import PropTypes from 'prop-types';
import { useState } from 'react';


export const EditTaskModal = ({ showEditModal, handleEditModalClose }) => {

    const [projectName, setProjectName] = useState("")
    const [descriptionTask, setDescriptionTask] = useState("")
    const [statusProject, setStatusProject] = useState("")
    const [percentComplete, setPercentComplete] = useState("")
    const [dueDate, setDueDate] = useState("")

    const handleSetStatusProjectChange = (e) => {
        setStatusProject(e.target.value)
    }

    const handleSubmit = () => {
        console.log(projectName)
        console.log(descriptionTask)
        console.log(statusProject)
        console.log(percentComplete)
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
                            onChange={(e) => setProjectName(e.target.value)} />
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
                                <option value="">Select options</option>
                                <option value="On Hold">On Hold</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Done">Done</option>
                                <option value="Cancelled">Cancelled</option>
                        </Form.Select>
                    </Form.Group>
                
                    <Form.Group className="mb-3" controlId="progress">
                        <Form.Label className="fw-bold" style={{margin: "2px"}}>Percent Completed</Form.Label>
                        <Form.Control 
                            style={{fontSize: "10px"}} 
                            type="text" 
                            placeholder="75%"
                            onChange={(e) => setPercentComplete(e.target.value)}
                            />
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
                        <img
                            src="src/img/default-profile.png"
                            width="35"
                            height="35"
                            className="d-inline-block align-top"
                            alt="user photo"
                        />
                        <p style={{fontSize: "10px"}} className="mt-3 ms-2">Created by: UserName</p>
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
    handleEditModalClose: PropTypes.any
}