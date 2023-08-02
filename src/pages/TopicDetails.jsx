import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { doc, getDoc } from "firebase/firestore"
import { getStorage, getDownloadURL, ref } from "firebase/storage"
import { db } from "../utils/firebase-config"
import { Container, Card, Row, Col, Image, Stack } from "react-bootstrap"
import CloseButton from 'react-bootstrap/CloseButton';


export const TopicDetails = () => {

    const { id } = useParams()

    const [topic, setTopic] = useState({})
    const [userPhoto, setUserPhoto] = useState("")

    const storage = getStorage()
    const storageRef = ref(storage)

    useEffect(() => {
        const fetchTopicData = async () => {
            try {
                const docRef = doc(db,"topics",id)
                const docSnap = await getDoc(docRef)
                if (docSnap.exists()) {
                    const data = docSnap.data()
                    const userPhotoURL = await getDownloadURL(ref(storageRef, `user-photo/${data.userId}`))
                    setUserPhoto(userPhotoURL)
                    setTopic(data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchTopicData()
    },[])

    return (
        <>
        <Container className="mt-4">
            <Card>
            <Card.Header style={{fontSize:"9px", height: "45px"}}>
                <Row>
                    <Col xs lg="3">
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
                            <p>{`Posted by: ${topic.firstName} ${topic.lastName}`}</p>
                    </Stack>
                    </Col>
                    <Col className="align-items-end">
                        <CloseButton />
                    </Col>
                </Row>
            </Card.Header>
                <Card.Body>
                    <h5>{topic.title}</h5>
                    <p style={{fontSize: "12px"}}>{topic.description}</p>
                </Card.Body>
            </Card>
        </Container>
        </>
    )
}

