import { useEffect, useState } from "react";
import { ViewTaskModal } from "./ViewTaskModal";
import { EditTaskModal } from "./EditTaskModal";
import {
	Button,
	Card,
	Col,
	Container,
	Row,
	Image,
	NavLink,
} from "react-bootstrap";
import PropTypes from "prop-types";
import { getStorage, getDownloadURL, ref } from "firebase/storage";
import { db } from "../utils/firebase-config";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { DeleteModal } from "./DeleteModal";

export const TaskCard = (props) => {
	//retrieving prop data from Home.jsx
	const { taskName, statusProject, priorityLevel, dueDate, userId, taskId } =
		props.task;
	const { refreshTasksHandle } = props;

	const currentUser = useSelector((state) => state.user);

	const [showViewModal, setShowViewModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [creatorPhoto, setCreatorPhoto] = useState("");
	const [creatorName, setCreatorName] = useState("");

	// visibility functionality for modals
	const handleClose = () => setShowViewModal(false);
	const handleEditModalClose = () => setShowEditModal(false);

	// routing for database
	const storage = getStorage();
	const storageRef = ref(storage);

	// retrieving users information from database
	useEffect(() => {
		const fetchCreatorInfo = async () => {
			try {
				const creatorPhotoURL = await getDownloadURL(
					ref(storageRef, `user-photo/${userId}`)
				);
				if (creatorPhotoURL) {
					setCreatorPhoto(creatorPhotoURL);
				}
				const docRef = doc(db, "users", userId);
				const docSnap = await getDoc(docRef);
				if (docSnap.exists()) {
					const data = docSnap.data();
					setCreatorName(`${data.firstname} ${data.lastname}`);
				}
			} catch (error) {
				console.log(error);
			}
		};
		fetchCreatorInfo();
	}, []);

	const [show, setShow] = useState(false);
	const handleShow = () => setShow(true);

	const handleDeleteTaskCard = async () => {
		try {
			const documentRef = doc(db, "tasks", taskId);
			await deleteDoc(documentRef);
			refreshTasksHandle();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Container className="mt-3">
				<Card>
					<Card.Header style={{ fontSize: "9px", height: "30px" }}>
						<Row>
							<Col>Task ID: {taskId}</Col>
							{userId === currentUser.userId ? (
								<Col
									style={{ fontSize: "10px", color: "red" }}
									className="fw-bold"
								>
									<NavLink onClick={handleShow}>Delete Task</NavLink>
								</Col>
							) : null}
							{show ? (
								<DeleteModal
									handleDelete={handleDeleteTaskCard}
									setShow={setShow}
									show={show}
									type={"task"}
								/>
							) : null}
						</Row>
					</Card.Header>
					<Card.Body>
						<Row style={{ fontSize: "9px" }} className="fw-bold">
							<Col xs lg="5">
								Name
							</Col>
							<Col xs lg="3">
								Status
							</Col>
							<Col xs lg="2">
								Priority Level
							</Col>
							<Col xs lg="2">
								Due
							</Col>
						</Row>
						<Row style={{ fontSize: "12px" }}>
							<Col xs lg="5">
								{taskName}
							</Col>
							<Col xs lg="3">
								{statusProject}
							</Col>
							<Col xs lg="2">
								{priorityLevel}
							</Col>
							<Col xs lg="2">
								{dueDate}
							</Col>
						</Row>
						<Row style={{ height: "55px" }}>
							<hr className="mt-2"></hr>
							<Col xs lg="10" className="d-flex">
								<Image
									style={{
										height: "35px",
										width: "35px",
										objectFit: "cover",
										borderRadius: "50%",
									}}
									src={creatorPhoto}
									roundedCircle
								/>
								<p style={{ fontSize: "10px" }} className="mt-2 ms-2">
									Created by: {creatorName}
								</p>
							</Col>
							<Col xs lg="2" className="d-flex mt-1">
								{/* IF EDIT BUTTON IS CLICKED AND MATCHES LOGGED IN USER - MODAL IS SHOWN */}
								{currentUser.userId !== userId ? null : (
									<>
										<EditTaskModal
											showEditModal={showEditModal}
											handleEditModalClose={handleEditModalClose}
											taskId={taskId}
											creatorPhoto={creatorPhoto}
											creatorName={creatorName}
											refreshTasksHandle={refreshTasksHandle}
										/>

										<Button
											style={{ fontSize: "10px", maxHeight: "30px" }}
											variant="primary"
											size="sm"
											className="px-3"
											onClick={() => setShowEditModal(true)}
										>
											Edit
										</Button>
									</>
								)}

								{/* IF VIEW BUTTON IS CLICKED MODAL IS SHOWN */}
								<ViewTaskModal
									show={showViewModal}
									handleClose={handleClose}
									taskId={taskId}
									creatorPhoto={creatorPhoto}
									creatorName={creatorName}
								/>
								<Button
									style={{ fontSize: "10px", maxHeight: "30px" }}
									variant="primary"
									size="sm"
									className="px-3 ms-2"
									onClick={() => setShowViewModal(true)}
								>
									Details
								</Button>
							</Col>
						</Row>
					</Card.Body>
				</Card>
			</Container>
		</>
	);
};

TaskCard.propTypes = {
	task: PropTypes.object,
	taskName: PropTypes.any,
	statusProject: PropTypes.any,
	priorityLevel: PropTypes.any,
	dueDate: PropTypes.any,
	userId: PropTypes.any,
	taskId: PropTypes.any,
	refreshTasksHandle: PropTypes.func,
};
