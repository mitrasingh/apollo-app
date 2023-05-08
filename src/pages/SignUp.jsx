import { Container, Form, Card, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

export const SignUp = () => {

    return (
        <Container style={{fontSize: "10px", maxWidth: "400px"}} className="mt-4">
        <Form>
            <Card className="px-4 py-4">
                <h4 className="fw-bold d-flex justify-content-center">Sign Up</h4>
                <p className="d-flex justify-content-center">Already registered?&nbsp; 
                    <Link className="link-primary fw-bold" style={{cursor: "pointer"}} to="/signin">Sign In</Link> 
                </p>
                <p className="fw-bold mb-1" style={{fontSize: "10px", margin: "0px"}}>Email Address</p>
                <Form.Group className="mb-3" controlId="progress">
                    <Form.Control 
                        style={{fontSize: "10px"}} 
                        type="text" 
                        placeholder="Enter email" />
                </Form.Group>

                <p className="fw-bold mb-1" style={{fontSize: "10px", margin: "0px"}}>Password</p>
                <Form.Group className="mb-3" controlId="progress">
                    <Form.Control 
                        style={{fontSize: "10px"}} 
                        type="password" 
                        placeholder="Enter password" />
                </Form.Group>

                <Button 
                    style={{fontSize: "10px", maxHeight: "30px"}} 
                    variant="primary"  
                    size="sm" 
                    type="submit">
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
