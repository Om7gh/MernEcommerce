import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./CartItems.css";
const CartItems = ({ item, removeItem }) => {
  return (
    <Fragment>
      <div className="cartItemCard">
        <div className="cartItemImg">
          <img src={item?.image} alt={item?.name} />
        </div>
        <div>
          <Link to={`/product/${item?.product}`}>{item?.name}</Link>
          <span>{`Price: $${item?.price}`}</span>
          <p onClick={() => removeItem(item.product)}>Remove</p>
        </div>
      </div>
    </Fragment>
  );
};

export default CartItems;
