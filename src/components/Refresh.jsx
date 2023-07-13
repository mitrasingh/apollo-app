import { Button, Container } from 'react-bootstrap'
import PropTypes from 'prop-types'

export const Refresh = ({ refreshTasksHandle }) => {
  return (
    <Container>
        <Button 
            style={{fontSize: "9px", maxHeight: "20px"}} 
            className="d-flex align-items-center" 
            variant="dark"
            onClick={refreshTasksHandle}>
                Refresh Tasks
        </Button>
    </Container>
  )
}

Refresh.propTypes = {
    refreshTasksHandle: PropTypes.func
}