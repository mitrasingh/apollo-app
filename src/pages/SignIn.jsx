import { useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../utils/firebase-config'

export const SignIn = () => {

    const [error, setError] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const handleSignIn = (e) => {
        e.preventDefault()

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                navigate("/")
                console.log(user)
                // ...
            })
            .catch((error) => {
                setError(true)
        });
    }


  
    return (
        <Container style={{fontSize: "10px", maxWidth: "400px"}} className="mt-4">
        <Form onSubmit={handleSignIn}>
            <Card className="px-4 py-4">
                <h4 className="fw-bold d-flex justify-content-center">Sign In</h4>
                <p className="d-flex justify-content-center">Not registered?&nbsp; 
                    <Link className="link-primary fw-bold" style={{cursor: "pointer"}} to="/signup">Sign Up</Link> 
                </p>

                <p className="fw-bold mb-1" style={{fontSize: "10px", margin: "0px"}}>Email Address</p>
                <Form.Group className="mb-3" controlId="progress">
                    <Form.Control 
                        style={{fontSize: "10px"}} 
                        type="text"
                        placeholder="Enter email"
                        onChange={e => setEmail(e.target.value)} />
                </Form.Group>

                <p className="fw-bold mb-1" style={{fontSize: "10px", margin: "0px"}}>Password</p>
                <Form.Group className="mb-3" controlId="progress">
                    <Form.Control 
                        style={{fontSize: "10px"}} 
                        type="password"
                        placeholder="Enter password" 
                        onChange={e => setPassword(e.target.value)}/>
                </Form.Group>

                <Button 
                    style={{fontSize: "10px", maxHeight: "30px"}} 
                    variant="primary"  
                    size="sm" 
                    type="submit">
                    Login
                </Button>

                <Button 
                    style={{fontSize: "10px", maxHeight: "30px"}} 
                    variant="secondary"  
                    size="sm" 
                    className="mt-2"
                    as={Link} to="/signup">
                    Cancel
                </Button>

                <p className="d-flex justify-content-center link-primary mt-3">Forgot password?&nbsp;</p>
                {error && <span>Wrong email or password!</span>}
            </Card>
        </Form>
        </Container>
    )
}

