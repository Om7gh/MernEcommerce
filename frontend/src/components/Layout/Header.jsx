import React, { Fragment, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { BiUserCircle, BiSearchAlt } from "react-icons/bi";
import { BsCartFill } from "react-icons/bs";
import { CgMenuRound } from "react-icons/cg";
import { useSelector } from "react-redux";
import { UserOption } from "../";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const [pageOffset, setPageOffset] = useState(0);
  const { isAuthenticated } = useSelector((state) => state.user);

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
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
          {!isAuthenticated && (
            <Link className="nav__icons-icon" to={"/account"}>
              <BiUserCircle />
            </Link>
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
