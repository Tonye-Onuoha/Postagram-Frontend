import React from "react";
import { useContext } from "react";
import { Context } from "./Layout";
import { Navbar, Container, Image, NavDropdown, Nav } from "react-bootstrap";
import { useUserActions, getUser, getRefreshToken } from "../hooks/user_actions";
import { Link } from "react-router-dom";

function NavigationBar() {
    const { setToaster } = useContext(Context);
    const userActions = useUserActions();
    const user = getUser();

    const handleLogout = () => {
        const refresh = getRefreshToken();
        (async () => {
            try {
                await userActions.logout({ refresh: refresh });
            } catch (err) {
                setToaster({
                    message: "Logout failed",
                    title: err?.message || "An error occurred.",
                    type: "danger",
                    show: true
                });
            }
        })();
    };

    return (
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand className="fw-bold" href="#home">
                    Postagram
                </Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <NavDropdown title={<Image src={user.avatar} roundedCircle width={36} height={36} />}>
                            <NavDropdown.Item as={Link} to={`/profile/${user.id}/`}>
                                Profile
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
export default NavigationBar;
