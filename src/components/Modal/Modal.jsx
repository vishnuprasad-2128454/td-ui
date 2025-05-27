import { Modal, Button } from "react-bootstrap";

const ModalComponent = (props) => {
  const { onConfirm, onHide, show } = props;
  return (
    <Modal
      onHide={onHide}
      show={show}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="bg-warning">
          Warning! No Rooms Available!!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-primary">
          All the rooms are reserved for 72 hours. Do you wish to continue with
          waitlist booking?
        </p>
      </Modal.Body>
      <Modal.Footer className="d-flex text-align-center">
        <Button variant="success" onClick={onConfirm}>
          Yes
        </Button>
        <Button variant="danger" onClick={onHide}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;
