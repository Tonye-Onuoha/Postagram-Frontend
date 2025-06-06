import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useUserActions } from "../../hooks/user_actions";

function LoginForm() {
    const [validated, setValidated] = useState(false);
    const [form, setForm] = useState({});
    const [error, setError] = useState(null);
    const userActions = useUserActions();

    const handleSubmit = (event) => {
        event.preventDefault();
        const loginForm = event.currentTarget;
        if (loginForm.checkValidity() === false) {
            event.stopPropagation();
        }
        setValidated(true);
        const data = {
            email: form.email,
            password: form.password
        };

        (async () => {
            try {
                await userActions.login(data);
            } catch (err) {
                if (err.message) {
                    setError(err.message);
                }
            }
        })();
    };
    return (
        <Form
            id="login-form"
            className="border p-4 rounded"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            data-testid="login-form">
            <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    type="email"
                    placeholder="Enter email"
                    data-testid="email-field"
                />
                <Form.Control.Feedback type="invalid">Please provide a valid email.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    value={form.password}
                    minLength="8"
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                    type="password"
                    placeholder="Password"
                    data-testid="password-field"
                />
                <Form.Control.Feedback type="invalid">Please provide a valid password.</Form.Control.Feedback>
            </Form.Group>

            <div className="text-content text-danger">{error && <p>{error}</p>}</div>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}

export default LoginForm;
