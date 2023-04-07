import React, { Fragment, useEffect, useState } from "react";
import "./Cart.css";
import { CartItems } from "../";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart, removeItemFromCard } from "../../actions/cartActions";
import { RemoveShoppingCart } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
const Cart = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };
  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (quantity <= 1) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const removeItem = (id) => {
    dispatch(removeItemFromCard(id));
  };

  const checkOutHandler = () => {
    history("/account?redirect=shipping");
  };
  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div className="empty__cart">
          <RemoveShoppingCart />
          <Typography>No Product in Your Cart !</Typography>
          <Link to={"/products"}>View Products</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cart__page">
            <div className="cart__header">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>

            {cartItems &&
              cartItems?.map((item) => (
                <div key={item?.product} className="cartContainer">
                  <CartItems item={item} removeItem={removeItem} />
                  <div className="cart__Input">
                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.product,
                          item.quantity,
                          item.stock
                        )
                      }
                    >
                      +
                    </button>
                    <input type="number" readOnly value={item?.quantity} />
                    <button
                      onClick={() =>
                        decreaseQuantity(item.product, item.quantity)
                      }
                    >
                      -
                    </button>
                  </div>
                  <p className="Cart__subtotal">{`$${
                    item?.price * item?.quantity
                  }`}</p>
                </div>
              ))}
            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Gross Total</p>
                <p>{`${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkOutHandler}>Check Out</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
