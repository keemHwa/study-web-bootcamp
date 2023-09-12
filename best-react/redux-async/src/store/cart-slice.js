import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    changed: false, // changed : 장바구니가 교체된 경우에는 변경 X, 항목이 삭제되거나 추가된 경우 변경 O 되도록
  },
  reducers: {
    // 리듀서 내부에 비동기 코드나, 부수효과를 내는 코드를 보낼 수 없다.
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id); // 조건에 일치하는 첫번째 요소 반환
      state.totalQuantity++;
      state.changed = true;
      if (!existingItem) {
        state.items.push({
          // 푸시는 기존 상태의 기존 배열을 조작하기 리덕스만 사용할경우 사용해서는 안된다.
          // 다만 리덕스 툴킷을 사용할 경우 내부적으로 보장 해주기때문에 괜찮다.
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
      state.changed = true;
      if (existingItem.quantity === 1) {
        // 삭제하려는 item의 남은 수량이 1개였을 때 > 목록에서 삭제
        state.items = state.items.filter((item) => item.id !== id);
        console.dir("???");
        console.dir(state.items); // 아니 빈배열을 던져주는데 왜 빈배열로 안들어가고 item 항목자체가 사라지는거지
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
