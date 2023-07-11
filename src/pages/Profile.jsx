import { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row, Stack, Image } from 'react-bootstrap'
import { useSelector } from "react-redux"
// import { getStorage, ref } from "firebase/storage"
import { useDispatch } from "react-redux"
import { editUser } from "../features/user/userSlice"
import { Link, useNavigate } from "react-router-dom"
import { getAuth, updateProfile, updateEmail } from "firebase/auth"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../utils/firebase-config"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"




export const Profile = () => {

    // NEED TO REFACTOR UPDATE FUNCTIONALITY AS THERE IS SOME CONFUSION WITH REDUX/DATABASE UPDATING CONTENT
    // HAVE TO INCLUDE IF STATEMENTS FOR FUNCTIONALITY TO WORK

    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const auth = getAuth()

    const [userUpdatedPhoto, setUserUpdatedPhoto] = useState("") //allows user to see how photo is displayed before upload
    const [photoURL, setPhotoURL] = useState("") 
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [title, setTitle] = useState("")
    const [email, setEmail] = useState("")
    
    const [checkPhoto, setCheckPhoto] = useState(false)

    const storage = getStorage()
    const storageRef = ref(storage)

    // updates useState values to user initial state from redux
    useEffect(() => {
        const handleUpdateToLocal = () => {
            setPhotoURL(user.userPhoto)
            setFirstName(user.firstName)
            setLastName(user.lastName)
            setTitle(user.title)
            setEmail(user.email)
        }
        handleUpdateToLocal()
    },[])

    const setPhotoHandle = async (e) => {
        e.preventDefault()
        try {
            setCheckPhoto(true)
            const imageRef = ref(storageRef, "user-photo/temp")
            await uploadBytes(imageRef, userUpdatedPhoto)
            const getURL = await getDownloadURL(imageRef)
            setPhotoURL(getURL)
        } catch (error) {
            console.log(error.code)
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            await updateProfile(auth.currentUser, {
                displayName: firstName
            })
            
            await updateDoc(doc(db, "users", auth.currentUser.uid),{
                firstname: firstName,
                lastname: lastName,
                title: title
            }) 

            if (checkPhoto) {
                const imageRef = ref(storageRef, `user-photo/${auth.currentUser.uid}`)
                await uploadBytes(imageRef, userUpdatedPhoto)
                await getDownloadURL(ref(storageRef, `user-photo/${auth.currentUser.uid}`))
            }

            await updateEmail(auth.currentUser, email)
            
            if (updateProfile || checkPhoto || updateEmail || updateDoc) {
                dispatch(editUser({
                    userId: user.userId,
                    userPhoto: checkPhoto ? photoURL : user.userPhoto,
                    firstName: firstName,
                    lastName: lastName,
                    title: title,
                    email: email
                }))
            }          
            navigate("/")
        } catch (error) {
            console.log(error)
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
                            // adding timestamp to bypass browser cache on image reload
                            src={photoURL}
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
                            onClick={setPhotoHandle}
                            >Set Photo
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
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)} />
                    </Form.Group>
                    
                    <p className="fw-bold" style={{fontSize: "10px", margin: "0px"}}>Last Name</p>
                    <Form.Group className="mb-3" controlId="progress">
                        <Form.Control 
                            style={{fontSize: "10px"}} 
                            type="text" 
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)} />
                    </Form.Group>
                    
                    <p className="fw-bold" style={{fontSize: "10px", margin: "0px"}}>Title</p>
                    <Form.Group className="mb-3" controlId="progress">
                        <Form.Control 
                            style={{fontSize: "10px"}} 
                            type="text" 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)} />
                    </Form.Group>
                   
                    <p className="fw-bold" style={{fontSize: "10px", margin: "0px"}}>E-mail</p>
                    <Form.Group className="mb-3" controlId="progress">
                        <Form.Control 
                            style={{fontSize: "10px"}} 
                            type="text" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>
                </Stack>
            </Row>

            <Button 
                style={{fontSize: "10px", maxHeight: "30px"}} 
                variant="secondary" 
                size="sm" 
                as={Link} to="/" >
                Cancel
            </Button>

            <Button 
                style={{fontSize: "10px", maxHeight: "30px"}} 
                className="ms-2" 
                variant="primary" 
                size="sm" 
                type="submit"
                onClick={handleUpdate}>
                Update
            </Button>
        </Container>
        </>
    )
}

