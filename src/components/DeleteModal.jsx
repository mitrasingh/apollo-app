import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";

export const DeleteModal = ({ handleDelete, setShow, show, type }) => {
	const handleClose = () => setShow(false);

	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title style={{ fontSize: "11px" }}>Confirm Delete</Modal.Title>
				</Modal.Header>
				<Modal.Body style={{ fontSize: "9px" }}>
					Are you sure you want to delete this {type}?
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Cancel
					</Button>
					<Button variant="primary" onClick={handleDelete}>
						Delete
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

DeleteModal.propTypes = {
	setShow: PropTypes.func,
	show: PropTypes.bool,
	type: PropTypes.string,
	handleDelete: PropTypes.func,
};
