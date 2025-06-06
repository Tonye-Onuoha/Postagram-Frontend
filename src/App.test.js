import { screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { render } from "./helpers/test-utils";

test("renders Welcome to Postagram text", () => {
  render(<App />);
  const textElement = screen.getByText(/Welcome to Postagram!/i);
  expect(textElement).toBeInTheDocument();
});
