import { useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

export const SignIn = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const auth = getAuth()
    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            console.log(userCredential)
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }
    

    return (
        <Container style={{fontSize: "10px", maxWidth: "400px"}} className="mt-4">
        <Form>
            <Card className="px-4 py-4">
                <h4 className="fw-bold d-flex justify-content-center">Sign In</h4>
                <p className="d-flex justify-content-center">Not registered?&nbsp; 
                    <Link className="link-primary fw-bold" style={{cursor: "pointer"}} to="/signup">Sign Up</Link> 
                </p>

                <p className="fw-bold mb-1" style={{fontSize: "10px", margin: "0px"}}>Email Address</p>
                <Form.Group className="mb-3" controlId="progress">
                    <Form.Control 
                        style={{fontSize: "10px"}} 
                        type="email"
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <p className="fw-bold mb-1" style={{fontSize: "10px", margin: "0px"}}>Password</p>
                <Form.Group className="mb-3" controlId="progress">
                    <Form.Control 
                        style={{fontSize: "10px"}} 
                        type="password"
                        placeholder="Enter password" 
                        onChange={(e) => setPassword(e.target.value)}/>
                </Form.Group>

                <Button 
                    style={{fontSize: "10px", maxHeight: "30px"}} 
                    variant="primary"  
                    size="sm" 
                    type="submit"
                    onClick={handleLogin}>
                    Login
                </Button>

                <p className="d-flex justify-content-center link-primary mt-3">Forgot password?&nbsp;</p>
            </Card>
        </Form>
        </Container>
    )
}

