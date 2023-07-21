import { Col, Container, Form, FormControl, InputGroup, Row } from 'react-bootstrap'
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import { useState } from 'react';


export const SearchBar = ({ tasks }) => {

    const [search, setSearch] = useState("")

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
                        onChange={(e) => setSearch(e.target.value)}/>
                    </InputGroup>                
                </Form>
                {tasks
                    .filter((task) => {
                        return search.toLowerCase() === "" ? null : task.taskName.toLowerCase().includes(search)
                })
                    .map((task) => (
                    <p key={uuidv4()}>{task.taskName}</p>
                ))}
                </Col>
            </Row>
        </Container>
    )
}

SearchBar.propTypes = {
    tasks: PropTypes.any
}