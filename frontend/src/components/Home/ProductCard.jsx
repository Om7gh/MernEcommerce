import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import Rating from "@mui/material/Rating";

const ProductCard = ({ product }) => {
  const { images, name, _id, description, price, ratings } = product;
  const options = {
    readyOnly: true,
    value: ratings,
    precision: "0.5",
  };

  console.log(ratings);
  return (
    <Link className="home__product" to={`/product/${_id}`}>
      <div className="home__product-container">
        <div className="img-container">
          <img src={images[0].url} alt={name} />
        </div>
        <p>{name}</p>
        <div>
          <Rating {...options} />
          <span>({product?.numOfReviews} Review)</span>
        </div>

        <span>${price}</span>
        <span>{description.length > 20 ? "See Details" : description}</span>
      </div>
    </Link>
  );
};

export default ProductCard;
