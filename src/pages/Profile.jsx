import { useState } from 'react'
import { Button, Col, Container, Form, Row, Stack, Image } from 'react-bootstrap'
import { useSelector } from "react-redux"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"


export const Profile = () => {

    const user = useSelector((state) => state.user)

    const [userUpdatedPhoto, setUserUpdatedPhoto] = useState("") //allows user to see how photo is displayed before upload
    const [photoURL, setPhotoURL] = useState("") 
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [title, setTitle] = useState("")
    const [email, setEmail] = useState("")

    const storage = getStorage()
    const storageRef = ref(storage)

    const setPhotoHandle = async (e) => {
        e.preventDefault()
        try {
            const imageRef = ref(storageRef, "user-photo/temp")
            await uploadBytes(imageRef, userUpdatedPhoto)
            const getURL = await getDownloadURL(imageRef)
            setPhotoURL(getURL)
        } catch (error) {
            console.log(error.code)
        }
    }


    return (
        <>
        <Container className="mt-4">
            <Row className="mb-4">
                <Col xs lg="2">
                    <Stack direction="vertical">
                        <Image
                            style={{
                                height: "180px",
                                width: "180px",
                                objectFit: "cover",
                                borderRadius: "50%"
                            }} 
                            // src={user.userPhoto}
                            src={photoURL === "" ? user.userPhoto : photoURL}
                            roundedCircle />

                        <Form.Group>
                            <Form.Control 
                                type="file"
                                size="sm"
                                onChange={(event) => setUserUpdatedPhoto(event.target.files[0])}
                            />
                        </Form.Group>

                        <Button 
                            style={{fontSize: "8px", maxHeight: "30px", maxWidth: "75px"}} 
                            className="ms-5 mt-2" 
                            variant="secondary" 
                            size="sm" 
                            type="file"
                            onClick={setPhotoHandle}>Set Photo
                        </Button>
                    </Stack>
                </Col>
            </Row>

            <Row>
                <Stack>
                    <p className="fw-bold" style={{fontSize: "10px", margin: "0px"}}>First Name</p>
                    <Form.Group className="mb-3" controlId="progress">
                        <Form.Control 
                            style={{fontSize: "10px"}} 
                            type="text" 
                            value={user.firstName}
                            onChange={(e) => setFirstName(e.target.value)} />
                    </Form.Group>
                    
                    <p className="fw-bold" style={{fontSize: "10px", margin: "0px"}}>Last Name</p>
                    <Form.Group className="mb-3" controlId="progress">
                        <Form.Control 
                            style={{fontSize: "10px"}} 
                            type="text" 
                            value={user.lastName} />
                    </Form.Group>
                    
                    <p className="fw-bold" style={{fontSize: "10px", margin: "0px"}}>Title</p>
                    <Form.Group className="mb-3" controlId="progress">
                        <Form.Control 
                            style={{fontSize: "10px"}} 
                            type="text" 
                            value={user.title} />
                    </Form.Group>
                   
                    <p className="fw-bold" style={{fontSize: "10px", margin: "0px"}}>E-mail</p>
                    <Form.Group className="mb-3" controlId="progress">
                        <Form.Control 
                            style={{fontSize: "10px"}} 
                            type="text" 
                            value={user.email} />
                    </Form.Group>
                </Stack>
            </Row>

            <Button style={{fontSize: "10px", maxHeight: "30px"}} variant="secondary" size="sm" href="/">
                Cancel
            </Button>

            <Button style={{fontSize: "10px", maxHeight: "30px"}} className="ms-2" variant="primary" size="sm" type="submit">
                Update
            </Button>
        </Container>
        </>
    )
}

