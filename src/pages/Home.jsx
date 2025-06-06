import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Row, Col, Image } from "react-bootstrap";
import { randomAvatar } from "../utils";
import { fetchData } from "../helpers/fetchAPI";
import { getUser } from "../hooks/user_actions";
import CreatePost from "../components/posts/CreatePost";
import Post from "../components/posts/Post";
import ProfileCard from "../components/profiles/ProfileCard";

function Home() {
    const user = getUser();
    const [posts, setPosts] = useState([]);
    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        let ignore = false;
        async function fetchPosts() {
            try {
                const data = await fetchData("/api/core/posts/");
                if (!ignore) {
                    setPosts([...data]);
                }
            } catch (error) {
                console.log(error);
            }
        }
        const intervalID = setInterval(fetchPosts, 10000);
        return () => {
            console.log("clearing interval...");
            ignore = true;
            clearInterval(intervalID);
        };
    }, []);

    useEffect(() => {
        let ignore = false;
        async function fetchUserProfiles() {
            try {
                const data = await fetchData("/api/core/users/?limit=5");
                if (!ignore) {
                    setProfiles([...data]);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchUserProfiles();
        return () => {
            let ignore = true;
        };
    }, []);

    if (!user) {
        return <div>Loading!</div>;
    }

    return (
        <Layout>
            <Row className="justify-content-evenly">
                <Col sm={7}>
                    <Row className="border rounded align-items-center">
                        <Col className="flex-shrink-1">
                            <Image
                                src={user.avatar}
                                alt={user.username}
                                roundedCircle
                                width={52}
                                height={52}
                                className="my-2"
                            />
                        </Col>
                        <Col sm={10} className="flex-grow-1">
                            <CreatePost />
                        </Col>
                    </Row>
                    <Row className="my-4">
                        {posts.map((post, index) => (
                            <Post key={index} post={post} />
                        ))}
                    </Row>
                </Col>
                <Col sm={3} className="border rounded py-4 h-50">
                    <h4 className="font-weight-bold text-center">Suggested people</h4>
                    <div className="d-flex flex-column">
                        {profiles.length > 0 &&
                            profiles.map((profile, index) => <ProfileCard key={index} user={profile} />)}
                    </div>
                </Col>
            </Row>
        </Layout>
    );
}

export default Home;
