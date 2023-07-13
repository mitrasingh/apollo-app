import { Button, Form, Modal, Stack, Image } from 'react-bootstrap'
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { db } from '../utils/firebase-config'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

// props are from TaskCard.jsx
export const EditTaskModal = ({ showEditModal, handleEditModalClose, taskId, creatorPhoto, creatorName, refreshTasksHandle }) => {

    const [taskName, setTaskName] = useState("")
    const [descriptionTask, setDescriptionTask] = useState("")
    const [statusProject, setStatusProject] = useState("")
    const [priorityLevel, setPriorityLevel] = useState("")
    const [dueDate, setDueDate] = useState("")

    // retrieving current content from database
    useEffect(() => {
        const taskContent = async () => {
            try {
                const docRef = doc(db, "tasks", taskId)
                const docSnap = await getDoc(docRef)   
                if (docSnap.exists()) {
                    const data = docSnap.data()
                    setTaskName(data.taskName)
                    setDescriptionTask(data.descriptionTask)
                    setStatusProject(data.statusProject)
                    setPriorityLevel(data.priorityLevel)
                    setDueDate(data.dueDate)
                }
            } catch (error) {
                console.log(error)
            }
        }
        if (showEditModal) {
            taskContent()
        }     
    }, [showEditModal])

    // updating new task content to database
    const handleUpdate = async () => {
        try {
            await updateDoc (doc(db, "tasks", taskId), {
                taskName,
                descriptionTask,
                statusProject,
                priorityLevel,
                dueDate
            })
            if (updateDoc) {
                handleEditModalClose()
            }
        } catch (error) {
            console.log(error)
        } 
    }

    if (handleUpdate) {
        refreshTasksHandle
    }

    // handling drop down menu for project status
    const handleSetStatusProjectChange = (e) => {
        setStatusProject(e.target.value)
    }

    // handling drop down menu for priority level
    const handleSetPriorityLevel = (e) => {
        setPriorityLevel(e.target.value)
    }
    
    return (
            <>
            <Modal show={showEditModal} onHide={handleEditModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title style={{fontSize:"15px"}} className="fw-bold">Edit Task</Modal.Title>
                </Modal.Header>

                <Modal.Body style={{fontSize:"11px"}}>
                    <Form.Group className="mb-3" controlId="progress">
                        <Form.Label className="fw-bold" style={{margin: "2px"}}>Current Task Name</Form.Label>
                        <Form.Control 
                            style={{fontSize: "10px"}} 
                            type="text" 
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)} 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="progress">
                        <Form.Label className="fw-bold" style={{margin: "2px"}}>Description of Task</Form.Label>
                        <Form.Control 
                            style={{fontSize: "10px"}} 
                            type="text" as="textarea" 
                            rows={3} 
                            value={descriptionTask} 
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
                            value={dueDate}
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
                            src={creatorPhoto} // user photo of task creator
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
                        onClick={handleUpdate}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>     
            </>
        )
    }

EditTaskModal.propTypes = {
    showEditModal: PropTypes.any,
    handleEditModalClose: PropTypes.func,
    creatorPhoto: PropTypes.any,
    creatorName: PropTypes.any,
    taskId: PropTypes.any,
    refreshTasksHandle: PropTypes.func
}