import { Button, Container } from 'react-bootstrap'

export const Refresh = () => {
  return (
    <Container>
        <Button style={{fontSize: "9px", maxHeight: "20px"}} className="d-flex align-items-center" variant="dark">Refresh Tasks</Button>
    </Container>
  )
}