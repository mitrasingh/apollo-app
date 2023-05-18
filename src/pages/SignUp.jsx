import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from "../utils/firebase-config"
import { useState } from "react"
import { Container, Form, Card, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

export const SignUp = () => {

    const [firstName, setFirstName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSignUp = (event) => {
        event.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
          // eslint-disable-next-line no-unused-vars
          .then((authUser) => {
            signInWithEmailAndPassword(auth, email, password).then(
              updateProfile(auth.currentUser, {
                displayName: firstName,
              })
            );
          })
          .catch((err) => {
            alert(err);
          });
      };

    return (
        <Container style={{fontSize: "10px", maxWidth: "400px"}} className="mt-4">
        <Form>
            <Card className="px-4 py-4">
                <h4 className="fw-bold d-flex justify-content-center">Sign Up</h4>
                <p className="d-flex justify-content-center">Already registered?&nbsp; 
                    <Link className="link-primary fw-bold" style={{cursor: "pointer"}} to="/signin">Sign In</Link> 
                </p>

                <p className="fw-bold mb-1" style={{fontSize: "10px", margin: "0px"}}>First Name</p>
                <Form.Group className="mb-3" controlId="progress">
                    <Form.Control 
                        style={{fontSize: "10px"}} 
                        type="text" 
                        placeholder="Enter first name" 
                        onChange={(e) => setFirstName(e.target.value)}/>
                </Form.Group>

                <p className="fw-bold mb-1" style={{fontSize: "10px", margin: "0px"}}>Email Address</p>
                <Form.Group className="mb-3" controlId="progress">
                    <Form.Control 
                        style={{fontSize: "10px"}} 
                        type="text" 
                        placeholder="Enter email" 
                        onChange={(e) => setEmail(e.target.value)}/>
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
                    onClick={handleSignUp}>
                    Sign Up
                </Button>

                <Button 
                    style={{fontSize: "10px", maxHeight: "30px"}}
                    variant="secondary"
                    className="mt-2" 
                    size="sm"
                    as={Link} to="/signin" 
                    >
                    Cancel
                </Button>

                <p className="d-flex justify-content-center link-primary mt-3">Forgot password?&nbsp;</p>

            </Card>
        </Form>
        </Container>
    )
}
