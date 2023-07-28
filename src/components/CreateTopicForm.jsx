import { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { collection, addDoc } from "firebase/firestore"
import { db } from "../utils/firebase-config"
import { useSelector } from "react-redux"


export const CreateTopicForm = () => {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const user = useSelector((state) => state.user)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
          await addDoc(collection(db,"topics"), { //using firestore to generate task ID
            title,
            description,
            userId: user.userId 
          })
        } catch (error) {
            console.log(error)
        }
      }

    return (
        <Container style={{border: "2px solid grey", maxWidth:"97.5%"}} className="mt-3 mb-3 pb-3">
        <Container style={{maxWidth: "85%"}} className="mt-3">
            <Form>
                <Form.Group className="mb-3" controlId="title">
                <Form.Control 
                style={{fontSize: "10px"}} 
                maxLength={50}
                type="text" 
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)} 
                />
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                <Form.Control 
                style={{fontSize: "10px"}} 
                maxLength={100000}
                rows={5}
                type="text" 
                as="textarea"
                placeholder="Shout it out..."
                onChange={(e) => setDescription(e.target.value)} 
                />
                </Form.Group>
            </Form>
            <Button 
                style={{fontSize: "10px", maxHeight: "30px"}} 
                className="ms-2" 
                variant="secondary" 
                size="sm" 
                >
                Cancel
            </Button>

            <Button 
                style={{fontSize: "10px", maxHeight: "30px", MozColumnWidth:"40px"}} 
                className="ms-2" 
                variant="primary" 
                size="sm" 
                type="submit"
                onClick={handleSubmit}
                >
                Post
            </Button>        
        </Container>
        </Container>
    )
}
