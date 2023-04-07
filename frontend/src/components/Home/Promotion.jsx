import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { Loading } from "../";
import { Typography } from "@mui/material";
import "./promotion.css";

const Promotion = () => {
  const { loading, error, products } = useSelector((state) => state.products);

  const options = {
    edit: false,
    color: "rgba(0,0,0,.2)",
    activeColor: "var(--color-fc744a)",
    value: products[0]?.ratings,
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25,
  };

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <h2 className="promo-heading">Promotion of the day</h2>
          <div className="promotion">
            <div className="product-img">
              <img src={products[0].images[0].url} alt="promotion" />
            </div>
            <div className="promo-info">
              <div>
                <p>-20% OFF</p>
                <h2>{products[0].name}</h2>
              </div>
              <div>
                <ReactStars {...options} />
                <span>({products[0].numOfReviews} Reviews )</span>
              </div>
              <p>{products[0].price}</p>
              <p>{products[0].description}</p>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Promotion;
