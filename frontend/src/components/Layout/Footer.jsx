import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  return (
    <Fragment>
      <footer
        id="footer"
        className="footer"
        style={{
          marginTop: location.pathname === "/products" ? "20vmax" : "0vmax",
        }}
      >
        <div className="footer__column">
          <h4>Menu</h4>
          <div className="footer__menu">
            <Link to={"/"} className="footer__menu-link">
              home
            </Link>
            <Link to={"/"} className="footer__menu-link">
              product
            </Link>
            <Link to={"/"} className="footer__menu-link">
              about
            </Link>
            <Link to={"/"} className="footer__menu-link">
              contact
            </Link>
          </div>
        </div>
        <div className="footer__column">
          <h2>ElectroSmart.</h2>
          <p>Hight Quality is our Priority</p>
          <p>
            Copyright &copy; {new Date().getFullYear()}, ElectroSmart corner
          </p>
        </div>
        <div className="footer__column">
          <h4>Social Media</h4>
          <div className="footer__social-media">
            <a href="xkqsn,sjk">Facebook</a>
            <a href="csv,dnjs">Instagram</a>
            <a href="cqsvn,sd ">Whatsapp</a>
          </div>
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;
