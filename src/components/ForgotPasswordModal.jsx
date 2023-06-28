import { getAuth, sendPasswordResetEmail } from "firebase/auth"
import { Stack, Form, Modal, Button } from "react-bootstrap"
import { useEffect, useState } from "react"
import PropTypes from 'prop-types';


export const ForgotPasswordModal = ({ show, handleCloseForgotPasswordModal }) => {

    const [email, setEmail] = useState("")
    const [modalAlertMessage, setModalAlertMessage] = useState("")
    
    const auth = getAuth()

    const handleForgotPassword = async () => {
        try {
            await sendPasswordResetEmail(auth, email)
            setModalAlertMessage("Email has been sent!")
            setTimeout(() => {
                handleCloseForgotPasswordModal()
            }, 2000)
        } catch (error) {
            setModalAlertMessage(error.message.includes("auth/invalid-email") ? "Email not registered" : "")
        }
    }

    // Resets alerts if Forgot Password is clicked again
    useEffect(() => {
        setModalAlertMessage("")
    }, [show])

    return (
        <>
        <Modal show={show} onHide={handleCloseForgotPasswordModal}>
        <Modal.Body>
            <Modal.Header style={{ display: "flex", justifyContent: "center"}}>
                <Modal.Title>Forgot your password?</Modal.Title>
            </Modal.Header>

            {modalAlertMessage ? <p style={{fontSize: "11px", display:"flex", justifyContent:"center"}}>{modalAlertMessage}</p> : ""}

            <Form.Group>
                <Form.Label style={{fontSize:"12px"}}>We will email you a link to reset your password.</Form.Label>
                <Form.Control 
                    style={{fontSize: "10px",}} 
                    type="text" 
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)} />
            </Form.Group> 
              
            <Modal.Footer>
                <Stack>
                <Button 
                    style={{fontSize: "10px", maxHeight: "30px"}} 
                    className="ms-2" 
                    variant="primary" 
                    size="sm" 
                    type="submit"
                    onClick={handleForgotPassword}>
                    Submit
                </Button>

                <Button 
                    style={{fontSize: "10px", maxHeight: "30px"}} 
                    className="ms-2 mt-2" 
                    variant="secondary" 
                    size="sm" 
                    type="submit"
                    onClick={handleCloseForgotPasswordModal}>
                    Cancel
                </Button>
                </Stack>
            </Modal.Footer>
        </Modal.Body>  
        </Modal>
        </>
    )
}

ForgotPasswordModal.propTypes = {
    show: PropTypes.any,
    handleCloseForgotPasswordModal: PropTypes.func
}