import React, { Fragment } from "react";
import { saveShippingInfo } from "../../actions/cartActions";
import MetaData from "../MetaData";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import "./ConfirmOrder.css";
import { useDispatch, useSelector } from "react-redux";
import CheckOutSteps from "./CheckOutSteps";

const ConfirmOrder = () => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const history = useNavigate();
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + shippingCharges + tax;

  const address = `${shippingInfo.address}, ${shippingInfo.city},${shippingInfo.state},${shippingInfo.pinCode},${shippingInfo.country}`;

  const proceedPayment = () => {
    const data = {
      subtotal,
      tax,
      shippingCharges,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    history("/process/payment");
  };
  return (
    <Fragment>
      <MetaData title="confirm Order" />
      <CheckOutSteps activeStep={1} />

      <div className="confirmOrder">
        <div>
          <div className="confirmShippingArea">
            <Typography variant="h6">Shipping Info</Typography>
            <div className="confirmShippingBox">
              <div>
                <p>Name :</p>
                <span>{user?.name}</span>
              </div>
              <div>
                <p>Phone :</p>
                <span>{shippingInfo?.phoneNo}</span>
              </div>
              <div>
                <p>Address :</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItem">
            <Typography variant="h6">Your Cart Items</Typography>
            <div className="confirmCartContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item?.product}>
                    <img src={item?.image} alt="product" />
                    <Link to={`product/${item?.product}`}>{item?.name}</Link>
                    <span>
                      {item.quantity} * ${item.price} ={" "}
                      <b>${item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div>
          <div className="orderSummary">
            <Typography>Order Summary</Typography>
            <div>
              <div>
                <p>Subtotal: </p>
                <span>${subtotal}</span>
              </div>
              <div>
                <p>shipping Charges : </p>
                <span>${shippingCharges}</span>
              </div>
              <div>
                <p>GST : </p>
                <span>${tax}</span>
              </div>
            </div>
            <div className="orderSummaryTotal">
              <p>
                <b>Total :</b>
              </p>
              <span>${totalPrice}</span>
            </div>
            <button onClick={proceedPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
