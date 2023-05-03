import { Button, Col, Container, Form, Row, Stack } from 'react-bootstrap'

export const Profile = () => {
  return (
    <>
    <Container className="mt-4">
        <Row className="mb-4">
            <Col xs lg="2">
                <Stack direction="vertical">
                    <img
                        src="public/default-profile.png"
                        width="85"
                        height="85"
                        alt="user profile image"
                    />
                    <Button 
                        style={{fontSize: "8px", maxHeight: "30px", maxWidth: "75px"}} 
                        className="ms-1 mt-1" 
                        variant="secondary" 
                        size="sm" 
                        type="submit">Update Photo
                    </Button>
                </Stack>
            </Col>
        </Row>

        <Row>
            <Stack>
                <p className="fw-bold" style={{fontSize: "10px", margin: "0px"}}>First Name</p>
                <Form.Group className="mb-3" controlId="progress">
                    <Form.Control style={{fontSize: "10px"}} type="text" value="Mitch" />
                </Form.Group>
                <p className="fw-bold" style={{fontSize: "10px", margin: "0px"}}>Last Name</p>
                <Form.Group className="mb-3" controlId="progress">
                    <Form.Control style={{fontSize: "10px"}} type="text" value="Singh" />
                </Form.Group>
                <p className="fw-bold" style={{fontSize: "10px", margin: "0px"}}>Title</p>
                <Form.Group className="mb-3" controlId="progress">
                    <Form.Control style={{fontSize: "10px"}} type="text" value="Marketing Director" />
                </Form.Group>
                <p className="fw-bold" style={{fontSize: "10px", margin: "0px"}}>E-mail</p>
                <Form.Group className="mb-3" controlId="progress">
                    <Form.Control style={{fontSize: "10px"}} type="text" value="mitch@apollo.com" />
                </Form.Group>
                <p className="fw-bold" style={{fontSize: "10px", margin: "0px"}}>Location</p>
                <Form.Group className="mb-3" controlId="progress">
                    <Form.Control style={{fontSize: "10px"}} type="text" value="New York" />
                </Form.Group>
            </Stack>
        </Row>

        <Button style={{fontSize: "10px", maxHeight: "30px"}} variant="secondary" size="sm" href="/">
            Cancel
        </Button>

        <Button style={{fontSize: "10px", maxHeight: "30px"}} className="ms-2" variant="primary" size="sm" type="submit">
            Update
        </Button>
    </Container>
    </>
  )
}

