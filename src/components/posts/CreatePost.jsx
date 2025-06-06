import React, { useState, useContext } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import Toaster from "../Toaster";
import { useNavigate } from "react-router-dom";
import { postData } from "../../helpers/fetchAPI";
import { getUser } from "../../hooks/user_actions";
import { Context } from "../Layout";

function CreatePost() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [validated, setValidated] = useState(false);
    const [form, setForm] = useState({});
    const { toaster, setToaster } = useContext(Context);
    const navigate = useNavigate();
    const user = getUser();

    const handleSubmit = (event) => {
        event.preventDefault();

        const createPostForm = event.currentTarget;
        if (createPostForm.checkValidity() === false) {
            event.stopPropagation();
        }
        setValidated(true);
        const data = {
            author: user.id,
            body: form.body
        };

        (async () => {
            try {
                const response_data = await postData("/api/core/posts/", data);
                handleClose();
                setForm({});
                setToaster({ ...toaster, title: "Post", message: "Post created 🚀", type: "success", show: true });
            } catch (error) {
                handleClose();
                setToaster({ ...toaster, title: "Post", message: "An error occurred.", type: "danger", show: true });
                const user = getUser();
                if (!user) {
                    navigate("/login/");
                }
            }
        })();
    };

    return (
        <>
            <Form.Group className="my-3 w-75">
                <Form.Control
                    className="py-2 rounded-pill border-primary text-primary"
                    type="text"
                    placeholder="Write a post"
                    onClick={handleShow}
                    data-testid="show-modal-form"
                />
            </Form.Group>

            {/*Add modal code here*/}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className="border-0">
                    <Modal.Title>Create Post</Modal.Title>
                </Modal.Header>
                <Modal.Body className="border-0">
                    <Form noValidate validated={validated} onSubmit={handleSubmit} data-testid="create-post-form">
                        <Form.Group className="mb-3">
                            <Form.Control
                                name="body"
                                value={form.body}
                                onChange={(e) => setForm({ ...form, body: e.target.value })}
                                as="textarea"
                                rows={3}
                                data-testid="post-body-field"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={handleSubmit}
                        disabled={!form.body}
                        data-testid="create-post-submit">
                        Post
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CreatePost;
