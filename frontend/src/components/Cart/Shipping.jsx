import React, { useState, Fragment } from "react";
import "./Shipping.css";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../actions/cartActions";
import Image from "../../asset/shipping1.jpg";
import MetaData from "../MetaData";
import {
  PinDrop,
  Home,
  LocationCity,
  Public,
  Phone,
  TransferWithinAStation,
} from "@mui/icons-material";
import { Country, State } from "country-state-city";
import { useAlert } from "react-alert";
import CheckOutSteps from "./CheckOutSteps";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
  const dispatch = useDispatch();
  const { shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const alert = useAlert();
  const history = useNavigate();
  const [address, setAddress] = useState(shippingInfo?.address);
  const [city, setCity] = useState(shippingInfo?.city);
  const [state, setState] = useState(shippingInfo?.state);
  const [country, setCountry] = useState(shippingInfo?.country);
  const [pinCode, setPinCode] = useState(shippingInfo?.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo?.phoneNo);

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 10 || phoneNo.length > 10) {
      alert.error("Phone number sould be 10 digit");
      return;
    }

    dispatch(
      saveShippingInfo({
        address,
        city,
        state,
        country,
        pinCode,
        phoneNo,
      })
    );
    history("/order/confirm");
  };

  return (
    <Fragment>
      <MetaData title="Shipping Details" />

      <CheckOutSteps activeStep={0} />

      <div className="shipping__Container">
        <img src={Image} alt="img" className="shipping-img" />
        <div className="shipping__box">
          <h2 className="shipping__heading">
            Hi <span>{user.name}</span>, Please Complete your information
            Correctly.
          </h2>

          <form
            className="shipping__form"
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            <div>
              <Home />
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <LocationCity />
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div>
              <PinDrop />
              <input
                type="number"
                placeholder="Pin Code"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>
            <div>
              <Phone />
              <input
                type="number"
                placeholder="Phone Number"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="10"
              />
            </div>
            <div>
              <Public />
              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option value={item.isoCode}>{item.name}</option>
                  ))}
              </select>
            </div>

            {Country && (
              <div>
                <TransferWithinAStation />
                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getAllStates().map((item) => (
                      <option value={item.isoCode}>{item.name}</option>
                    ))}
                </select>
              </div>
            )}

            <input
              type="submit"
              value="Continue"
              className="shippingBtn"
              disabled={state ? false : true}
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;
