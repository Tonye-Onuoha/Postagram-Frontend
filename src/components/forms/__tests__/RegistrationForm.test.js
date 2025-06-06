import { render, screen, fireEvent } from "../../../helpers/test-utils";
import RegistrationForm from "../RegistrationForm";
import { faker } from "@faker-js/faker";
import userFixtures from "../../../helpers/fixtures/user";

const userData = userFixtures();

test("renders registration form", () => {
    render(<RegistrationForm />);
    const registerForm = screen.getByTestId("registration-form");
    expect(registerForm).toBeInTheDocument();
    const firstNameField = screen.getByTestId("firstname-field");
    expect(firstNameField).toBeInTheDocument();
    const lastNameField = screen.getByTestId("lastname-field");
    expect(lastNameField).toBeInTheDocument();
    const userNameField = screen.getByTestId("username-field");
    expect(userNameField).toBeInTheDocument();
    const bioField = screen.getByTestId("bio-field");
    expect(bioField).toBeInTheDocument();
    const emailField = screen.getByTestId("email-field");
    expect(emailField).toBeInTheDocument();
    const passwordField = screen.getByTestId("password-field");
    expect(passwordField).toBeInTheDocument();
    const password = faker.lorem.slug(2);
    fireEvent.change(firstNameField, { target: { value: userData.first_name } });
    fireEvent.change(lastNameField, { target: { value: userData.last_name } });
    fireEvent.change(userNameField, { target: { value: userData.username } });
    fireEvent.change(bioField, { target: { value: userData.bio } });
    fireEvent.change(emailField, { target: { value: userData.email } });
    fireEvent.change(passwordField, { target: { value: password } });
    expect(firstNameField.value).toBe(userData.first_name);
    expect(lastNameField.value).toBe(userData.last_name);
    expect(userNameField.value).toBe(userData.username);
    expect(bioField.value).toBe(userData.bio);
    expect(emailField.value).toBe(userData.email);
    expect(passwordField.value).toBe(password);
});
