import { Button, Container } from 'react-bootstrap'
import PropTypes from 'prop-types'

export const RefreshButton = ({ refreshTasksHandle, isClearFilterDisplayed }) => {
  return (
    <Container>
      <Button
        style={{ fontSize: "9px", maxHeight: "20px" }}
        className="d-flex align-items-center"
        variant="dark"
        onClick={refreshTasksHandle}>
        {isClearFilterDisplayed ? "Clear Filters" : "Refresh Tasks"}
      </Button>
    </Container>
  )
}

RefreshButton.propTypes = {
  refreshTasksHandle: PropTypes.func,
  isClearFilterDisplayed: PropTypes.bool
}
