import { Col, Container, Form, FormControl, InputGroup, Row, Button } from 'react-bootstrap'
import PropTypes from 'prop-types';

export const SearchBar = ({ userInputSearchBar, filterSearchHandle }) => {

    // sending input form value to parent (Home.jsx)
    const handleUserInput = (e) => {
        const userInput = e.target.value
        userInputSearchBar(userInput)
    }

    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col sm={5}>
                    <Form className="d-flex">
                        <InputGroup>
                            <Button variant="light">
                                <img
                                    src="public/img/search.svg"
                                    width="30"
                                    height="30"
                                    className="d-inline-block align-top"
                                    alt="Search bar button"
                                    onClick={filterSearchHandle}
                                />
                            </Button>
                            <FormControl
                                style={{ fontSize: "11px" }}
                                type="text"
                                className="me-2"
                                placeholder="Search by task name..."
                                onChange={handleUserInput}
                            />
                        </InputGroup>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

SearchBar.propTypes = {
    userInputSearchBar: PropTypes.func,
    filterSearchHandle: PropTypes.func
}