import {
  configureStore,
  combineReducers,
  applyMiddleware,
} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";

import thunk from "redux-thunk";
import {
  createProductReducer,
  productDetailsReducer,
  productReducer,
  productsReducer,
  deleteReviewReducer,
  getAllReviewsReducer,
} from "./reducer/productReducer";
import {
  forgotPasswordReducer,
  profileReducer,
  userReducer,
  usersDetailsReducer,
  allUsersReducer,
} from "./reducer/userReducer";
import { cartReducer } from "./reducer/CartReducer";
import {
  allOrdersReducer,
  myOrdersDetailsReducer,
  myOrdersReducer,
  newOrderReducer,
  newReviewReducer,
  orderReducer,
} from "./reducer/OrderReducer";

const persistConfiguration = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  myOrdersDetails: myOrdersDetailsReducer,
  newReview: newReviewReducer,
  newProduct: createProductReducer,
  product: productReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,
  allUsers: allUsersReducer,
  userDetails: usersDetailsReducer,
  deleteReview: deleteReviewReducer,
  allReviews: getAllReviewsReducer,
});

const middleware = [thunk];

let preloadedState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const persistedReducer = persistReducer(persistConfiguration, reducer);
const store = configureStore(
  { reducer: persistedReducer },
  preloadedState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
