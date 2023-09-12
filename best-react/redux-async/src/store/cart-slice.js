import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    // 리듀서 내부에 비동기 코드나, 부수효과를 내는 코드를 보낼 수 없다.
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      // 이런 reducer들을 redux toolkit 이 자동으로 생성한 action creator 생성자를 받는다.
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
      }
    },
  },
});

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
          method: "PUT",
          body: JSON.stringify(cart),
        }
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

export const cartActions = cartSlice.actions;

export default cartSlice;
