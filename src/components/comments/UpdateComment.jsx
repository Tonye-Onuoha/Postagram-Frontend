import React, { useState, useContext } from "react";
import { Button, Modal, Form, Dropdown } from "react-bootstrap";
import { updateData } from "../../helpers/fetchAPI";
import { refreshPage } from "../../hooks/user_actions";
import { Context } from "../Layout";

function UpdateComment(props) {
    const { postId, comment } = props;
    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);
    const [form, setForm] = useState({ author: comment.author.id, body: comment.body, post: postId });
    const { toaster, setToaster } = useContext(Context);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const updateCommentForm = event.currentTarget;

        if (updateCommentForm.checkValidity() === false) {
            event.stopPropagation();
        }

        setValidated(true);

        const data = {
            author: form.author,
            body: form.body,
            post: postId
        };

        (async () => {
            try {
                await updateData(`/api/core/posts/${postId}/comment/${comment.id}/`, data);
                handleClose();
                setForm({});
                setToaster({
                    type: "success",
                    message: "Comment updated 🚀",
                    show: true,
                    title: "Success!"
                });
                refreshPage();
            } catch (error) {
                handleClose();
                setToaster({
                    type: "danger",
                    message: "An error occurred.",
                    show: true,
                    title: "Comment Error"
                });
            }
        })();
    };
    return (
        <>
            <Dropdown.Item onClick={handleShow} data-testid="modify-link">
                Modify
            </Dropdown.Item>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className="border-0">
                    <Modal.Title>Update Post</Modal.Title>
                </Modal.Header>
                <Modal.Body className="border-0">
                    <Form noValidate validated={validated} onSubmit={handleSubmit} data-testid="update-comment-form">
                        <Form.Group className="mb-3">
                            <Form.Control
                                name="body"
                                value={form.body}
                                onChange={(e) => setForm({ ...form, body: e.target.value })}
                                as="textarea"
                                rows={3}
                                data-testid="form-input"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSubmit} data-testid="form-button">
                        Modify
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default UpdateComment;
