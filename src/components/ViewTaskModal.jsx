import { Button, Modal, Stack } from 'react-bootstrap'


export const ViewTaskModal = ({ show, handleClose }) => {

    return (
        <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Project Name</Modal.Title>
            </Modal.Header>

            <Modal.Body style={{fontSize:"11px"}}>
                <p className="fw-bold" style={{margin: "0px"}}>Description of Task</p>
                <p> Here will be the description of the individual task. Will put a limit on
                    how many characters will be in this area. Maybe will implement a scroll 
                    feature if its too long.
                </p>

                <p className="fw-bold" style={{margin: "0px"}}>Status of Project</p>
                <p>In Progress</p>
               
                <p className="fw-bold" style={{margin: "0px"}}>Percent Completed</p>
                <p>75%</p>

                <p className="fw-bold" style={{margin: "0px"}}>Due Date</p>
                <p>06/14/2023</p>

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
                    variant="primary" 
                    size="sm" 
                    onClick={handleClose}>
                    Done
                </Button>
            </Modal.Footer>
        </Modal>     
        </>
    )
}