import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import UpdateProfileForm from "../components/forms/UpdateProfileForm";
import { fetchData } from "../helpers/fetchAPI";
import { Row, Col } from "react-bootstrap";

function EditProfile() {
    const [profile, setProfile] = useState(null);
    const { profileId } = useParams();

    useEffect(() => {
        console.log("fetching profile...");
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
            let ignore = true;
        };
    }, [profileId]);

    return (
        <Layout hasNavigationBack>
            {profile ? (
                <Row className="justify-content-evenly">
                    <Col sm={9}>
                        <UpdateProfileForm profile={profile} />
                    </Col>
                </Row>
            ) : (
                <div>Loading...</div>
            )}
        </Layout>
    );
}
export default EditProfile;
