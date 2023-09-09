import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { uiActions } from "./store/ui-slice";

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

  console.log(notification);

  useEffect(() => {
    const sendCartData = async () => {
      // 여기서는 sendCartData 만들기만하고 호출 X
      dispatch(
        uiActions.showNotification({
          status: "pending", // 보류
          title: "Sending...",
          message: "Sending cart data!",
        })
      );
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
      dispatch(
        uiActions.showNotification({
          status: "success", // 보류
          title: "success! ...",
          message: "Sent cart data successfully!",
        })
      );
    };

    if (isInitial) {
      isInitial = false;
      return; // 처음 sendCartData를 하지 않기위해서  + notification을 보지 않기 위해서?
    }

    sendCartData().catch((err) => {
      // 여기서 sendCartData 호출
      dispatch(
        uiActions.showNotification({
          status: "error", // 보류
          title: "Error! ...",
          message: "Sending cart data failed!",
        })
      );
    });
  }, [cart, dispatch]);

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
