import { Button, Form, Modal, Stack, Image } from "react-bootstrap";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { db } from "../utils/firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useForm } from "react-hook-form"

// props are from TaskCard.jsx
export const EditTaskModal = ({ isEditModal, handleEditModalClose, taskId, creatorPhoto, creatorName, refreshTasksHandle, }) => {

	const form = useForm();
	const { register, handleSubmit, reset, formState } = form;
	const { errors } = formState;

	const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;

	// retrieving current content from database
	useEffect(() => {
		const taskContent = async () => {
			try {
				const docRef = doc(db, "tasks", taskId);
				const docSnap = await getDoc(docRef);
				if (docSnap.exists()) {
					const taskData = docSnap.data();
					let defaultValues = {};
					defaultValues.taskname = taskData.taskName;
					defaultValues.taskdescription = taskData.descriptionTask;
					defaultValues.taskstatus = taskData.statusProject;
					defaultValues.taskpriority = taskData.priorityLevel;
					defaultValues.taskduedate = taskData.dueDate;
					reset({ ...defaultValues });
				}
			} catch (error) {
				console.log(error);
			}
		};
		if (isEditModal) {
			taskContent();
		}
	}, [isEditModal]);

	// updating new task content to database
	const handleUpdate = async (data) => {
		try {
			await updateDoc(doc(db, "tasks", taskId), {
				taskName: data.taskname,
				descriptionTask: data.taskdescription,
				statusProject: data.taskstatus,
				priorityLevel: data.taskpriority,
				dueDate: data.taskduedate
			});
			if (updateDoc) {
				handleEditModalClose();
				refreshTasksHandle(); // from Home.jsx, updates display and current task being edited by retrieving new data from database
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Modal show={isEditModal} onHide={handleEditModalClose}>
				<Form onSubmit={handleSubmit(handleUpdate)} noValidate>
					<Modal.Header closeButton>
						<Modal.Title style={{ fontSize: "15px" }} className="fw-bold">
							Edit Task
						</Modal.Title>
					</Modal.Header>

					<Modal.Body style={{ fontSize: "11px" }}>
						<Form.Group className="mb-3">
							<Form.Label className="fw-bold" style={{ margin: "2px" }}>
								Current Task Name
							</Form.Label>
							<Form.Control
								style={{ fontSize: "10px" }}
								type="text"
								id="taskname"
								{...register("taskname", {
									required: {
										value: true,
										message: "Task name is required!"
									}
								})}
							/>
							<p style={{ marginTop: "5px", fontSize: "10px", color: "red" }}>{errors.taskname?.message}</p>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label className="fw-bold" style={{ margin: "2px" }}>
								Description of Task
							</Form.Label>
							<Form.Control
								style={{ fontSize: "10px" }}
								type="text"
								as="textarea"
								rows={3}
								id="taskdescription"
								{...register("taskdescription", {
									required: {
										value: true,
										message: "Task description is required!"
									}
								})}
							/>
							<p style={{ marginTop: "5px", fontSize: "10px", color: "red" }}>{errors.taskdescription?.message}</p>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label className="fw-bold" style={{ margin: "2px" }}>
								Status of Project
							</Form.Label>
							<Form.Select
								style={{ fontSize: "10px" }}
								aria-label="Default select example"
								id="taskstatus"
								{...register("taskstatus", {
									required: true,
									message: "Status must be chosen!"
								})}
							>
								<option value="">Select status options</option>
								<option value="On Hold">On Hold</option>
								<option value="In Progress">In Progress</option>
								<option value="Done">Done</option>
								<option value="Cancelled">Cancelled</option>
							</Form.Select>
							<p style={{ marginTop: "5px", fontSize: "10px", color: "red" }}>{errors.taskstatus?.message}</p>
						</Form.Group>

						<Form.Group className="mb-3" controlId="progress">
							<Form.Label style={{ fontSize: "10px" }} className="fw-bold">
								What is the priority level of this project?
							</Form.Label>
							<Form.Select
								style={{ fontSize: "10px" }}
								aria-label="Default select example"
								id="taskpriority"
								{...register("taskpriority", {
									required: true,
									message: "Priority must be chosen!"
								})}
							>
								<option value="">Select priority level options</option>
								<option value="Urgent">Urgent</option>
								<option value="High">High</option>
								<option value="Medium">Medium</option>
								<option value="Low">Low</option>
							</Form.Select>
							<p style={{ marginTop: "5px", fontSize: "10px", color: "red" }}>{errors.taskpriority?.message}</p>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label className="fw-bold" style={{ margin: "2px" }}>
								Due Date
							</Form.Label>
							<Form.Control
								style={{ fontSize: "10px" }}
								type="text"
								id="taskduedate"
								{...register("taskduedate", {
									required: {
										value: true,
										message: "Due date is required!"
									},
									pattern: {
										value: dateRegex,
										message: "Invalid date format"
									}
								})}
							/>
							<p style={{ marginTop: "5px", fontSize: "10px", color: "red" }}>{errors.taskduedate?.message}</p>
						</Form.Group>

						<Stack direction="horizontal">
							<Image
								style={{
									height: "35px",
									width: "35px",
									objectFit: "cover",
									borderRadius: "50%",
								}}
								src={creatorPhoto} // user photo of task creator
								roundedCircle
							/>
							<p style={{ fontSize: "10px" }} className="mt-3 ms-2">
								Created by: {creatorName}
							</p>
						</Stack>
					</Modal.Body>

					<Modal.Footer>
						<Button
							style={{ fontSize: "10px", maxHeight: "30px" }}
							className="ms-2"
							variant="secondary"
							size="sm"
							onClick={handleEditModalClose}
						>
							Cancel
						</Button>

						<Button
							style={{ fontSize: "10px", maxHeight: "30px" }}
							className="ms-2"
							variant="primary"
							size="sm"
							type="submit"
						>
							Update
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	);
};

EditTaskModal.propTypes = {
	isEditModal: PropTypes.any,
	handleEditModalClose: PropTypes.func,
	creatorPhoto: PropTypes.any,
	creatorName: PropTypes.any,
	taskId: PropTypes.any,
	refreshTasksHandle: PropTypes.func,
};
