import { getAuth, sendPasswordResetEmail } from "firebase/auth"
import { Stack, Form, Modal, Button } from "react-bootstrap"
import { useState } from "react"
import PropTypes from 'prop-types';


export const ForgotPasswordModal = ({ show, handleCloseForgotPasswordModal }) => {

    const [email, setEmail] = useState("")
    const [alert, setAlert] = useState("")

    const auth = getAuth()

    const handleForgotPassword = async () => {
        try {
            await sendPasswordResetEmail(auth, email)
        } catch (error) {
            console.log(error.message)
            setAlert(error.code)
        } 
    }
    

    return (
        <>
        <Modal show={show}>
        <Modal.Body>
            <Modal.Header style={{ display: "flex", justifyContent: "center"}}>
                <Modal.Title>Forgot your password?</Modal.Title>
            </Modal.Header>

            <p style={{fontSize: "11px", display:"flex", justifyContent:"center"}}>{alert}</p>

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