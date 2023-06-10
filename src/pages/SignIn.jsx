import { useState } from 'react'
import { Button, Card, Container, Form, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { loginUser } from '../features/user/userSlice'
import { doc, getDoc } from "firebase/firestore"
import { db } from "../utils/firebase-config"

export const SignIn = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [alert, setAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")

    const navigate = useNavigate()

    const auth = getAuth()
    const dispatch = useDispatch();

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate("/")
        } catch (error) {
            setAlert(true)
            setAlertMessage(error.code)
            console.log(error.code)
        } finally {
            const docRef = doc(db, "users", auth.currentUser.uid)
            const docSnap = await getDoc(docRef)
            if (auth && docSnap.exists()) {
                const data = docSnap.data()
                dispatch(loginUser({
                    userId: auth.currentUser.uid,
                    firstName: auth.currentUser.displayName,
                    lastName: data.lastname,
                    title: data.title,
                    email: auth.currentUser.email    
                }))
            }
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
                <h4 className="fw-bold d-flex justify-content-center">Sign In</h4>
                <p className="d-flex justify-content-center">Not registered?&nbsp; 
                    <Link className="link-primary fw-bold" style={{cursor: "pointer"}} to="/signup">Sign Up</Link> 
                </p>

                <p className="fw-bold mb-1" style={{fontSize: "10px", margin: "0px"}}>Email Address</p>
                <Form.Group className="mb-3">
                    <Form.Control 
                        style={{fontSize: "10px"}} 
                        type="email"
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <p className="fw-bold mb-1" style={{fontSize: "10px", margin: "0px"}}>Password</p>
                <Form.Group className="mb-3">
                    <Form.Control 
                        style={{fontSize: "10px"}} 
                        type="password"
                        placeholder="Enter password" 
                        onChange={(e) => setPassword(e.target.value)}/>
                </Form.Group>

                <Button 
                    style={{fontSize: "10px", maxHeight: "30px"}} 
                    variant="primary"  
                    size="sm" 
                    type="submit"
                    onClick={handleLogin}>
                    Login
                </Button>

                <p className="d-flex justify-content-center link-primary mt-3">Forgot password?&nbsp;</p>
            </Card>
        </Form>
        </Container>
        </>
    )
}

