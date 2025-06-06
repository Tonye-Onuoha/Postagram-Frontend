import { render, screen } from "../../../helpers/test-utils";
import { setLocalStorage } from "../../../helpers/fetchAPI";
import Comments from "../Comments";
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

test("renders Comments component", () => {
    render(<Comments postId={postData.id} comment={commentData} />);
    const commentElement = screen.getByTestId("comment-test");
    expect(commentElement).toBeInTheDocument();
});
