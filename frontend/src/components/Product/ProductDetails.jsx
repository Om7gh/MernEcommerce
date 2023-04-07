import React, { Fragment, useEffect, useState } from "react";
import "./ProductDetails.css";
import Carousel from "react-elastic-carousel";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/productAction";
import ReviewCard from "./ReviewCard";
import Loading from "../Layout/Loading";
import { useAlert } from "react-alert";
import MetaData from "../MetaData";
import { addItemsToCart } from "../../actions/cartActions";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { NEW_REVIEW_RESET } from "../../constants/orderConstants";
import { Rating } from "@mui/material";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { error, loading, product } = useSelector(
    (state) => state.productDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const options = {
    edit: false,
    color: "rgba(0,0,0,.2)",
    activeColor: "var(--color-fc744a)",
    value: product?.ratings,
    isHalf: true,
    size: window.innerWidth < 600 ? 13 : 18,
  };

  const [quantity, setQuantity] = useState(1);
  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false);
  const [ratings, setRatings] = useState(0);
  const alert = useAlert();

  const decreaseQuantity = () => {
    if (quantity <= 1) return;
    setQuantity((quantity) => quantity - 1);
  };
  const increaseQuantity = () => {
    if (product.stock <= quantity) return;
    setQuantity((quantity) => quantity + 1);
  };
  const { id } = useParams();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, alert, error, success, reviewError, product]);

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    alert.success("Item Added To Cart");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", ratings);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));

    setOpen(false);
  };
  console.log(ratings);
  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <MetaData title={`Product : ${product?.name}`} />
          <div className="ProductDetails">
            <div className="carousel__container">
              <Carousel>
                {product?.images &&
                  product?.images.map((item, i) => (
                    <img
                      className="CarouselImg"
                      key={item?.url}
                      src={item?.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>
            <div className="product__info">
              <div className="block-1">
                <h2>{product?.name}</h2>
                <p>Product # {product?._id}</p>
              </div>{" "}
              {/* Block-1 end */}
              <div className="block-2">
                <ReactStars {...options} />
                <span className="block-2-span">
                  ({product?.numOfReviews} Reviews )
                </span>
              </div>{" "}
              {/* Block-2 end */}
              <div className="block-3">
                <h2>
                  {" "}
                  <span>Price :</span> ${product?.price}
                </h2>
                <div className="block-3-1">
                  <div className="block-3-1-1">
                    <button className="incr" onClick={decreaseQuantity}>
                      -
                    </button>
                    <input readOnly type="number" value={quantity} />
                    <button className="incr" onClick={increaseQuantity}>
                      +
                    </button>
                  </div>{" "}
                  {/* Block-3-1-1 */}
                  <button className="add-to-cart" onClick={addToCartHandler}>
                    Add To Cart
                  </button>
                </div>
                {/* Block-3-1 end */}
                <p>
                  Status :
                  <b className={product?.stock < 1 ? "redColor" : "greenColor"}>
                    {product?.stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>
              {/* Block-3 end */}
              <div className="block-4">
                <span>description :</span>
                <span> {product?.description}</span>
              </div>{" "}
              {/* Block-4 end */}
              <button className="add-btn" onClick={submitReviewToggle}>
                Add Review
              </button>
            </div>
          </div>

          {/* Reviews Section */}

          <h3 className="heading-reviews">Reviews</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRatings(e.target.value)}
                value={ratings}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={submitReviewToggle}
                style={{ color: "var(--color-fc744a)" }}
              >
                Cancel
              </Button>
              <Button
                onClick={reviewSubmitHandler}
                style={{ color: "var(--color-ff3e04)" }}
              >
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {product?.reviews && product?.reviews[0] ? (
            <Carousel className="reviews__carousel">
              {product.reviews.map((review) => (
                <ReviewCard review={review} />
              ))}
            </Carousel>
          ) : (
            <p
              style={{
                textAlign: "center",
                color: "var(--color-white)",
                fontSize: "2vmax",
              }}
            >
              No Reviews yet
            </p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
