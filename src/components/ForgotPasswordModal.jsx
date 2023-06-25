import { getAuth, sendPasswordResetEmail } from "firebase/auth"
import { Form, Modal, Button } from "react-bootstrap"
import { useState } from "react"

export const ForgotPasswordModal = ({ show, handleCloseForgotPasswordModal }) => {

    const [email, setEmail] = useState("")

    const auth = getAuth()

    const handleForgotPassword = () => {
        try {
            sendPasswordResetEmail(auth, email) 
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Modal show={show}>
            <Modal.Header>
                <Modal.Title>Forgot your password?</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form.Group>
                    <Form.Label>We will email you a link to reset your password.</Form.Label>
                    <Form.Control 
                        style={{fontSize: "10px"}} 
                        type="text" 
                        value="Email"
                        onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
            </Modal.Body>

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
                className="ms-2" 
                variant="primary" 
                size="sm" 
                type="submit"
                onClick={handleCloseForgotPasswordModal}>
                Cancel
            </Button>
        </Modal>
    )
}

