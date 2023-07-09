import { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row, Stack, Image } from 'react-bootstrap'
import { useSelector } from "react-redux"
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { useDispatch } from "react-redux"
import { editUser } from "../features/user/userSlice"
import { Link, useNavigate } from "react-router-dom"
import { getAuth, updateProfile, updateEmail } from "firebase/auth"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../utils/firebase-config"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"




export const Profile = () => {

    // CURRENTLY WE HAVE COMPONENTS DATA AS USESTATE VARIABLES (WHICH ARE EMPTY) 
    // MAKE THE DATA MATCH REDUX DATA, THEN UPDATE DATA TO FIRESTORE DATABASE
    // MAKE A FUNCTION USING USESTATE CALLED HANDLEUPDATETOLOCALDATA (OR SOMETHING LIKE THAT)

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

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            await updateProfile(auth.currentUser, {
                displayName: firstName
            })
            
            const imageRef = ref(storageRef, `user-photo/${auth.currentUser.uid}`)
            await uploadBytes(imageRef, userUpdatedPhoto)
            const userPhotoURL = await getDownloadURL(ref(storageRef, `user-photo/${auth.currentUser.uid}`))

            if (userPhotoURL) {
                setPhotoURL(userPhotoURL)
            }
            
            await updateEmail(auth.currentUser, email)

            await updateDoc(doc(db, "users", auth.currentUser.uid),{
                firstname: firstName,
                lastname: lastName,
                title: title
            })            
            dispatch(editUser({
                userId: user.userId,
                userPhoto: photoURL,
                firstName: firstName,
                lastName: lastName,
                title: title,
                email: email
            }))
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }


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

