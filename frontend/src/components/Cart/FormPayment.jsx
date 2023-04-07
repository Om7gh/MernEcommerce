import React, { Fragment, useRef } from "react";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import { CreditCard, Event, VpnKey } from "@mui/icons-material";
import { Typography } from "@mui/material";
const FormPayment = () => {
  const payBtn = useRef(null);
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    
  return (
    <Fragment>
      <form className="paymentForm" onSubmit={(e) => e.preventDefault()}>
        <Typography className="payment_heading">Card Info</Typography>
        <div>
          <CreditCard />
          <CardNumberElement className="card" />
        </div>
        <div>
          <Event />
          <CardExpiryElement className="card" />
        </div>
        <div>
          <VpnKey />
          <CardCvcElement className="card" />
        </div>
        <input
          type="submit"
          value={`process - $${orderInfo && orderInfo.totalPrice}`}
          ref={payBtn}
          className="paymentFormBtn"
        />
      </form>
    </Fragment>
  );
};

export default FormPayment;
