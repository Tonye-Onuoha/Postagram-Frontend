import { render, screen, fireEvent } from "../../../helpers/test-utils";
import { setLocalStorage } from "../../../helpers/fetchAPI";
import CreateComment from "../CreateComment";

test("renders CreateComment component", async () => {
    render(<CreateComment />);
    const commentForm = screen.getByTestId("create-comment-form");
    expect(commentForm).toBeInTheDocument();
    const formInputElement = screen.getByTestId("form-input");
    expect(formInputElement).toBeInTheDocument();
    const formButtonElement = screen.getByTestId("form-button");
    expect(formButtonElement).toBeInTheDocument();
    fireEvent.change(formInputElement, { target: { value: "A new comment" } });
    expect(formInputElement.value).toBe("A new comment");
    // await fireEvent.click(formButtonElement);
    // expect(formInputElement.value).toBe("");
});
