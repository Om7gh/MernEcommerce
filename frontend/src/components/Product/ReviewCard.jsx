import React, { Fragment } from "react";
import Profile from "../../asset/Profile.png";
import { useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";

const ReviewCard = ({ review }) => {
  const { name, comment, rating } = review;
  const { product } = useSelector((state) => state.productDetails);

  const options = {
    edit: false,
    color: "rgba(0,0,0,.2)",
    activeColor: "var(--color-fc744a)",
    value: product.ratings,
    isHalf: true,
    size: window.innerWidth < 600 ? 13 : 18,
  };
  return (
    <Fragment>
      <div className="cart-review">
        <img src={Profile} alt={name} />
        <p>{name}</p>
        <ReactStars {...options} />
        <span className="cart-review-span">{comment}</span>
      </div>
    </Fragment>
  );
};

export default ReviewCard;
