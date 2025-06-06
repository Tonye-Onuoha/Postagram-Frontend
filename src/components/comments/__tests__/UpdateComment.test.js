import { render, screen, fireEvent } from "../../../helpers/test-utils";
import { setLocalStorage } from "../../../helpers/fetchAPI";
import UpdateComment from "../UpdateComment";
import userFixtures from "../../../helpers/fixtures/user";
import postFixtures from "../../../helpers/fixtures/post";
import commentFixtures from "../../../helpers/fixtures/comments";

const postAuthorData = userFixtures();
const commentAuthorData = userFixtures();
const postData = postFixtures(true, false, postAuthorData);
const commentData = commentFixtures(false, false, postData, commentAuthorData);

beforeEach(() => {
    // to fully reset the state between __tests__, clear the
    // storage
    localStorage.clear();
    // and reset all mocks
    jest.clearAllMocks();
    setLocalStorage(null, null, commentAuthorData);
});

test("render UpdateComment component", async () => {
    render(<UpdateComment postId={postData.id} comment={commentData} />);
    const modifyLink = screen.getByTestId("modify-link");
    expect(modifyLink).toBeInTheDocument();
    fireEvent.click(modifyLink);
    const updateCommentForm = screen.getByTestId("update-comment-form");
    expect(updateCommentForm).toBeInTheDocument();
    const formInput = screen.getByTestId("form-input");
    expect(formInput).toBeInTheDocument();
    expect(formInput.value).toBe(commentData.body);
    fireEvent.change(formInput, { target: { value: "Updated a comment." } });
    expect(formInput.value).toBe("Updated a comment.");
    const formButton = screen.getByTestId("form-button");
    expect(formButton).toBeInTheDocument();
    // await fireEvent.click(formButton);
    // expect(formInput.value).toBe("");
});
