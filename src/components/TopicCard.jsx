import { Card, Col, Container, Row, Image } from 'react-bootstrap'
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getStorage, getDownloadURL, ref } from 'firebase/storage';


export const TopicCard = ( props ) => {

    // receiving prop data from Shoutboard.jsx
    const { title, firstName, lastName, userId } = props.topic

    const [creatorPhoto, setCreatorPhoto] = useState("")

    const storage = getStorage()
    const storageRef = ref(storage)

    useEffect(() => {
        const creatorInfo = async () => {
            try {
                const creatorPhotoURL = await getDownloadURL(ref(storageRef, `user-photo/${userId}`))
                if (creatorPhotoURL) {
                    setCreatorPhoto(creatorPhotoURL)
                }
            } catch (error) {
                console.log(error)
            }
        }
        creatorInfo()
    },[])

    return (
        <Container className="mt-2">
        <Card style={{maxHeight: "65px"}} >
            <Card.Body>
            <Row>

                <Col xs lg="1" className="d-flex justify-content-end">
                <Image
                    style={{
                        height: "35px",
                        width: "35px",
                        objectFit: "cover",
                        borderRadius: "50%"
                    }} 
                    src={creatorPhoto}
                    roundedCircle 
                />
                </Col>

                <Col xs lg="9">
                <Row style={{fontSize: "13px"}} className="fw-bold">
                    <Col xs lg="5">{title}</Col>
                </Row>
                <Row style={{fontSize: "9px"}}>
                    <Col xs lg="5">by {firstName} {lastName}</Col>
                </Row>
                </Col>

                <Col className="mt-2 d-flex">
                <Image
                    src="src/img/comment-icon.png"
                    width="20"
                    height="20"
                    className="d-inline-block align-top"
                    alt="Apollo Logo"
                />
                <p style={{fontSize: "9px"}} className="mt-1 ms-2" >3 Replies</p>
                </Col>

            </Row>
            </Card.Body>
        </Card>
        </Container>       
    )
}

TopicCard.propTypes = {
    topic: PropTypes.any,
    title: PropTypes.string,
    description: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    userId: PropTypes.string
}
