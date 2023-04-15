import React, { Fragment, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BiUserCircle, BiSearchAlt } from "react-icons/bi";
import { BsCartFill } from "react-icons/bs";
import { CgMenuRound } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
import ProfileImg from "../../asset/Profile.png";
import {
  Dashboard,
  ExitToApp,
  ListAlt,
  Person,
  ShoppingCart,
} from "@mui/icons-material";
import { Backdrop, SpeedDial, SpeedDialAction } from "@mui/material";
import { useAlert } from "react-alert";
const Header = () => {
  const [toggle, setToggle] = useState(false);
  const [pageOffset, setPageOffset] = useState(0);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    setPageOffset(window.pageYOffset);
  };
  const navigation = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Products",
      href: "/products",
    },
    {
      name: "About",
      href: "/about",
    },
    {
      name: "Contact",
      href: "/contact",
    },
  ];
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

  if (user?.role === "admin") {
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
      {/* Navbar Start  */}
      <nav
        className="nav"
        style={{ backdropFilter: pageOffset > 80 ? "blur(8px)" : null }}
      >
        {/* logo  */}
        <div className="nav__logo">
          <h1>ElectroSmart.</h1>
        </div>
        <ul className={toggle ? "show" : "hide"}>
          {/* Navbar lists  */}
          {navigation?.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className=" nav__lists-list"
              onClick={() => setToggle(false)}
            >
              {item.name}
            </NavLink>
          ))}
        </ul>

        {/* Navbar Icons  */}
        <div className="nav__icons">
          <Link className="nav__icons-icon" to={"/search"}>
            <BiSearchAlt />
          </Link>
          <Link className="nav__icons-icon" to={"/cart"}>
            <BsCartFill />
          </Link>
          {!isAuthenticated ? (
            <Link className="nav__icons-icon" to={"/account"}>
              <BiUserCircle />
            </Link>
          ) : (
            <Fragment>
              <Backdrop open={open} style={{ zIndex: "100" }} />
              <SpeedDial
                style={{
                  zIndex: "5555555555555555555555555555",
                  cursor: "pointer",
                }}
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
          )}

          <CgMenuRound
            className="nav__menu"
            onClick={() => setToggle(toggle ? false : true)}
          />
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
