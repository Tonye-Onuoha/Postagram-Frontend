import { render, screen, fireEvent } from "../../../helpers/test-utils";
import CreatePost from "../CreatePost";
import { faker } from "@faker-js/faker";

test("renders CreatePost component", () => {
    render(<CreatePost />);
    const showModalForm = screen.getByTestId("show-modal-form");
    expect(showModalForm).toBeInTheDocument();
    // Clicking to show the modal
    fireEvent.click(showModalForm);
    const createFormElement = screen.getByTestId("create-post-form");
    expect(createFormElement).toBeInTheDocument();
    const postBodyField = screen.getByTestId("post-body-field");
    expect(postBodyField).toBeInTheDocument();
    const submitButton = screen.getByTestId("create-post-submit");
    expect(submitButton).toBeInTheDocument();
    expect(submitButton.disabled).toBeTruthy();
    const postBody = faker.lorem.sentence(10);
    fireEvent.change(postBodyField, { target: { value: postBody } });
    // Checking if field has the text and button is not disabled
    expect(postBodyField.value).toBe(postBody);
    expect(submitButton.disabled).toBeFalsy();
});
