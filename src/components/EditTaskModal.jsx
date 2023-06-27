import { Button, Form, Modal, Stack } from 'react-bootstrap'
import PropTypes from 'prop-types';


export const EditTaskModal = ({ showEditModal, handleEditModalClose }) => {
  return (
        <>
        <Modal show={showEditModal} onHide={handleEditModalClose}>
            <Modal.Header closeButton>
                <Modal.Title>Project Name</Modal.Title>
            </Modal.Header>

            <Modal.Body style={{fontSize:"11px"}}>
                <Form.Group className="mb-3" controlId="progress">
                    <Form.Label className="fw-bold" style={{margin: "2px"}}>Current Task Name</Form.Label>
                    <Form.Control style={{fontSize: "10px"}} type="text" value="Project Name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="progress">
                    <Form.Label className="fw-bold" style={{margin: "2px"}}>Description of Task</Form.Label>
                    <Form.Control 
                        style={{fontSize: "10px"}} 
                        type="text" as="textarea" 
                        rows={3} 
                        value="Here will be the description of the individual task. Will put a limit on how many characters will be in this area. Maybe will implement a scroll feature if it's too long." 
                    />
                </Form.Group>


                <Form.Group className="mb-3" controlId="progress">
                    <Form.Label className="fw-bold" style={{margin: "2px"}}>Status of Project</Form.Label>
                    <Form.Select style={{fontSize: "10px"}} aria-label="Default select example">
                    <option>Select options</option>
                    <option value="1">On Hold</option>
                    <option value="2">In Progress</option>
                    <option value="3">Done</option>
                    <option value="4">Cancelled</option>
                    </Form.Select>
                </Form.Group>
               
                <Form.Group className="mb-3" controlId="progress">
                    <Form.Label className="fw-bold" style={{margin: "2px"}}>Percent Completed</Form.Label>
                    <Form.Control style={{fontSize: "10px"}} type="text" value="75%" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="progress">
                    <Form.Label className="fw-bold" style={{margin: "2px"}}>Due Date</Form.Label>
                    <Form.Control style={{fontSize: "10px"}} type="text" value="06/14/2023" />
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
                    type="submit">
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