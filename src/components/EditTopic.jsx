import { Form, Stack, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { db } from "../utils/firebase-config";
import { doc, updateDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";

export const EditTopic = ({ setIsEditTopicDisplayed, description, id, setIsTopicRefreshed, }) => {

	const form = useForm({
		defaultValues: {
			newdescription: description
		}
	});
	const { register, handleSubmit, formState } = form;
	const { errors } = formState;

	// function updates the topic's description and refreshes the topic data for immediate update
	const onSubmit = async (data) => {
		console.log("submitted")
		try {
			await updateDoc(doc(db, "topics", id), {
				description: data.newdescription,
			});
			if (updateDoc) {
				setIsEditTopicDisplayed(false);
				setIsTopicRefreshed((current) => !current);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Form className="mt-4" onSubmit={handleSubmit(onSubmit)} noValidate>
				<Form.Group className="mb-3">
					<Form.Control
						style={{ fontSize: "10px" }}
						maxLength={100000}
						rows={5}
						type="text"
						as="textarea"
						id="newdescription"
						{...register("newdescription", {
							required: {
								value: true,
								message: "Description of task is required!"
							}
						})}
					/>
					<p style={{ marginTop: "5px", fontSize: "10px", color: "red" }}>{errors.newdescription?.message}</p>
				</Form.Group>


				<Stack direction="horizontal" gap={1}>
					<Button
						style={{ fontSize: "10px", maxHeight: "30px", minWidth: "40px" }}
						className="ms-2"
						variant="dark"
						size="sm"
						onClick={() => setIsEditTopicDisplayed(false)}
					>
						Cancel
					</Button>
					<Button
						style={{ fontSize: "10px", maxHeight: "30px", minWidth: "40px" }}
						className="ms-2"
						variant="dark"
						size="sm"
						type="submit"
					>
						Update
					</Button>
				</Stack>
			</Form>
		</>
	);
};

EditTopic.propTypes = {
	description: PropTypes.string,
	id: PropTypes.string,
	setIsEditTopicDisplayed: PropTypes.func,
	setIsTopicRefreshed: PropTypes.func,
};
