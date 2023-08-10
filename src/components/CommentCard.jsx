import { Container, Row, Col, Stack, Image, Card, Button } from "react-bootstrap"
import PropTypes from 'prop-types';
import formatDate from ".././utils/format-date"
import { useSelector } from 'react-redux';
import { doc, deleteDoc } from "firebase/firestore"
import { db } from "../utils/firebase-config"
import { useContext } from "react"
import { TopicIdContext } from "../utils/TopicIdContext";


export const CommentCard = ( props ) => {
    
    const { userPhoto, userId, firstName, lastName, userComment, datePosted, commentId } = props.comment

    const currentUser = useSelector((state) => state.user)

    const {id, setCommentsRefreshList} = useContext(TopicIdContext)

    const handleDeleteComment = async () => {
        const documentRef = doc(db,"topics",id,"comments",commentId)
        try {
            await deleteDoc(documentRef)
            setCommentsRefreshList((current) => !current)
        } catch (error) {
            console.log(error)
        }
    }

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

                    { userId === currentUser.userId ?
                    <>
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
                            onClick={handleDeleteComment}
                            >
                                Delete
                        </Button> 
                    </Stack>
                    </>
                    :
                    null
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
    datePosted: PropTypes.string,
    commentId: PropTypes.string,
}