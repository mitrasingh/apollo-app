
import { Container, Row, Col, Stack, Image, Card } from "react-bootstrap"


export const CommentCard = () => {
  return (
    <Container className="mt-4">
        <Card style={{padding: "10px"}}>
        <Row>
            <Col>
                <Stack direction="horizontal" gap={3}>
                    <Image
                        style={{
                            height: "25px",
                            width: "25px",
                            objectFit: "cover",
                            borderRadius: "50%"
                        }} 
                        src="src/img/default-profile.png"
                        roundedCircle 
                    />
                    <p style={{fontSize:"9px", marginTop:"12px"}}>First Last Name</p>
                    <p style={{fontSize:"8px", marginTop:"12px"}}>Timestamp</p>
                </Stack>
                
                <Stack className="mt-2">
                    <Row>
                        <Col>
                            <p style={{fontSize:"11px"}}>comment dialogue</p>
                        </Col>
                    </Row>
                </Stack>

            </Col>
        </Row>
        </Card>
    </Container>
  )
}
