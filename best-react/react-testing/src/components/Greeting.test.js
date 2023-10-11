import { render, screen } from "@testing-library/react";
import Greeting from "./Greeting";

describe("Greeting componet", () => {
  // Test Suite (Test Grouping)
  test("renders Hello World as a text", () => {
    // Arrange
    render(<Greeting />);

    // Act

    // Assert
    const helloWorldElement = screen.getByText("Hello World", { exact: false }); //getByText("",{exact:false})
    expect(helloWorldElement).toBeInTheDocument();
  });
});
