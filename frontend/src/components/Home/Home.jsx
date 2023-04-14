import React, { Fragment, useEffect } from "react";
import { BsFillMouseFill } from "react-icons/bs";
import { FaShippingFast } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { MdPayment, MdOutlineSettingsAccessibility } from "react-icons/md";
import { Link } from "react-router-dom";
import Image from "../../asset/home1.png";
import ProductCard from "./ProductCard";
import MetaData from "../MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Layout/Loading";
import Marquee from "react-fast-marquee";
import { useAlert } from "react-alert";
const Home = ({ title }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, products } = useSelector((state) => state.products);

  console.log(products);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          {" "}
          <MetaData title="ElectroSmart | Home" />
          <main className="home" id="home">
            <div className="design"></div>
            <div className="home__left">
              <h2>
                It's <span className="stroke_text">Shopping</span> Time.
              </h2>
              <p>
                Upgrade your home security with our smart locks and security
                cameras. Experience remote access, voice control, and real-time
                alerts for ultimate peace of mind
              </p>
              <div className="home__btn">
                <button className="btn btn1">
                  <a href="#container">
                    <BsFillMouseFill />
                    Scroll
                  </a>
                </button>
                <button className="btn btn2">
                  <Link to={"/account"}>Sign up</Link>
                </button>
              </div>

              <div className="more-info">
                <p>
                  <span>+99</span> Products
                </p>
                <p>
                  <span>+50</span> Reviews
                </p>
                <p>
                  <span>+10</span> Promotion / week
                </p>
              </div>
            </div>
            <div className="home__right">
              <img src={Image} alt="Home-img" />
            </div>
          </main>
          <Marquee
            className="home__quality"
            pauseOnHover
            gradient={false}
            pauseOnClick
          >
            <div className="home__quality-self">
              <FaShippingFast />
              <div>
                <h4>Free Shipping</h4>
                <p>from all orders over</p>
              </div>
            </div>
            <div className="home__quality-self">
              <BiSupport />
              <div>
                <h4>support 24/7</h4>
                <p>Shop with an expert</p>
              </div>
            </div>
            <div className="home__quality-self">
              <MdOutlineSettingsAccessibility />
              <div>
                <h4>affordable price</h4>
                <p>get factory direct price</p>
              </div>
            </div>
            <div className="home__quality-self">
              <MdPayment />
              <div>
                <h4>secure payment</h4>
                <p>100% protected payment</p>
              </div>
            </div>
          </Marquee>
          <h2 className="home__heading">Featured Product.</h2>
          <div id="container" className="home__container">
            {products?.map((product) => (
              <ProductCard key={product?._id} product={product} />
            ))}
          </div>{" "}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
