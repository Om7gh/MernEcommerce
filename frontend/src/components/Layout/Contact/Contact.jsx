import React, { Fragment } from "react";
import "./contact.css";
import { Button } from "@material-ui/core";
import img from "../../../asset/contact.png";
import { ArrowCircleUp } from "@mui/icons-material";

const Contact = () => {
  return (
    <Fragment>
      {" "}
      <div className="contactContainer">
        <img src={img} alt="img" className="img-header" />

        <h2>Contact Support</h2>
        <a className="mailBtn" href="mailto:founder@gmail.com">
          <Button>Contact: founder@gmail.com</Button>
        </a>
        <ArrowCircleUp className="arrow-up" />
      </div>
    </Fragment>
  );
};

export default Contact;
