import { useState } from 'react'
import { ViewTaskModal } from './ViewTaskModal'
import { EditTaskModal } from './EditTaskModal'
import { Button, Card, Col, Container, Row, Image } from 'react-bootstrap'
import PropTypes from 'prop-types';
import { getStorage, getDownloadURL, ref } from 'firebase/storage';
// import { db } from '../utils/firebase-config';
// import { doc, getDoc } from 'firebase/firestore'


export const TaskCard = ( props ) => {

    const { taskName, statusProject, priorityLevel, dueDate, userId, taskId } = props.task

    const [show, setShow] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [creatorPhoto, setCreatorPhoto] = useState("")
    // const [creatorName, setCreatorName] = useState("")

    const handleClose = () => setShow(false)
    const handleEditModalClose = () => setShowEditModal(false)

    const storage = getStorage()
    const storageRef = ref(storage)
    
    const creatorInfo = async () => {
        try {
            const creatorPhotoURL = await getDownloadURL(ref(storageRef, `user-photo/${userId}`))
            if (creatorPhotoURL) {
                setCreatorPhoto(creatorPhotoURL)
            }
        } catch (error) {
            console.log(error)
        }
    }
    creatorInfo()

    console.log(creatorPhoto)


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
                        {/* <img
                            src={creatorPhoto}
                            width="35"
                            height="35"
                            className="d-inline-block align-top"
                            alt="Creator Photo"
                            /> */}
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

TaskCard.propTypes = {
    task: PropTypes.object,
    taskName: PropTypes.any,
    statusProject: PropTypes.any,
    priorityLevel: PropTypes.any,
    dueDate: PropTypes.any,
    userId: PropTypes.any,
    taskId: PropTypes.any
}
