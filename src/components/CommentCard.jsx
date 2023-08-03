
import { Container, Row, Col, Stack, Image, Card } from "react-bootstrap"


export const CommentCard = () => {
  return (
    <Container className="mt-4">
        <Card>
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
                </Stack>
            </Col>
        </Row>
        </Card>
    </Container>
  )
}
