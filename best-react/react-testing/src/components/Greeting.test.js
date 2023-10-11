import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
  test("renders 'good to see' you if the button was NOT clicked", () => {
    render(<Greeting />);
    const paragraphElement = screen.getByText("good to see you", {
      exact: false,
    });
    expect(paragraphElement).toBeInTheDocument();
  });
  test("renders 'Change!' if the button was clicked", () => {
    //Arrange
    render(<Greeting />);
    // Act
    const buttonElemnet = screen.getByRole("button");
    userEvent.click(buttonElemnet);

    // Assert
    const outputElement = screen.getByText("Change!");
    expect(outputElement).toBeInTheDocument();
  });
  test("dose not renders 'good to see!' if the button was clicked", () => {
    //Arrange
    render(<Greeting />);
    // Act
    const buttonElemnet = screen.getByRole("button");
    userEvent.click(buttonElemnet);

    // Assert
    const outputElement = screen.queryByText("good to see you", {
      exact: false,
    }); // getByTest : no element -> Error! ==> queryByText : no element => null
    expect(outputElement).toBeNull();
  });
});
