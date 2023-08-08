import { Container, Row, Col, Stack, Image, Card, Button } from "react-bootstrap"
import PropTypes from 'prop-types';
import formatDate from ".././utils/format-date"


export const CommentCard = ( props ) => {
    
    const { userPhoto, firstName, lastName, userComment, datePosted } = props.comment

    return (
        <Container className="mt-4">
            <Card style={{padding: "10px"}}>
            <Row>
                <Col>
                    <Stack direction="horizontal" gap={2}>
                        <Image
                            style={{
                                height: "25px",
                                width: "25px",
                                objectFit: "cover",
                                borderRadius: "50%"
                            }} 
                            src={userPhoto}
                            roundedCircle 
                        />
                        <p style={{fontSize:"9px", marginTop:"12px"}}>{firstName} {lastName}</p>
                        <p style={{fontSize:"8px", marginTop:"12px"}}>posted at: {formatDate(datePosted)}</p>
                    </Stack>
                    
                    <Stack className="mt-2">
                        <Row>
                            <Col>
                                <p style={{fontSize:"11px"}}>{userComment}</p>
                            </Col>
                        </Row>
                    </Stack>

                    { 
                    <Stack direction="horizontal" gap={1}>
                    <Button 
                            style={{fontSize: "10px", maxHeight: "30px", minWidth:"40px"}} 
                            className="ms-2" 
                            variant="dark" 
                            size="sm" 
                            type="submit"
                            >
                                Edit
                        </Button> 
                        <Button 
                            style={{fontSize: "10px", maxHeight: "30px", minWidth:"40px"}} 
                            className="ms-2" 
                            variant="danger" 
                            size="sm" 
                            type="submit"
                            >
                                Delete
                        </Button> 
                    </Stack>
                    }

                </Col>
            </Row>
            </Card>
        </Container>
    )
}

CommentCard.propTypes = {
    comment: PropTypes.any,
    userId: PropTypes.string,
    userPhoto: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    userComment: PropTypes.string,
    datePosted: PropTypes.string
}