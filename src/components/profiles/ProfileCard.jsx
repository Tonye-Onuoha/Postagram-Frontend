import React from "react";
import { Card, Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { randomAvatar } from "../../utils";
import { getUser } from "../../hooks/user_actions";

function ProfileCard(props) {
    const navigate = useNavigate();
    const { user } = props;
    const currentUser = getUser();

    const handleNavigateToProfile = () => {
        navigate(`/profile/${user.id}/`);
    };

    return (
        <Card className="border-0 p-2">
            <div className="d-flex ">
                <Image
                    src={user.username === currentUser.username ? user.avatar : randomAvatar()}
                    roundedCircle
                    width={48}
                    height={48}
                    className="my-3 border border-primary border-2"
                />
                <Card.Body>
                    <Card.Title className="fs-6">{user.name}</Card.Title>
                    <Button variant="primary" onClick={handleNavigateToProfile}>
                        See profile
                    </Button>
                </Card.Body>
            </div>
        </Card>
    );
}

export default ProfileCard;
