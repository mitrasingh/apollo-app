import { Form, Stack, Button } from "react-bootstrap"
import PropTypes from "prop-types"
import { useState, useContext } from "react"
import { db } from '../utils/firebase-config'
import { doc, updateDoc } from 'firebase/firestore'
import { TopicIdContext } from "../utils/TopicIdContext";


export const EditComment = ({ userComment, setIsEditComment, commentId }) => {

    const [userInput, setUserInput] = useState(userComment)

    const { setCommentsRefreshList } = useContext(TopicIdContext)

    const handleUpdateButton = async (e) => {
        e.preventDefault()
        try {
            await updateDoc(doc(db,"comments",commentId), {
                userComment: userInput
            })
            if (updateDoc) {
                setIsEditComment(false)
                setCommentsRefreshList((current) => !current)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Form className="mt-4">
                <Form.Group className="mb-3" controlId="description">
                    <Form.Control 
                        style={{fontSize: "10px"}} 
                        maxLength={100000}
                        rows={5}
                        type="text" 
                        as="textarea"
                        placeholder="What are your thoughts?"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                    />
                </Form.Group>
            </Form>

            <Stack direction="horizontal" gap={1}>
            <Button 
                    style={{fontSize: "10px", maxHeight: "30px", minWidth:"40px"}} 
                    className="ms-2" 
                    variant="dark" 
                    size="sm" 
                    type="submit"
                    onClick={() => setIsEditComment(false)}
                    >
                        Cancel
                </Button> 
                <Button 
                    style={{fontSize: "10px", maxHeight: "30px", minWidth:"40px"}} 
                    className="ms-2" 
                    variant="dark" 
                    size="sm" 
                    type="submit"
                    onClick={handleUpdateButton}
                    >
                        Update
                </Button> 
            </Stack>
        </>
    )
}

EditComment.propTypes = {
    userComment: PropTypes.string,
    commentId: PropTypes.string,
    setIsEditComment: PropTypes.func
}
