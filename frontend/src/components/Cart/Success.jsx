import React, { Fragment } from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { CheckCircle } from "@mui/icons-material";
import "./Success.css";
const Success = () => {
  return (
    <Fragment>
      <div className="successPage">
        <CheckCircle />
        <Typography>Your Order has been Placed successfully</Typography>
        <Link to="/order/me">View Orders</Link>
      </div>
    </Fragment>
  );
};

export default Success;
