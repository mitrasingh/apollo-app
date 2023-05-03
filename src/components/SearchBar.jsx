import { Col, Container, Form, FormControl, InputGroup, Row } from 'react-bootstrap'

export const SearchBar = () => {
    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col sm={5}>
                <Form className="d-flex">
                    <InputGroup>
                    <InputGroup.Text className="bg-white">
                        <img
                        src="src/img/search.svg"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="Search bar button"
                        />
                    </InputGroup.Text>
                    <FormControl style={{fontSize: "11px"}} type="search" className="me-2" placeholder="Search tasks..." />
                    </InputGroup>
                </Form>
                </Col>
            </Row>
        </Container>
    )
}