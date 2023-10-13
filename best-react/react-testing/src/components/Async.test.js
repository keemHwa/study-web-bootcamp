import { render, screen } from "@testing-library/react";
import Async from "./Async";
describe("Async component", () => {
  test("renders posts if request succeds", async () => {
    render(<Async />);
    /* 비동기 코드를 테스트 할 때,
      fetch가 성공적으로 요청을 전송하는지를 테스트 하는게 아니다. (실제 서버에 영향X, 불필요한 요청 X)
      요청의 결과에 따라 컴포넌트가 올바르게 작동하는지 테스트 해야한다. 
      그러모르 브라우저 내장 fetch 함수 대신 mock 함수, 즉 진짜 요청을 전송하지 않는 더미 함수를 사용한다.*/
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => [
        {
          id: "p1",
          title: "Frist post",
        },
      ], // 컴포넌트에서 함수로 호출, fetch가 promise를 반환하기에, json도 async
    }); // fetch 함수가 호출 되었을 때 반환 되야하는 값을 설정

    //const listItemElemnets = screen.getAllByRole("listitem");
    // getAllByRole => immediately Act, so Not appropriate for Async code.
    const listItemElemnets = await screen.findAllByRole("listitem");
    //  Find method => return Promise, wait http request succeed, Timeouts can also be specified. (The third argument)
    expect(listItemElemnets).not.toHaveLength(0);
  });
});
