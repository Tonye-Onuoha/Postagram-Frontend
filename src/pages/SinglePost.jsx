import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Post from "../components/posts/Post";
import CreateComment from "../components/comments/CreateComment";
import Comment from "../components/comments/Comments";
import { fetchData } from "../helpers/fetchAPI";

function SinglePost() {
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const { postId } = useParams();

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const post = await fetchData(`/api/core/posts/${postId}/`);
                const comments = await fetchData(`/api/core/posts/${postId}/comment/`);
                setPost({ ...post });
                setComments([...comments]);
            } catch (error) {
                console.log(error);
            }
        };
        fetchPostData();
    }, [postId]);

    return (
        <Layout hasNavigationBack>
            {post ? (
                <Row className="justify-content-center">
                    <Col sm={8}>
                        <Post post={post} isSinglePost />
                        <CreateComment postId={postId} />
                        {comments.map((comment, index) => (
                            <Comment key={index} postId={postId} comment={comment} />
                        ))}
                    </Col>
                </Row>
            ) : (
                <div>Loading...</div>
            )}
        </Layout>
    );
}
export default SinglePost;
