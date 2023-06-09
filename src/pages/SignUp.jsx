import { createUserWithEmailAndPassword, updateProfile, getAuth } from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { db } from "../utils/firebase-config"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { useState } from "react"
import { Container, Form, Card, Button, Alert, Row, Col, Stack, Image } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { loginUser } from "../features/user/userSlice"
import { Link, useNavigate } from "react-router-dom"


export const SignUp = () => {

    const [firstName, setFirstName] = useState("")
    const [userPhoto, setUserPhoto] = useState(null)
    const [lastName, setLastName] = useState("")
    const [title, setTitle] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [verifyPassword, setVerifyPassword] = useState("")
    const [photoURL, setPhotoURL] = useState("")
    
    const [alert, setAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const auth = getAuth()

    const storage = getStorage()
    const storageRef = ref(storage)
    
    const handleSignUp = async (event) => {
        event.preventDefault();
        try {
            if (password === verifyPassword) {
                await createUserWithEmailAndPassword(auth, email, password)
                await updateProfile(auth.currentUser, {
                    displayName: firstName,
                })
                await setDoc(doc(db,"users", `${auth.currentUser.uid}`), {
                    lastname: lastName,
                    title: title,
                })
                if (auth) {
                    const imageRef = ref(storageRef, `user-photo/${auth.currentUser.uid}`)
                    await uploadBytes(imageRef, userPhoto)
                    navigate("/")
                }
            } else {
                setAlert(true)
                setAlertMessage("Passwords do not match")
            }
        } catch (error) {
            setAlert(true)
            setAlertMessage(error.code)
            console.log(error.code)
        } finally {
            const docRef = doc(db, "users", auth.currentUser.uid)
            const docSnap = await getDoc(docRef)
            const userPhotoURL = await getDownloadURL(ref(storageRef, `user-photo/${auth.currentUser.uid}`))
            if (auth && userPhotoURL && docSnap.exists()) {
                const data = docSnap.data()
                dispatch(loginUser({
                    userId: auth.currentUser.uid,
                    userPhoto: userPhotoURL,
                    firstName: auth.currentUser.displayName,
                    lastName: data.lastname,
                    title: data.title,
                    email: auth.currentUser.email
                }))
            }
        }
    }

    // temporary upload allowing user to see how photo will appear
    const uploadPhoto = async (e) => {
        e.preventDefault()
        try {
            if (userPhoto == null) return null

            const imageRef = ref(storageRef, "user-photo/temp")
            await uploadBytes(imageRef, userPhoto)
            const getURL = await getDownloadURL(ref(storageRef, "user-photo/temp"))
            console.log(getURL)
            setPhotoURL(`${getURL}`)
        } catch (error) {
            setAlert(true)
            setAlertMessage(error.code)
            console.log(error.code)
        }
    }

    return (
        <>
        {alert ? (
                <Alert variant="danger" onClose={() => setAlert(false)} dismissible>
                    <Alert.Heading>There is an error!</Alert.Heading>
                    <p>Reason: {alertMessage}</p>
                </Alert>
            ) : ( 
                null
            )}
        
        <Container style={{fontSize: "10px", maxWidth: "400px"}} className="mt-4">
            <Form>
                <Card className="px-4 py-4">
                    <h4 className="fw-bold d-flex justify-content-center">Sign Up</h4>
                    <p className="d-flex justify-content-center">Already registered?&nbsp; 
                        <Link className="link-primary fw-bold" style={{cursor: "pointer"}} to="/signin">Sign In</Link> 
                    </p>

                    <Row className="mb-4 d-flex justify-content-center">
                        <Col xs lg="2">
                            <Stack direction="vertical">
                                <Image
                                    style={{
                                        height: "120px",
                                        width: "120px",
                                        objectFit: "cover",
                                        borderRadius: "50%"
                                    }}
                                    src={photoURL === "" ? "src/img/default-profile.png" : photoURL}
                                    roundedCircle 
                                />
                            </Stack>
                        </Col>
                    </Row>
                    
                    <Row className="d-flex justify-content-center">
                        <Form.Group controlId="formFileSm" className="mb-3">
                            <Form.Label style={{fontSize: "10px"}}>Square image recommended for better fitment.</Form.Label>
                            <Form.Control 
                                type="file" 
                                size="sm" 
                                onChange={(event) => setUserPhoto(event.target.files[0])} 
                            />
                        </Form.Group>
                    </Row>

                    <Row className="justify-content-center">
                        <Button 
                            style={{fontSize: "10px", maxHeight: "30px", maxWidth: "130px"}} 
                            variant="primary"  
                            size="sm" 
                            type="submit"
                            onClick={uploadPhoto}
                            >
                            Upload Photo
                        </Button>
                    </Row>

                    <p className="fw-bold mb-1" style={{fontSize: "10px", margin: "0px"}}>First Name</p>
                    <Form.Group className="mb-3">
                        <Form.Control 
                            style={{fontSize: "10px"}} 
                            type="text" 
                            placeholder="Enter first name" 
                            onChange={(e) => setFirstName(e.target.value)}/>
                    </Form.Group>

                    <p className="fw-bold mb-1" style={{fontSize: "10px", margin: "0px"}}>Last Name</p>
                    <Form.Group className="mb-3">
                        <Form.Control 
                            style={{fontSize: "10px"}} 
                            type="text" 
                            placeholder="Enter last name" 
                            onChange={(e) => setLastName(e.target.value)}/>
                    </Form.Group>

                    <p className="fw-bold mb-1" style={{fontSize: "10px", margin: "0px"}}>Title</p>
                    <Form.Group className="mb-3" controlId="progress">
                        <Form.Control 
                            style={{fontSize: "10px"}} 
                            type="text" 
                            placeholder="Enter your company title" 
                            onChange={(e) => setTitle(e.target.value)}/>
                    </Form.Group>

                    <p className="fw-bold mb-1" style={{fontSize: "10px", margin: "0px"}}>Email Address</p>
                    <Form.Group className="mb-3">
                        <Form.Control 
                            style={{fontSize: "10px"}} 
                            type="text" 
                            placeholder="Enter email" 
                            onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Group>

                    <p className="fw-bold mb-1" style={{fontSize: "10px", margin: "0px"}}>Password</p>
                    <Form.Group className="mb-3">
                        <Form.Control 
                            style={{fontSize: "10px"}} 
                            type="password" 
                            placeholder="Enter password" 
                            onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>

                    <p className="fw-bold mb-1" style={{fontSize: "10px", margin: "0px"}}>Confirm Password</p>
                    <Form.Group className="mb-3">
                        <Form.Control 
                            style={{fontSize: "10px"}} 
                            type="password" 
                            placeholder="Enter password again" 
                            onChange={(e) => setVerifyPassword(e.target.value)}/>
                    </Form.Group>

                    <Button 
                        style={{fontSize: "10px", maxHeight: "30px"}} 
                        variant="primary"  
                        size="sm" 
                        type="submit"
                        onClick={handleSignUp}>
                        Sign Up
                    </Button>

                    <Button 
                        style={{fontSize: "10px", maxHeight: "30px"}}
                        variant="secondary"
                        className="mt-2" 
                        size="sm"
                        as={Link} to="/signin" 
                        >
                        Cancel
                    </Button>

                    <p className="d-flex justify-content-center link-primary mt-3">Forgot password?&nbsp;</p>

                </Card>
            </Form>
        </Container>
        </>      
    )
}
