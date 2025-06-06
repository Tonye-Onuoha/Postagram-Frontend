import { render, screen } from "../../../helpers/test-utils";
import Post from "../Post";
import { setLocalStorage } from "../../../helpers/fetchAPI";
import userFixtures from "../../../helpers/fixtures/user";
import postFixtures from "../../../helpers/fixtures/post";

const userData = userFixtures();
const postData = postFixtures(true, false, userData);

beforeEach(() => {
    // to fully reset the state between __tests__, clear the
    // storage
    localStorage.clear();
    // and reset all mocks
    jest.clearAllMocks();
    setLocalStorage(null, null, userData);
});

test("render Post component", () => {
    render(<Post post={postData} />);
    const postElement = screen.getByTestId("post-test");
    expect(postElement).toBeInTheDocument();
});
