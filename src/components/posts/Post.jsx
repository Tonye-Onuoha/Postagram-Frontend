import React, { useState, useContext } from "react";
import { format } from "timeago.js";
import { LikeFilled, CommentOutlined, LikeOutlined, MoreOutlined } from "@ant-design/icons";
import { Button, Modal, Form, Image, Card, Dropdown } from "react-bootstrap";
import { fetchData, deleteData } from "../../helpers/fetchAPI";
import Toaster from "../Toaster";
import { Link } from "react-router-dom";
import { getUser, refreshPage } from "../../hooks/user_actions";
import UpdatePost from "./UpdatePost";
import MoreToggleIcon from "../MoreToggleIcon";
import { Context } from "../Layout";

function Post(props) {
    const { setToaster } = useContext(Context);
    const { post, isSinglePost } = props;
    const user = getUser();

    const handleLikeClick = async (action) => {
        try {
            await fetchData(`/api/core/posts/${post.id}/${action}/`);
            setToaster({
                type: "success",
                message: post.liked ? "You unliked a post 🚀" : "You liked a post 🚀",
                show: true,
                title: post.liked ? "Post Unliked" : "Post Liked"
            });
            refreshPage();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteData(`/api/core/posts/${post.id}/`);
            setToaster({
                type: "danger",
                message: "Post deleted 🚀",
                show: true,
                title: "Post Delete"
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Card className="rounded-3 my-4" data-testid="post-test">
                <Card.Body>
                    <Card.Title className="d-flex flex-row justify-content-between">
                        <div className="d-flex flex-row">
                            <Image
                                src={post.author.avatar}
                                roundedCircle
                                width={48}
                                height={48}
                                className="me-2 border border-primary border-2"
                            />
                            <div className="d-flex flex-column justify-content-start align-self-center mt-2">
                                <p className="fs-6 m-0">{post.author.name}</p>
                                <p className="fs-6 fw-lighter">
                                    <small>{format(post.created)}</small>
                                </p>
                            </div>
                        </div>
                        {user.name === post.author.name && (
                            <div>
                                <Dropdown>
                                    <Dropdown.Toggle as={MoreToggleIcon}></Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <UpdatePost post={post} />
                                        <Dropdown.Item onClick={handleDelete} className="text-danger">
                                            Delete
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        )}
                    </Card.Title>
                    <Card.Text>{post.body}</Card.Text>
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
                                <small>{post.likes_count} like</small>
                            </p>
                        </div>
                        {!isSinglePost && (
                            <p className="ms-1 fs-6">
                                <small>
                                    <Link to={`/post/${post.id}/`}>{post.comments_count} comments</Link>
                                </small>
                            </p>
                        )}
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
                                color: post.liked ? "#0D6EFD" : "#C4C4C4"
                            }}
                            onClick={() => {
                                if (post.liked) {
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
                    {!isSinglePost && (
                        <div className="d-flex flex-row">
                            <CommentOutlined
                                style={{
                                    width: "24px",
                                    height: "24px",
                                    padding: "2px",
                                    fontSize: "20px",
                                    color: "#C4C4C4"
                                }}
                            />
                            <p className="ms-1 mb-0">
                                <small>Comment</small>
                            </p>
                        </div>
                    )}
                </Card.Footer>
            </Card>
        </>
    );
}

export default Post;
