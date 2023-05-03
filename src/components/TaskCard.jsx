import { useState } from 'react'
import { ViewTaskModal } from './ViewTaskModal'
import { EditTaskModal } from './EditTaskModal'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'


export const TaskCard = () => {

    const [show, setShow] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const handleClose = () => setShow(false)
    const handleEditModalClose = () => setShowEditModal(false)

    return (
    <>
    <Container className="mt-1">
        <Card>
            <Card.Header style={{fontSize: "9px", height: "30px"}}>Task ID: 432564363</Card.Header>
            <Card.Body>
                <Row style={{fontSize: "9px"}} className="fw-bold">
                    <Col xs lg="5">Name</Col>
                    <Col xs lg="3">Status</Col>
                    <Col xs lg="2">Percentage</Col>
                    <Col xs lg="2">Due</Col>
                </Row>
                <Row style={{fontSize: "12px"}}>
                    <Col xs lg="5">Administer employee benefits</Col>
                    <Col xs lg="3">In Progress</Col>
                    <Col xs lg="2">75%</Col>
                    <Col xs lg="2">June 14, 2023</Col>
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
                        <p style={{fontSize: "10px"}} className="mt-2 ms-2">Created by: UserName</p>
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
