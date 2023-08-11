import { Form, Stack, Button } from "react-bootstrap"
import PropTypes from "prop-types"

export const EditComment = ({ userComment, setIsEditComment }) => {

    // const handleUpdateButton = () => {

    // }

    console.log(userComment)

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
                        // value={userComment}
                        // onChange={}
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
                    variant="danger" 
                    size="sm" 
                    type="submit"
                    // onClick={handleDeleteComment}
                    >
                        Update
                </Button> 
            </Stack>
        </>
    )
}

EditComment.propTypes = {
    userComment: PropTypes.string,
    setIsEditComment: PropTypes.func
}
