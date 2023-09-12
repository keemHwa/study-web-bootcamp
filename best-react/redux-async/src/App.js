import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// import { uiActions } from "./store/ui-slice";
import { sendCartData, fetchCartData } from "./store/cart-action";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    dispatch(fetchCartData());
  }, []);

  // 논리를 action creator function 에 옮긴 redux 비동기 코드
  // 이쪽이 컴포넌트가 lean(컴포넌트가 최소한의 로직과 상태만을 포함하고, 가능한 간결하며 목적에 집중한 상태)라고 할 수 있다.
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return; // 처음 sendCartData를 하지 않기위해서  + notification을 보지 않기 위해서?
    }
    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  // 컴포넌트에 직접 해당 논리를 부여한  redux 비동기 코드
  // useEffect(() => {
  //   const sendCartData = async () => {
  //     // 여기서는 sendCartData 만들기만하고 호출 X
  //     dispatch(
  //       uiActions.showNotification({
  //         status: "pending", // 보류
  //         title: "Sending...",
  //         message: "Sending cart data!",
  //       })
  //     );
  //     const response = await fetch(
  //       "https://react-redux-19987-default-rtdb.firebaseio.com/cart.json",
  //       {
  //         method: "PUT",
  //         body: JSON.stringify(cart),
  //       }
  //     );
  //     if (!response.ok) {
  //       throw new Error("Error! ");
  //     }
  //     dispatch(
  //       uiActions.showNotification({
  //         status: "success", // 보류
  //         title: "success! ...",
  //         message: "Sent cart data successfully!",
  //       })
  //     );
  //   };

  //   if (isInitial) {
  //     isInitial = false;
  //     return; // 처음 sendCartData를 하지 않기위해서  + notification을 보지 않기 위해서?
  //   }

  //   sendCartData().catch((err) => {
  //     // 여기서 sendCartData 호출
  //     dispatch(
  //       uiActions.showNotification({
  //         status: "error", // 보류
  //         title: "Error! ...",
  //         message: "Sending cart data failed!",
  //       })
  //     );
  //   });
  // }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
