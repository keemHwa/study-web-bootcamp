import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-redux-19987-default-rtdb.firebaseio.com/cart.json"
      );

      if (!response.ok) {
        throw new Error("데이터를 가져오지 못했습니다.");
      }
      const data = response.json();
      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [], //removeItemFromCart 후 item이 정의 되지 않는 경우 undefined return ->> 그럴경우 replaceCart에서 find가 동작 X
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          status: "error", // 보류
          title: "Error! ...",
          message: "fetching cart data failed!",
        })
      );
    }
  };
};

// custom action creator
export const sendCartData = (cart) => {
  return async (dispatch) => {
    // action obeject를 반환하지 않고, action object를 반환하는 다른 함수(여기서는 비동기함수)를 반환한다.
    /** Redux Thunk 란..  */
    //  Redux 애플리케이션에서 비동기 작업을 처리하고 액션을 디스패치할 수 있도록 도와주는 도구입니다.
    // Redux Thunk를 사용하면 Redux 스토어의 액션 생성자 함수가 반환하는 것이 일반적인 액션 객체뿐만 아니라 함수도 될 수 있습니다.
    // 이 함수는 dispatch와 getState 매개변수를 인자로 받아서 비동기 작업을 수행하고 필요한 액션을 디스패치할 수 있게 해줍니다.
    // thuck 함수를 호출 할 때 dispatch 함수는 Redux Thunk에서 자동으로 제공됩니다.
    dispatch(
      uiActions.showNotification({
        status: "pending", // 보류
        title: "Sending...",
        message: "Sending cart data!",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://react-redux-19987-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT", // PUT 요청은 주어진 데이터를 완전히 대체
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        } // HTTP 통신에서 요청과 응답의 payload는 일반적으로 문자열로 전송되며, 이 문자열은 주로 JSON 형식으로 인코딩됩니다
      );

      if (!response.ok) {
        throw new Error("Error! ");
      }
    };

    try {
      sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success", // 보류
          title: "success! ...",
          message: "Sent cart data successfully!",
        })
      );
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          status: "error", // 보류
          title: "Error! ...",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};
