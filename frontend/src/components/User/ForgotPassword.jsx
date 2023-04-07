import React, { Fragment, useState, useEffect, useMemo } from "react";
import "./ForgotPassword.css";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FaceIcon from "@mui/icons-material/Face";
import ProfilePrev from "../../asset/Profile.png";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, passwordForgot } from "../../actions/userActions";
import { useAlert } from "react-alert";
import Loading from "../Layout/Loading";
import { useNavigate } from "react-router-dom";
import MetaData from "../MetaData";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, message } = useSelector(
    (state) => state.forgotPassword
  );
  const [email, setEmail] = useState("");

  const ForgotPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("email", email);
    dispatch(passwordForgot(myForm));
  };

  useMemo(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      alert.success(message);
    }
  }, [dispatch, error, alert, message]);

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <MetaData title={`Forget Password`} />
          <div className="forgotPassword">
            <div className="forgotPassword__box">
              <h2>Reset Your Password from here :</h2>

              <form
                className="changePasswordForm"
                onSubmit={ForgotPasswordSubmit}
              >
                <h3>Forgot Password</h3>
                <div className="signUpEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="Send"
                  className="forgotPasswordBtn"
                  disabled={loading ? true : false}
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ForgotPassword;
