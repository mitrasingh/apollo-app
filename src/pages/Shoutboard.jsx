import { Card, Col, Container, Form, Row, Stack } from 'react-bootstrap'

export const Shoutboard = () => {
  return (
    <>
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <Row className="px-2 py-2">

            <Col xs lg="1" className="d-flex justify-content-end">
              <img
                src="src/img/default-profile.png"
                width="35"
                height="35"
                className="d-inline-block align-top"
                alt="Apollo Logo"
              />
            </Col>

            <Col>
              <Row>
                <Stack direction="horizontal">
                  <p style={{fontSize: "12px"}} className="fw-bold">UserName</p>
                  <p style={{fontSize: "8px"}} className="ms-2">12:05PM</p>
                </Stack>
              </Row>
              <Row style={{fontSize: "10px"}}>
                <p>Message will appear in this area. Character limit to be determined.</p>
              </Row>
              <img
                src="src/img/thumbs-dark.png"
                width="20"
                height="20"
                className="align-top"
                alt="Apollo Logo"
              />
            </Col>
            <hr className="mt-2"></hr>
          </Row>
        </Card.Body>
      </Card>

      <Form className="mt-3">
        <Row>
        <Col xs lg="11">
          <Form.Group className="mb-3" controlId="sendMessage">
            <Form.Control style={{fontSize: "10px"}} type="text" placeholder="Type something..." />
          </Form.Group>
        </Col>

        <Col xs lg="1">
          <img
                src="src/img/send.png"
                width="20"
                height="20"
                alt="Send message icon"
          />
        </Col>
        </Row>
      </Form>
    </Container>
    </>
  )
}
