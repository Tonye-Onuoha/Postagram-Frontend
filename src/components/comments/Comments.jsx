import React, { useContext } from "react";
import { format } from "timeago.js";
import { LikeOutlined, LikeFilled } from "@ant-design/icons";
import { Image, Card, Dropdown } from "react-bootstrap";
import { randomAvatar } from "../../utils";
import { fetchData, deleteData } from "../../helpers/fetchAPI";
import { getUser, refreshPage } from "../../hooks/user_actions";
import UpdateComment from "./UpdateComment";
import { Context } from "../Layout";
import MoreToggleIcon from "../MoreToggleIcon";

function Comment(props) {
    const { postId, comment } = props;
    console.log(comment);
    const { setToaster } = useContext(Context);

    const user = getUser();

    const handleLikeClick = async (action) => {
        try {
            await fetchData(`/api/core/posts/${postId}/comment/${comment.id}/${action}/`);
            setToaster({
                type: "success",
                message: comment.liked ? "You unliked a comment 🚀" : "You liked a comment 🚀",
                show: true,
                title: comment.liked ? "Comment Unliked" : "Comment Liked"
            });
            refreshPage();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteData(`/api/core/posts/${postId}/comment/${comment.id}/`);
            setToaster({
                type: "danger",
                message: "Comment deleted 🚀",
                show: true,
                title: "Comment Deleted"
            });
            refreshPage();
        } catch (error) {
            setToaster({
                type: "warning",
                message: "Comment deleted 🚀",
                show: true,
                title: "Comment Deleted"
            });
        }
    };

    return (
        <Card className="rounded-3 my-2" data-testid="comment-test">
            <Card.Body>
                <Card.Title className="d-flex flex-row justify-content-between">
                    <div className="d-flex flex-row">
                        <Image
                            src={comment.author.avatar}
                            roundedCircle
                            width={48}
                            height={48}
                            className="me-2 border border-primary border-2"
                        />
                        <div className="d-flex flex-column justify-content-start align-self-center mt-2">
                            <p className="fs-6 m-0">{comment.author.name}</p>
                            <p className="fs-6 fw-lighter">
                                <small>{format(comment.created)}</small>
                            </p>
                        </div>
                    </div>
                    {user.username === comment.author.username && (
                        <div>
                            <Dropdown>
                                <Dropdown.Toggle as={MoreToggleIcon}></Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <UpdateComment comment={comment} postId={postId} />
                                    <Dropdown.Item onClick={handleDelete} className="text-danger">
                                        Delete
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    )}
                </Card.Title>
                <Card.Text>{comment.body}</Card.Text>
                <div className="d-flex flex-row justify-content-between">
                    <div className="d-flex flex-row">
                        <LikeFilled
                            style={{
                                color: "#fff",
                                backgroundColor: "#0D6EFD",
                                borderRadius: "50%",
                                width: "18px",
                                height: "18px",
                                fontSize: "75%",
                                padding: "2px",
                                margin: "3px"
                            }}
                        />
                        <p className="ms-1 fs-6">
                            <small>{comment.likes_count} like</small>
                        </p>
                    </div>
                </div>
            </Card.Body>
            <Card.Footer className="d-flex bg-white w-50 justify-content-between border-0">
                <div className="d-flex flex-row">
                    <LikeOutlined
                        style={{
                            width: "24px",
                            height: "24px",
                            padding: "2px",
                            fontSize: "20px",
                            color: comment.liked ? "#0D6EFD" : "#C4C4C4"
                        }}
                        onClick={() => {
                            if (comment.liked) {
                                handleLikeClick("remove_like");
                            } else {
                                handleLikeClick("like");
                            }
                        }}
                    />
                    <p className="ms-1">
                        <small>Like</small>
                    </p>
                </div>
            </Card.Footer>
        </Card>
    );
}

export default Comment;
