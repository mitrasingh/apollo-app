import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { doc, getDoc, collection, addDoc, getDocs, query, Timestamp } from "firebase/firestore"
import { getStorage, getDownloadURL, ref } from "firebase/storage"
import { db } from "../utils/firebase-config"
import { useSelector } from "react-redux"
import { Container, Card, Row, Col, Image, Stack, Form, Button } from "react-bootstrap"
import CloseButton from 'react-bootstrap/CloseButton';
import { CommentCard } from "../components/CommentCard"
import formatDate from ".././utils/format-date"


export const TopicDetails = () => {

    // React Router mothod, creates a dynamic page address based off of the topicId property from the "topics" collection in firestore database
    // this id also specifies the document to query that is within the "topics" collection of the firestore database 
    const { id } = useParams()

    // stores the specific document data from queried from firestore database via fetchTopicData function
    const [topic, setTopic] = useState([])

    // stores the fetched data from firestore database "comments" sub-collection of document id via fetchComments function
    const [comments, setComments] = useState([])

    // stores user photo URL fetched from firebase storage via fetchTopicData function
    const [userPhoto, setUserPhoto] = useState("")

    // stores user input from form
    const [commentInput, setCommentInput] = useState("")

    // stores the formatted date
    const [displayTimeStamp, setDisplayTimeStamp] = useState("")

    // firebase storage method and reference (used for fetching user photo url based off of userId prop)
    const storage = getStorage()
    const storageRef = ref(storage)

    // redux state properties of current user (used to set properties when posting a comment)
    const currentUser = useSelector((state) => state.user)

    // fetch data of specific document id (via useParams()) from "topics" collection in firestore database
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
                    setDisplayTimeStamp(formatDate(data.datePosted)) // immediately convert timestamp with formatDate to state during fetch to avoid errors
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchTopicData()
    },[])



    // maps out the "comments" subcollection based off of document id (via useParams()) from "topics" collection in firestore database
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const data = await getDocs(query(collection(db,"topics",id,"comments")))
                setComments(data.docs.map((doc) => ({...doc.data(), commentId: doc.id})))
            } catch (error) {
                console.log(error)
            }
        }
        fetchComments()
    },[])

    // adds a document to "comments" subcollection within firestore database ("topics"/specific ID/"comments"/ADDED DOCUMENT) 
    const handlePostCommentButton = async (e) => {
        e.preventDefault()
        const myDate = new Date()
        const postTimeStamp = Timestamp.fromDate(myDate)
        try {
            await addDoc(collection(doc(db,"topics",id), "comments"), {
                userId: currentUser.userId,
                userPhoto: currentUser.userPhoto,
                firstName: currentUser.firstName,
                lastName: currentUser.lastName, 
                userComment: commentInput,
                datePosted: postTimeStamp
            })
        } catch (error) {
            console.log(error)
        }
    }

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
                            <p>Posted by: {topic.firstName} {topic.lastName}</p>
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
                    <p style={{fontSize: "9px"}}>posted on: {displayTimeStamp}</p>
                </Card.Body>
            </Card>

            <Form className="mt-4">
                <Form.Group className="mb-3" controlId="description">
                    <Form.Label style={{fontSize:"9px"}}>comment as {currentUser.firstName} {currentUser.lastName}</Form.Label>
                    <Form.Control 
                        style={{fontSize: "10px"}} 
                        maxLength={100000}
                        rows={5}
                        type="text" 
                        as="textarea"
                        placeholder="What are your thoughts?"
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                    />
                </Form.Group>
            </Form>

            <Button 
                style={{fontSize: "10px", maxHeight: "30px", MozColumnWidth:"40px"}} 
                className="ms-2" 
                variant="primary" 
                size="sm" 
                type="submit"
                onClick={handlePostCommentButton}
                >
                Post
            </Button>     
        </Container>
        {comments.map((comment) => {
            return (
                <CommentCard comment={comment} key={comment.commentId} />
            )
        })}
        </>
    )
}

