import { Button, ButtonGroup, Container, Dropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const Filter = () => {
  return (
    <Container>
        <Dropdown as={ButtonGroup}>
        <Button style={{fontSize: "9px", maxHeight: "20px"}} className="d-flex align-items-center" variant="dark">Filter</Button>

        <Dropdown.Toggle style={{maxHeight: "20px"}} className="d-flex align-items-center" split variant="dark" id="dropdown-split-basic" />

        <Dropdown.Menu style={{fontSize: "10px"}}>
            <Dropdown.Item >by Newest</Dropdown.Item>
            <Dropdown.Item as={Link} to="">by Oldest</Dropdown.Item>
            <Dropdown.Item>by Priority Level</Dropdown.Item>
              <Dropdown.Item as={Link} to="" className="ms-3">In Progress</Dropdown.Item>
              <Dropdown.Item as={Link} to="" className="ms-3">Done</Dropdown.Item>
              <Dropdown.Item as={Link} to="" className="ms-3">On Hold</Dropdown.Item>
              <Dropdown.Item as={Link} to="" className="ms-3">Cancelled</Dropdown.Item>
            <Dropdown.Item as={Link} to="">by Status</Dropdown.Item>
              <Dropdown.Item as={Link} to="" className="ms-3">Urgent</Dropdown.Item>
              <Dropdown.Item as={Link} to="" className="ms-3">High</Dropdown.Item>
              <Dropdown.Item as={Link} to="" className="ms-3">Medium</Dropdown.Item>
              <Dropdown.Item as={Link} to="" className="ms-3">Low</Dropdown.Item>
        </Dropdown.Menu> 
        </Dropdown>   
    </Container>
  )
}
