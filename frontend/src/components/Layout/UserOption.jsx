import React, { Fragment, useState } from "react";
import "./Header.css";
import ProfileImg from "../../asset/Profile.png";
import { SpeedDial, SpeedDialAction, Backdrop } from "@mui/material";
import {
  Dashboard,
  Person,
  ExitToApp,
  ListAlt,
  ShoppingCart,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
const UserOption = ({ user }) => {
  const [open, setOpen] = useState(false);
  const history = useNavigate();
  const alert = useAlert();
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const options = [
    { icon: <ListAlt />, name: "Orders", func: orders },
    { icon: <Person />, name: "Profile", func: account },
    {
      icon: (
        <ShoppingCart
          style={{
            color: cartItems.length > 0 ? "var(--color-ff3e04)" : "unset",
          }}
        />
      ),
      name: `cart(${cartItems.length})`,
      func: cart,
    },
    { icon: <ExitToApp />, name: "logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <Dashboard />,
      name: "Dashboard",
      func: dashboard,
    });
  }
  function orders() {
    history("/order/me");
  }
  function account() {
    history("/Profile");
  }
  function logoutUser() {
    dispatch(logout());
    alert.success("LogOut Successfully");
    setTimeout(() => history("/account"), 2000);
  }
  function dashboard() {
    history("/admin/dashboard");
  }
  function cart() {
    history("/cart");
  }
  return (
    <Fragment>
      <Backdrop
        open={open}
        style={{ zIndex: "55555555555555555555555555555" }}
      />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        icon={
          <img
            className="speedIcon"
            src={user.avatar.url ? user.avatar.url : { ProfileImg }}
            alt={user.name}
          />
        }
        direction="down"
        className="speedDial"
      >
        {options.map((option, i) => (
          <SpeedDialAction
            key={option.name}
            icon={option.icon}
            tooltipTitle={option.name}
            onClick={option.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
            className="speedDial2"
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOption;
