import { render, screen, fireEvent } from "../../../helpers/test-utils";
import UpdatePost from "../UpdatePost";
import userFixtures from "../../../helpers/fixtures/user";
import postFixtures from "../../../helpers/fixtures/post";
import { faker } from "@faker-js/faker";

const userData = userFixtures();
const postData = postFixtures(true, false, userData);

test("Render UpdatePost component", async () => {
    render(<UpdatePost post={postData} />);
    const showModalForm = screen.getByTestId("show-modal-form");
    expect(showModalForm).toBeInTheDocument();
    fireEvent.click(showModalForm);
    const updateFormElement = screen.getByTestId("update-post-form");
    expect(updateFormElement).toBeInTheDocument();
    const postBodyField = screen.getByTestId("post-body-field");
    expect(postBodyField).toBeInTheDocument();
    const submitButton = screen.getByTestId("update-post-submit");
    expect(submitButton).toBeInTheDocument();
    const postBody = faker.lorem.sentence(10);
    fireEvent.change(postBodyField, { target: { value: postBody } });
    // Checking if field has the text and button is not disabled
    expect(postBodyField.value).toBe(postBody);
    expect(submitButton.disabled).toBeFalsy();
});
