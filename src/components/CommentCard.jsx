import PropTypes from "prop-types";
import formatDate from ".././utils/format-date";
import { useSelector } from "react-redux";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../utils/firebase-config";
import { useContext, useState } from "react";
import { TopicIdContext } from "../utils/TopicIdContext";
import { EditComment } from "../components/EditComment";
import { Like } from "../components/Like";
import {
	Container,
	Row,
	Col,
	Stack,
	Image,
	Card,
	Dropdown,
} from "react-bootstrap";
import { DeleteModal } from "../components/DeleteModal";

export const CommentCard = (props) => {
	// props from the parent TopicDetails.jsx
	const {
		userPhoto,
		userId,
		firstName,
		lastName,
		userComment,
		datePosted,
		commentId,
	} = props.comment;

	// data of currently logged in user from redux
	const currentUser = useSelector((state) => state.user);

	// data from useContext (id and setCommentsRefreshList from TopicDetails.jsx)
	const { setCommentsRefreshList } = useContext(TopicIdContext);

	// displays edit fields for the comment when set to true
	const [isEditComment, setIsEditComment] = useState(false);

	const [show, setShow] = useState(false);
	const handleShow = () => setShow(true);

	// function deletes the comment
	const handleDeleteComment = async () => {
		// const documentRef = doc(db,"topics",id,"comments",commentId)
		try {
			const commentRef = doc(db, "comments", commentId);
			await deleteDoc(commentRef);
			setCommentsRefreshList((current) => !current);
			setShow(false);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container className="mt-4">
			<Card style={{ padding: "10px" }}>
				<Row>
					<Col>
						<Stack direction="horizontal" gap={2}>
							<Image
								style={{
									height: "25px",
									width: "25px",
									objectFit: "cover",
									borderRadius: "50%",
								}}
								src={userPhoto}
								roundedCircle
							/>
							<p style={{ fontSize: "9px", marginTop: "12px" }}>
								{firstName} {lastName}
							</p>
							<p style={{ fontSize: "8px", marginTop: "12px" }}>
								posted at: {formatDate(datePosted)}
							</p>

							{userId === currentUser.userId ? (
								<>
									<Dropdown>
										<Dropdown.Toggle
											style={{ maxHeight: "20px" }}
											className="d-flex align-items-center"
											split
											variant="dark"
											id="dropdown-split-basic"
										></Dropdown.Toggle>

										<Dropdown.Menu style={{ fontSize: "10px" }}>
											<Dropdown.Item onClick={() => setIsEditComment(true)}>
												Edit
											</Dropdown.Item>
											<Dropdown.Item onClick={handleShow}>Delete</Dropdown.Item>
											{show ? (
												<DeleteModal
													handleDelete={handleDeleteComment}
													setShow={setShow}
													show={show}
													type={"comment"}
												/>
											) : null}
										</Dropdown.Menu>
									</Dropdown>
								</>
							) : null}
						</Stack>

						{isEditComment ? (
							<EditComment
								userComment={userComment}
								setIsEditComment={setIsEditComment}
								commentId={commentId}
							/>
						) : (
							<Stack className="mt-2">
								<Row>
									<Col>
										<p style={{ fontSize: "11px" }}>{userComment}</p>
									</Col>
								</Row>
							</Stack>
						)}
						<Like docId={commentId} />
					</Col>
				</Row>
			</Card>
		</Container>
	);
};

CommentCard.propTypes = {
	comment: PropTypes.any,
	userId: PropTypes.string,
	userPhoto: PropTypes.string,
	firstName: PropTypes.string,
	lastName: PropTypes.string,
	userComment: PropTypes.string,
	datePosted: PropTypes.string,
	topicId: PropTypes.string,
	commentId: PropTypes.string,
};
