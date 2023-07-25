import { Col, Container, Form, FormControl, InputGroup, Row } from 'react-bootstrap'
import PropTypes from 'prop-types';

export const SearchBar = ({ userInputSearchBar }) => {

    // sending user form value to parent (Home.jsx)
    const handleUserInput = (e) => {
            const userInput = e.target.value
            userInputSearchBar(userInput)
            console.log(e.target.value == 0 ? 'true' : 'false' )
    }

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
                        <FormControl 
                            style={{fontSize: "11px"}} 
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
}