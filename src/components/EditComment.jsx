import { Form, Stack, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { useContext } from "react";
import { db } from "../utils/firebase-config";
import { doc, updateDoc } from "firebase/firestore";
import { TopicIdContext } from "../utils/TopicIdContext";
import { useForm } from "react-hook-form";

export const EditComment = ({ userComment, setIsEditComment, commentId }) => {

	// const [userInput, setUserInput] = useState(userComment);
	const { setIsCommentsRefreshed } = useContext(TopicIdContext);

	const form = useForm({
		defaultValues: {
			editcomment: userComment
		}
	})
	const { register, handleSubmit, formState } = form;
	const { errors } = formState;

	const handleUpdateButton = async (data) => {
		try {
			await updateDoc(doc(db, "comments", commentId), {
				userComment: data.editcomment,
			});
			if (updateDoc) {
				setIsEditComment(false);
				setIsCommentsRefreshed((current) => !current);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Form className="mt-4" onSubmit={handleSubmit(handleUpdateButton)} noValidate>
				<Form.Group className="mb-3">
					<Form.Control
						style={{ fontSize: "10px" }}
						maxLength={100000}
						rows={5}
						type="text"
						as="textarea"
						placeholder="What are your thoughts?"
						id="editcomment"
						{...register("editcomment", {
							required: {
								value: true,
								message: "This field cannot be empty!"
							}
						})}
					// value={userInput}
					// onChange={(e) => setUserInput(e.target.value)}
					/>
				</Form.Group>

				<Stack direction="horizontal" gap={1}>
					<Button
						style={{ fontSize: "10px", maxHeight: "30px", minWidth: "40px" }}
						className="ms-2"
						variant="dark"
						size="sm"
						type="submit"
						onClick={() => setIsEditComment(false)}
					>
						Cancel
					</Button>
					<Button
						style={{ fontSize: "10px", maxHeight: "30px", minWidth: "40px" }}
						className="ms-2"
						variant="dark"
						size="sm"
						type="submit"
					// onClick={handleUpdateButton}
					>
						Update
					</Button>
				</Stack>
				<p style={{ marginTop: "5px", fontSize: "10px", color: "red" }}>{errors.editcomment?.message}</p>
			</Form>

		</>
	);
};

EditComment.propTypes = {
	userComment: PropTypes.string,
	commentId: PropTypes.string,
	setIsEditComment: PropTypes.func,
};
