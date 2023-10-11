import { render, screen } from "@testing-library/react";
import Async from "./Async";
describe("Async component", () => {
  test("renders posts if request succeds", async () => {
    render(<Async />);
    //const listItemElemnets = screen.getAllByRole("listitem");
    // getAllByRole => immediately Act, so Not appropriate for Async code.
    const listItemElemnets = await screen.findAllByRole("listitem");
    //  Find method => return Promise, wait http request succeed, Timeouts can also be specified. (The third argument)
    expect(listItemElemnets).not.toHaveLength(0);
  });
});
