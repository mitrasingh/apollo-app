import { useState } from "react";
import { Button, Card, Container, Form, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/user/userSlice";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase-config";
import { ForgotPasswordModal } from "../components/ForgotPasswordModal";
import { useForm } from "react-hook-form";

export const SignIn = () => {

    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");

    const auth = getAuth();
    const dispatch = useDispatch();

    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const [show, setShow] = useState(false);

    const form = useForm();
    const { register, handleSubmit, formState } = form;
    const { errors } = formState;

    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const navigate = useNavigate();

    const handleLogin = async (data) => {
        // e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            const docRef = doc(db, "users", auth.currentUser.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const userData = docSnap.data();
                dispatch(
                    loginUser({
                        userId: auth.currentUser.uid,
                        firstName: auth.currentUser.displayName,
                        lastName: userData.lastname,
                        title: userData.title,
                        email: auth.currentUser.email,
                    })
                );
            }
            navigate("/");
        } catch (error) {
            setAlert(true);
            setAlertMessage(error.code);
        }
    };

    const handleCloseForgotPasswordModal = () => {
        setShow(false);
    };

    return (
        <>
            {alert ? (
                <Alert variant="danger" onClose={() => setAlert(false)} dismissible>
                    <Alert.Heading>There is an error!</Alert.Heading>
                    <p>Reason: {alertMessage}</p>
                </Alert>
            ) : null}

            <Container
                style={{ fontSize: "10px", maxWidth: "400px" }}
                className="mt-4"
            >
                <Form onSubmit={handleSubmit(handleLogin)} noValidate>
                    <Card className="px-4 py-4">
                        <h4 className="fw-bold d-flex justify-content-center">Sign In</h4>
                        <p className="d-flex justify-content-center">
                            Not registered?&nbsp;
                            <Link
                                className="link-primary fw-bold"
                                style={{ cursor: "pointer" }}
                                to="/signup"
                            >
                                Sign Up
                            </Link>
                        </p>

                        <p className="fw-bold mb-1" style={{ fontSize: "10px", margin: "0px" }}>Email Address</p>
                        <Form.Group className="mb-3">
                            <Form.Control
                                style={{ fontSize: "10px" }}
                                type="text"
                                placeholder="Enter email"
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: "Email is required!"
                                    },
                                    pattern: {
                                        value: emailRegex,
                                        message: "Invalid email format!"
                                    }
                                })}
                            // onChange={(e) => setEmail(e.target.value)}
                            />
                            <p style={{ marginTop: "5px", fontSize: "10px", color: "red" }}>{errors.email?.message}</p>
                        </Form.Group>

                        <p className="fw-bold mb-1" style={{ fontSize: "10px", margin: "0px" }}>Password</p>
                        <Form.Group className="mb-3">
                            <Form.Control
                                style={{ fontSize: "10px" }}
                                type="password"
                                placeholder="Enter password"
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: "Password is required!"
                                    }
                                })}
                            // onChange={(e) => setPassword(e.target.value)}
                            />
                            <p style={{ marginTop: "5px", fontSize: "10px", color: "red" }}>{errors.password?.message}</p>
                        </Form.Group>

                        <Button
                            style={{ fontSize: "10px", maxHeight: "30px" }}
                            variant="primary"
                            size="sm"
                            type="submit"
                        // onClick={handleLogin}
                        >
                            Login
                        </Button>

                        <Link
                            className="d-flex justify-content-center link-primary mt-3"
                            onClick={() => setShow(true)}
                        >
                            Forgot password?
                        </Link>

                        <ForgotPasswordModal
                            show={show}
                            handleCloseForgotPasswordModal={handleCloseForgotPasswordModal}
                        />
                    </Card>
                </Form>
            </Container>
        </>
    );
};
