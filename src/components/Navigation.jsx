import { Col, Container, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const Navigation = () => {

  return (
    <Navbar bg="light" variant="light" className="px-5">
        <Container fluid>
            <Col xs lg="2">
                <Navbar.Brand as={Link} to="/">
                    <img
                    src="src/img/rocket.svg"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    alt="apollo logo"
                    />
                </Navbar.Brand>
                <Navbar.Brand className="fw-bold" as={Link} to="/">Apollo</Navbar.Brand>
            </Col> 
            
            <Col md="auto">   
                <Nav style={{fontSize: "11px"}} className="me-auto fw-bold mt-1">
                    <Nav.Link as={Link} to="/" className="me-2">Home</Nav.Link>
                    <Nav.Link as={Link} to="/createtask">Create Task</Nav.Link>
                    <Nav.Link as={Link} to="/shoutboard" className="ms-2">Shout Board</Nav.Link>
                </Nav>
            </Col>
            
            <Col xs lg="2" className="d-flex justify-content-end">  
                <Nav>
                    <NavDropdown drop="down-centered" title="" menuVariant="light">
                            <NavDropdown.Item style={{fontSize: "9px"}} as={Link} to="/profile">Edit Profile</NavDropdown.Item>
                            <NavDropdown.Item style={{fontSize: "9px"}} as={Link} to="/">Logout</NavDropdown.Item>
                    </NavDropdown>
                    <Navbar.Brand>
                        <img
                        src="src/img/default-profile.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="user image"
                        />
                    </Navbar.Brand>
                    <Nav.Link style={{fontSize: "9px"}} className="fw-bold pt-3 ps-0">Hello, <strong>userName</strong></Nav.Link>
                </Nav>
            </Col>
        </Container>
    </Navbar>
  )
}

