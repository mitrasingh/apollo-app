import { useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth"
import { auth } from '../utils/firebase-config'
import { Button, Card, Container, Form } from 'react-bootstrap'

export const Login = () => {

    const [user, setUser] = useState({})

    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")

    const [signUpFirstName, setSignUpFirstName] = useState("")
    const [signUpLastName, setSignUpLastName] = useState("")
    const [signUpTitle, setSignUpTitle] = useState("")
    const [signUpEmail, setSignUpEmail] = useState("")
    const [signUpPassword, setSignUpPassword] = useState("")
    const [signUpPasswordConfirm, setSignUpPasswordConfirm] = useState("")

    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword)
        } catch (error) {
            console.log(error.message)
        }
    }
  
    const login = async () => {
  
    }
  
    const logout = async () => {
  
    }

    const [signUp, setSignUp] = useState(false)

    const handleUserSignUp = () => {
        setSignUp(true)
    }

    return (

        signUp ? (
            <>
            <Container style={{fontSize: "10px", maxWidth: "400px"}} className="mt-4">
                <Card className="px-4 py-4">
                    <h4 className="fw-bold d-flex justify-content-center">Sign Up</h4>
                    <p className="d-flex justify-content-center">Already registered?&nbsp; 
                        <span className="link-primary fw-bold" style={{cursor: "pointer"}} onClick={() => setSignUp(false)}>Sign In</span> 
                    </p>

                    <p className="fw-bold mb-1" style={{fontSize: "10px", margin: "0px"}}>First Name</p>
                    <Form.Group className="mb-3" controlId="progress">
                        <Form.Control 
                            style={{fontSize: "10px"}} 
                            type="text" 
                            onChange={(e) => {setSignUpFirstName(e.target.value)}} 
                            placeholder="Enter first name" />
                    </Form.Group>

                    <p className="fw-bold mb-1" style={{fontSize: "10px", margin: "0px"}}>Last Name</p>
                    <Form.Group className="mb-3" controlId="progress">
                        <Form.Control 
                            style={{fontSize: "10px"}} 
                            type="text" 
                            onChange={(e) => {setSignUpLastName(e.target.value)}}
                            placeholder="Enter last name" />
                    </Form.Group>

                    <p className="fw-bold mb-1" style={{fontSize: "10px", margin: "0px"}}>Title</p>
                    <Form.Group className="mb-3" controlId="progress">
                        <Form.Control 
                            style={{fontSize: "10px"}} 
                            type="text"
                            onChange={(e) => {setSignUpTitle(e.target.value)}} 
                            placeholder="Enter your title" />
                    </Form.Group>

                    <p className="fw-bold mb-1" style={{fontSize: "10px", margin: "0px"}}>Email Address</p>
                    <Form.Group className="mb-3" controlId="progress">
                        <Form.Control 
                            style={{fontSize: "10px"}} 
                            type="text"
                            onChange={(e) => {setSignUpEmail(e.target.value)}}  
                            placeholder="Enter email" />
                    </Form.Group>
    
                    <p className="fw-bold mb-1" style={{fontSize: "10px", margin: "0px"}}>Password</p>
                    <Form.Group className="mb-3" controlId="progress">
                        <Form.Control 
                            style={{fontSize: "10px"}} 
                            type="text" 
                            onChange={(e) => {setSignUpPassword(e.target.value)}} 
                            placeholder="Enter password" />
                    </Form.Group>

                    <p className="fw-bold mb-1" style={{fontSize: "10px", margin: "0px"}}>Re-enter Password</p>
                    <Form.Group className="mb-3" controlId="progress">
                        <Form.Control 
                            style={{fontSize: "10px"}} 
                            type="text" 
                            onChange={(e) => {setSignUpPasswordConfirm(e.target.value)}} 
                            placeholder="Re-enter password" />
                    </Form.Group>
    
                    <Button 
                        style={{fontSize: "10px", maxHeight: "30px"}} 
                        variant="primary"  
                        size="sm" 
                        onClick={register}
                        type="submit">
                        Create Account
                    </Button>

                    <Button 
                        style={{fontSize: "10px", maxHeight: "30px"}}
                        className="mt-2" 
                        variant="secondary"  
                        size="sm" 
                        type="submit"
                        onClick={() => setSignUp(false)}>
                        Cancel
                    </Button>
    
                    <p className="d-flex justify-content-center link-primary mt-3">Forgot password?&nbsp;</p>
                </Card>
            </Container>
            </>

        ) : (

            <>
            <Container style={{fontSize: "10px", maxWidth: "400px"}} className="mt-4">
                <Card className="px-4 py-4">
                    <h4 className="fw-bold d-flex justify-content-center">Sign In</h4>
                    <p className="d-flex justify-content-center">Not registered?&nbsp; 
                        <span className="link-primary fw-bold" style={{cursor: "pointer"}} onClick={handleUserSignUp}>Sign Up</span> 
                    </p>
                    <p className="fw-bold mb-1" style={{fontSize: "10px", margin: "0px"}}>Email Address</p>
                    <Form.Group className="mb-3" controlId="progress">
                        <Form.Control 
                            style={{fontSize: "10px"}} 
                            type="text" 
                            onChange={(e) => {setLoginEmail(e.target.value)}} 
                            placeholder="Enter email" />
                    </Form.Group>

                    <p className="fw-bold mb-1" style={{fontSize: "10px", margin: "0px"}}>Password</p>
                    <Form.Group className="mb-3" controlId="progress">
                        <Form.Control 
                            style={{fontSize: "10px"}} 
                            type="text" 
                            onChange={(e) => {setLoginPassword(e.target.value)}}
                            placeholder="Enter password" />
                    </Form.Group>

                    <Button 
                        style={{fontSize: "10px", maxHeight: "30px"}} 
                        variant="primary"  
                        size="sm" 
                        type="submit">
                        Login
                    </Button>

                    <p className="d-flex justify-content-center link-primary mt-3">Forgot password?&nbsp;</p>
                </Card>
            </Container>
            </>
        )
    )
}

