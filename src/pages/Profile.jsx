import { Button, Col, Container, Form, Row, Stack, Image } from 'react-bootstrap'
import { useSelector } from "react-redux"

export const Profile = () => {

    const user = useSelector((state) => state.user)

    return (
        <>
        <Container className="mt-4">
            <Row className="mb-4">
                <Col xs lg="2">
                    <Stack direction="vertical">
                        <Image
                            style={{
                                height: "180px",
                                width: "180px",
                                objectFit: "cover",
                                borderRadius: "50%"
                            }} 
                            src={user.userPhoto}
                            roundedCircle />
                        <Button 
                            style={{fontSize: "8px", maxHeight: "30px", maxWidth: "75px"}} 
                            className="ms-5 mt-2" 
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
                        <Form.Control style={{fontSize: "10px"}} type="text" value={user.firstName} />
                    </Form.Group>
                    <p className="fw-bold" style={{fontSize: "10px", margin: "0px"}}>Last Name</p>
                    <Form.Group className="mb-3" controlId="progress">
                        <Form.Control style={{fontSize: "10px"}} type="text" value={user.lastName} />
                    </Form.Group>
                    <p className="fw-bold" style={{fontSize: "10px", margin: "0px"}}>Title</p>
                    <Form.Group className="mb-3" controlId="progress">
                        <Form.Control style={{fontSize: "10px"}} type="text" value={user.title} />
                    </Form.Group>
                    <p className="fw-bold" style={{fontSize: "10px", margin: "0px"}}>E-mail</p>
                    <Form.Group className="mb-3" controlId="progress">
                        <Form.Control style={{fontSize: "10px"}} type="text" value={user.email} />
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

