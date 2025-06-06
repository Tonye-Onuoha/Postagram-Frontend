import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import ProfileDetails from "../components/profiles/ProfileDetails";
import { fetchData } from "../helpers/fetchAPI";
import Post from "../components/posts/Post";
import { Row, Col } from "react-bootstrap";

function Profile() {
    const [profile, setProfile] = useState(null);
    const [profilePosts, setProfilePosts] = useState([]);
    const { profileId } = useParams();

    useEffect(() => {
        let ignore = false;
        async function fetchUserProfile() {
            try {
                const data = await fetchData(`/api/core/users/${profileId}/`);
                if (!ignore) {
                    setProfile({ ...data });
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchUserProfile();
        return () => {
            ignore = true;
        };
    }, [profileId]);

    useEffect(() => {
        console.log("fetching profile posts...");
        let ignore = false;
        async function fetchPosts() {
            try {
                const data = await fetchData(`/api/core/posts/?author_public_id=${profileId}`);
                if (!ignore) {
                    setProfilePosts([...data]);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchPosts();
        return () => {
            ignore = true;
        };
    }, [profileId]);

    return (
        <Layout hasNavigationBack>
            <Row className="justify-content-evenly">
                <Col sm={9}>
                    <ProfileDetails user={profile} />
                    <div>
                        <Row className="my-4">
                            {profilePosts?.map((post, index) => (
                                <Post key={index} post={post} />
                            ))}
                        </Row>
                    </div>
                </Col>
            </Row>
        </Layout>
    );
}

export default Profile;
