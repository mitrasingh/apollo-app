import { useState } from 'react'
import { ViewTaskModal } from './ViewTaskModal'
import { EditTaskModal } from './EditTaskModal'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import PropTypes from 'prop-types';



export const TaskCard = ( props ) => {

    const { taskName, statusProject, priorityLevel, dueDate, userId, taskId } = props.task

    const [show, setShow] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const handleClose = () => setShow(false)
    const handleEditModalClose = () => setShowEditModal(false)    

    return (
    <>
    <Container className="mt-3">
        <Card>
            <Card.Header style={{fontSize: "9px", height: "30px"}}>Task ID: {taskId}</Card.Header>
            <Card.Body>
                <Row style={{fontSize: "9px"}} className="fw-bold">
                    <Col xs lg="5">Name</Col>
                    <Col xs lg="3">Status</Col>
                    <Col xs lg="2">Priority Level</Col>
                    <Col xs lg="2">Due</Col>
                </Row>
                <Row style={{fontSize: "12px"}}>
                    <Col xs lg="5">{taskName}</Col>
                    <Col xs lg="3">{statusProject}</Col>
                    <Col xs lg="2">{priorityLevel}</Col>
                    <Col xs lg="2">{dueDate}</Col>
                </Row>
                <Row style={{height: "55px"}}>
                    <hr className="mt-2"></hr>
                    <Col xs lg="10" className="d-flex">
                        <img
                            src="src/img/default-profile.png"
                            width="35"
                            height="35"
                            className="d-inline-block align-top"
                            alt="Apollo Logo"
                            />
                        <p style={{fontSize: "10px"}} className="mt-2 ms-2">Created by: {userId}</p>
                    </Col>
                    <Col xs lg="2" className="d-flex mt-1">

                        {/* IF EDIT BUTTON IS CLICKED AND MATCHES LOGGED IN USER - MODAL IS SHOWN */}
                        <EditTaskModal showEditModal={showEditModal} handleEditModalClose={handleEditModalClose}/> 
                        <Button 
                            style={{fontSize: "10px", maxHeight: "30px"}} 
                            variant="primary" 
                            size="sm" 
                            className="px-3"
                            onClick={() => setShowEditModal(true)}>
                                Edit
                        </Button>

                        {/* IF VIEW BUTTON IS CLICKED MODAL IS SHOWN */}
                        <ViewTaskModal show={show} handleClose={handleClose}/> 
                        <Button 
                            style={{fontSize: "10px", maxHeight: "30px"}} 
                            variant="primary" 
                            size="sm" 
                            className="px-3 ms-2" 
                            onClick={() => setShow(true)}>
                                Details
                        </Button>

                    </Col>
                </Row>
            </Card.Body>
        </Card>
    </Container>
    </> 
    )
}

TaskCard.propTypes = {
    task: PropTypes.object,
    taskName: PropTypes.any,
    statusProject: PropTypes.any,
    priorityLevel: PropTypes.any,
    dueDate: PropTypes.any,
    userId: PropTypes.any,
    taskId: PropTypes.any
}
