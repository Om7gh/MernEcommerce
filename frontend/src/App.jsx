import React, { useMemo, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Footer,
  Header,
  Home,
  LoginSignUp,
  ProductDetails,
  Products,
  Search,
  UserOption,
  Profile,
  UpdateProfile,
  UpdatePassword,
  Error,
  ForgotPassword,
  ResetPassword,
  Cart,
  Shipping,
  ConfirmOrder,
  Payment,
  Success,
  MyOrder,
  MyOrderDetails,
  Dashboard,
  ProductList,
  NewProduct,
  UpdateProduct,
  OrderList,
  OrderDetails,
  Users,
  UsersDetails,
  AllReviews,
  About,
  Contact,
} from "./components";
import store from "./Store";
import { loadUser } from "./actions/userActions";
import { useSelector } from "react-redux";
import { useAlert } from "react-alert";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from "./components/Route/ProtectRoute";

const App = () => {
  const alert = useAlert();
  const { isAuthenticated } = useSelector((state) => state.user);
  const [stripeApiKey, setStripApiKey] = useState("");
  const getApiKey = async () => {
    const { data } = await axios.get("/api/v1/stripe-Api-key");
    setStripApiKey(data.stripeApiKey);
  };

  useMemo(() => {
    if (isAuthenticated) {
      alert.success("you are logged in");
    }
    store.dispatch(loadUser());
    getApiKey();
  }, [stripeApiKey]);

  return (
    <Router>
      <Elements stripe={loadStripe(stripeApiKey)}>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route exact path="/products/" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/account" element={<LoginSignUp />} />
          <Route exact path="/Profile" element={<Profile />} />
          <Route exact path="/password/forgot" element={<ForgotPassword />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route
            exact
            path="/password/reset/:token"
            element={<ResetPassword />}
          />

          <Route
            exact
            path="/me/update"
            element={
              <ProtectedRoute>
                <UpdateProfile />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/password/update"
            element={
              <ProtectedRoute>
                <UpdatePassword />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account/shipping"
            element={
              <ProtectedRoute>
                <Shipping />
              </ProtectedRoute>
            }
          />

          <Route
            path="/order/confirm"
            element={
              <ProtectedRoute>
                <ConfirmOrder />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/process/payment"
            element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/success"
            element={
              <ProtectedRoute>
                <Success />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/order/me"
            element={
              <ProtectedRoute>
                <MyOrder />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/order/:id"
            element={
              <ProtectedRoute>
                <MyOrderDetails />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/admin/dashboard"
            element={
              <ProtectedRoute isAdmin={true}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/admin/products"
            element={
              <ProtectedRoute isAdmin={true}>
                <ProductList />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/admin/product/new"
            element={
              <ProtectedRoute isAdmin={true}>
                <NewProduct />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/admin/product/new"
            element={
              <ProtectedRoute isAdmin={true}>
                <NewProduct />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/admin/products/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                <UpdateProduct />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/admin/orders"
            element={
              <ProtectedRoute isAdmin={true}>
                <OrderList />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/admin/order/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                <OrderDetails />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/admin/users/"
            element={
              <ProtectedRoute isAdmin={true}>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/admin/users/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                <UsersDetails />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/admin/reviews"
            element={
              <ProtectedRoute isAdmin={true}>
                <AllReviews />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Error />} />
        </Routes>

        <Footer />
      </Elements>
    </Router>
  );
};

export default App;
