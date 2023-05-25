import { Button, Modal, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { editUser } from "../services/UserService";
import { toast } from "react-toastify";

const ModalEditUser = (props) => {
  const { show, handleClose, dataUserEdit, handleEditUserFromModal } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  useEffect(() => {
    if (show) {
      setName(dataUserEdit.first_name);
    }
  }, [dataUserEdit, show]);

  const handleEditUser = async () => {
    try {
      await editUser(name, job);
      handleEditUserFromModal({
        id: dataUserEdit.id,
        first_name: name,
      });
      handleClose();
      toast.success(`You have successfully edited the user ${name}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit a user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Dam Trong Nhan"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group>
                <Form.Label>Job</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder=""
                  value={job}
                  onChange={(event) => {
                    setJob(event.target.value);
                  }}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Form.Group className="mb-3">
              <Form.Check
                required
                label="Agree to terms and conditions"
                feedback="You must agree before submitting."
                feedbackType="invalid"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditUser}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalEditUser;
