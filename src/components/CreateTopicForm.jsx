import { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { collection, addDoc } from "firebase/firestore"
import { db } from "../utils/firebase-config"
import { useSelector } from "react-redux"
import PropTypes from "prop-types"


export const CreateTopicForm = ({ setIsCreateTopic }) => {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const user = useSelector((state) => state.user)

    console.log(`before: ${title} ${description}`)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
          const addTopic = await addDoc(collection(db,"topics"), { //using firestore to generate task ID
            title,
            description,
            userId: user.userId,
            firstName: user.firstName,
            lastName: user.lastName 
          })
          if (addTopic) {
            setTitle("")
            setDescription("")
          }
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
                value={title}
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
                value={description}
                onChange={(e) => setDescription(e.target.value)} 
                />
                </Form.Group>
            </Form>
            <Button 
                style={{fontSize: "10px", maxHeight: "30px"}} 
                className="ms-2" 
                variant="secondary" 
                size="sm"
                onClick={() => setIsCreateTopic(false)} 
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

CreateTopicForm.propTypes = {
    setIsCreateTopic: PropTypes.func
}