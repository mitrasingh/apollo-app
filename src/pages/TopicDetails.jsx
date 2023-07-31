import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../utils/firebase-config"


export const TopicDetails = () => {

    const { id } = useParams()

    const [topic, setTopic] = useState({})

    useEffect(() => {
        const fetchTopic = async () => {
            try {
                const docRef = doc(db,"topics",id)
                const docSnap = await getDoc(docRef)
                if (docSnap.exists()) {
                    const data = docSnap.data()
                    setTopic(data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchTopic()
    },[])

    console.log(topic)

    return (
        <>
            <div>Title: {topic.title}</div>
            <div>Description: {topic.description}</div>
            <div>Name: {topic.firstName} {topic.lastName}</div>
            <div>userId: {topic.userId}</div>
        </>
    )
}

