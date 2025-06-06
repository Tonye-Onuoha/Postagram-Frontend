import React, { useState, useContext } from "react";
import { Button, Modal, Form, Dropdown } from "react-bootstrap";
import Toaster from "../Toaster";
import { updateData } from "../../helpers/fetchAPI";
import { getUser, refreshPage } from "../../hooks/user_actions";
import { Context } from "../Layout";

function UpdatePost(props) {
    const { post } = props;
    const { setToaster } = useContext(Context);
    const [form, setForm] = useState({});
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Add form handling logic here
    const handleSubmit = (event) => {
        event.preventDefault();

        const updatePostForm = event.currentTarget;
        if (updatePostForm.checkValidity() === false) {
            event.stopPropagation();
        }
        setValidated(true);
        const data = {
            author: post.author.id,
            body: form.body
        };

        (async () => {
            try {
                await updateData(`/api/core/posts/${post.id}/`, data);
                handleClose();
                setForm({});
                setToaster({
                    type: "success",
                    message: "Post updated 🚀",
                    show: true,
                    title: "Post update"
                });
                refreshPage();
            } catch (error) {
                handleClose();
                setToaster({
                    type: "danger",
                    message: "An error occurred.",
                    show: true,
                    title: "Error"
                });
            }
        })();
    };

    return (
        <>
            <Dropdown.Item onClick={handleShow} data-testid="show-modal-form">
                Modify
            </Dropdown.Item>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className="border-0">
                    <Modal.Title>Update Post</Modal.Title>
                </Modal.Header>
                <Modal.Body className="border-0">
                    <Form noValidate validated={validated} onSubmit={handleSubmit} data-testid="update-post-form">
                        <Form.Group className="mb-3">
                            <Form.Control
                                name="body"
                                value={form.body}
                                defaultValue={post.body}
                                onChange={(e) => setForm({ ...form, body: e.target.value })}
                                as="textarea"
                                rows={3}
                                data-testid="post-body-field"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSubmit} data-testid="update-post-submit">
                        Modify
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UpdatePost;
