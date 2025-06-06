import React, { useState, useContext } from "react";
import { format } from "timeago.js";
import { Button, Form, Image, Card, Dropdown } from "react-bootstrap";
import { randomAvatar } from "../../utils";
import { getUser, refreshPage } from "../../hooks/user_actions";
import { postData } from "../../helpers/fetchAPI";
import { Context } from "../Layout";
import MoreToggleIcon from "../posts/Post";

function CreateComment(props) {
    const { postId } = props;
    const [validated, setValidated] = useState(false);
    const [form, setForm] = useState({});
    const { toaster, setToaster } = useContext(Context);
    const user = getUser();

    const handleSubmit = (event) => {
        event.preventDefault();

        const createCommentForm = event.currentTarget;
        if (createCommentForm.checkValidity() === false) {
            event.stopPropagation();
        }

        setValidated(true);
        const data = {
            author: user.id,
            body: form.body,
            post: postId
        };

        (async () => {
            try {
                await postData(`/api/core/posts/${postId}/comment/`, data);
                setForm({ ...form, body: "" });
                setToaster({
                    ...toaster,
                    title: "Comment!",
                    message: "Comment posted successfully🚀",
                    type: "success",
                    show: true
                });
                refreshPage();
            } catch (error) {
                console.log(error);
                setToaster({
                    ...toaster,
                    title: "Comment!",
                    message: "An error occurred.",
                    type: "danger",
                    show: true
                });
            }
        })();
    };

    return (
        <Form
            className="d-flex flex-row justify-content-between"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            data-testid="create-comment-form">
            <Image
                src={process.env.NODE_ENV == "test" ? randomAvatar() : user.avatar}
                roundedCircle
                width={48}
                height={48}
                className="my-2"
            />
            <Form.Group className="m-3 w-75">
                <Form.Control
                    className="py-2 rounded-pill border-primary"
                    type="text"
                    placeholder="Write a comment"
                    value={form.body}
                    name="body"
                    onChange={(e) => setForm({ ...form, body: e.target.value })}
                    data-testid="form-input"
                />
            </Form.Group>
            <div className="m-auto">
                <Button
                    variant="primary"
                    onClick={handleSubmit}
                    disabled={!form.body}
                    size="small"
                    data-testid="form-button">
                    Comment
                </Button>
            </div>
        </Form>
    );
}

export default CreateComment;
