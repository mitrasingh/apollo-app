import { useState, useEffect } from "react"
import { Row, Stack } from "react-bootstrap"
import { doc, collection, addDoc, getDocs, query, deleteDoc, where } from "firebase/firestore"
import { db } from "../utils/firebase-config"
import { useSelector } from "react-redux"
import PropTypes from 'prop-types';


export const Like = ({ docId }) => {

    const [likes, setLikes] = useState([])
    const currentUser = useSelector((state) => state.user)
    const likesRef = collection(db, "likes")
    const likesDoc = query(likesRef, where("docRefId", "==", docId))

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
                docRefId: docId
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
                where("docRefId", "==", docId),
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
    )
}

Like.propTypes = {
    docId: PropTypes.string
}