import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";

export const DeleteModal = ({
	handleDelete,
	setIsVisible,
	isVisible,
	type,
}) => {
	const handleClose = () => setIsVisible(false);

	return (
		<>
			<Modal show={isVisible} onHide={handleClose}>
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
	setIsVisible: PropTypes.func,
	isVisible: PropTypes.bool,
	type: PropTypes.string,
	handleDelete: PropTypes.func,
};
