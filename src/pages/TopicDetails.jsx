import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { doc, getDoc, collection, addDoc, getDocs, query, Timestamp, getCountFromServer, deleteDoc, where } from "firebase/firestore"
import { getStorage, getDownloadURL, ref } from "firebase/storage"
import { db } from "../utils/firebase-config"
import { useSelector } from "react-redux"
import { Container, Card, Row, Col, Image, Stack, Form, Button } from "react-bootstrap"
import CloseButton from 'react-bootstrap/CloseButton';
import { CommentCard } from "../components/CommentCard"
import formatDate from ".././utils/format-date"
import { useNavigate } from "react-router-dom"
import { TopicIdContext } from ".././utils/TopicIdContext"
import { EditTopic } from "../components/EditTopic"



export const TopicDetails = () => {

    // React Router mothod, creates a dynamic page address based off of the topicId property from the "topics" collection in firestore database
    // this id also specifies the document to query that is within the "topics" collection of the firestore database 
    const { id } = useParams()

    // stores the specific document data from queried from firestore database via fetchTopicData function
    const [topic, setTopic] = useState([])

    // stores the fetched data from firestore database "comments" sub-collection of document id via fetchComments function
    const [comments, setComments] = useState([])

    // displays edit fields for the topic description when set to true
    const [isEditTopic, setIsEditTopic] = useState(false)

    // boolean state which refreshes CommentCard.jsx list when user posts a new comment
    const [commentsRefreshList, setCommentsRefreshList] = useState(false)

    // boolean state which is set as a dependency if true for fetchTopicData function 
    const [topicRefresh, setTopicRefresh] =  useState(false)

    // stores user photo URL fetched from firebase storage via fetchTopicData function
    const [userPhoto, setUserPhoto] = useState("")

    // displays numbers of replies (how many documents within "comments" subcollection)
    const [numOfReplies, setNumOfReplies] = useState("")

    // stores user input from form
    const [commentInput, setCommentInput] = useState("")

    // stores the formatted date
    const [displayTimeStamp, setDisplayTimeStamp] = useState("")

    // firebase storage method and reference (used for fetching user photo url based off of userId prop)
    const storage = getStorage()
    const storageRef = ref(storage)

    // redux state properties of current user (used to set properties when posting a comment)
    const currentUser = useSelector((state) => state.user)

    const navigate = useNavigate()

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
    },[topicRefresh])


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
    },[commentsRefreshList])

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
            setCommentsRefreshList((current) => !current)
            setCommentInput("")
        } catch (error) {
            console.log(error)
        }
    }

    // function returns the total number of documents within the "comments" subcollection
    useEffect(() => {
        const getNumOfReplies = async () => {
            try {
                const coll = collection(db,"topics",id,"comments")
                const snapshot = await getCountFromServer(coll)
                setNumOfReplies(snapshot.data().count)
            } catch (error) {
                console.log(error)
            }
        }
        getNumOfReplies()
    },[commentsRefreshList])

    // function deletes the entire topic including it's comments
    const handleDeleteTopic = async () => {
        const documentRef = doc(db,"topics",id)
        try {
            await deleteDoc(documentRef)
            navigate("/shoutboard")
        } catch (error) {
            console.log(error)
        }
    }

    // navigates user back to the shoutboard page
    const handleCloseTopic = () => {
        navigate("/shoutboard")
    }

    const [likes, setLikes] = useState([])
    const likesRef = collection(db, "likes")
    const likesDoc = query(likesRef, where("topicId", "==", id))

    useEffect(() => {
        const getLikes = async () => {
            const data = await getDocs(likesDoc)
            setLikes(data.docs.map((doc) => ({userId: doc.data().userId, likeId: doc.id})))
        }
        getLikes()
    },[])

    const addLikeHandle = async () => {
        try {
            const newDoc = await addDoc(likesRef, {
                userId: currentUser.userId,
                topicId: id
            })
            setLikes((prev) => prev ? [...prev, { userId: currentUser.userId, likeId: newDoc.id }] : [{ userId: currentUser.userId, likeId: newDoc.id}])
        } catch (error) {
            console.log(error)
        }
    }

    const removeLikeHandle = async () => {
        try {
            const likeToDeleteQuery = query(
                likesRef, 
                where("topicId", "==", id),
                where("userId", "==", currentUser.userId)
            )
            const likeToDeleteData = await getDocs(likeToDeleteQuery)
            const likeId = likeToDeleteData.docs[0].id
            const likeToDelete = doc(db,"likes",likeId)
            await deleteDoc(likeToDelete)
            setLikes((prev) => prev.filter((like) => like.likeId !== likeId))
        } catch (error) {
            console.log(error)
        }
    }

    const checkUserLiked = likes.find((like) => like.userId === currentUser.userId)
    

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
                        <CloseButton onClick={handleCloseTopic} />
                    </Col>
                </Row>
            </Card.Header>
                <Card.Body>
                    <h5>{topic.title}</h5>
                    <p style={{fontSize: "9px"}}>posted on: {displayTimeStamp}   |   {numOfReplies} {numOfReplies === 1 ? "Reply" : "Replies"}</p>
                    


                    {isEditTopic ?
                    <EditTopic setIsEditTopic={setIsEditTopic} description={topic.description} id={id} setTopicRefresh={setTopicRefresh}/> 
                    :
                    <p style={{fontSize: "12px"}} className="mt-4">{topic.description}</p>
                    }



                    { topic.userId === currentUser.userId && !isEditTopic ?
                    <>
                    <Button 
                        style={{fontSize: "10px", maxHeight: "30px", minWidth:"50px"}} 
                        className="ms-2 mt-3" 
                        variant="dark" 
                        size="sm" 
                        type="submit"
                        onClick={() => setIsEditTopic(true)}
                        >
                            Edit
                    </Button> 
                    <Button 
                        style={{fontSize: "10px", maxHeight: "30px", minWidth:"50px"}} 
                        className="ms-2 mt-3" 
                        variant="danger" 
                        size="sm" 
                        type="submit"
                        onClick={handleDeleteTopic}
                        >
                            Delete
                    </Button>
                    </>
                    :
                    null
                    } 
                    <Row>
                        <Stack direction="horizontal" className="mt-3" gap={2}>
                            <img
                                src={checkUserLiked ? "/public/img/rocketLike.svg" : "/public/img/rocketNoLike.svg"}
                                width="20"
                                height="20"
                                className="d-inline-block align-top"
                                alt="apollo logo"
                                onClick={checkUserLiked ? removeLikeHandle : addLikeHandle} 
                            />
                            <p style={{fontSize:"9px", marginTop:"12px"}} className="mt-3">Likes: {likes.length} </p>
                        </Stack>
                    </Row>

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
                <>
                    <TopicIdContext.Provider value={{id, setCommentsRefreshList}}>
                        <CommentCard comment={comment} key={comment.commentId} />
                    </TopicIdContext.Provider>
                </>
            )
        })}
        </>
    )
}

