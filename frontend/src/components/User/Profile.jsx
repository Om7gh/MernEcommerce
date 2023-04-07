import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../Layout/Loading";
import MetaData from "../MetaData";
import "./Profile.css";

const Profile = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const history = useNavigate();
  useEffect(() => {
    if (isAuthenticated === false) {
      history("/account");
    }
  }, [history, isAuthenticated]);

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <MetaData title={`${user?.name}`} />
          <div className="profile__container">
            <div>
              <h2>my profile</h2>
              <img src={user?.avatar?.url} alt={user?.name} />
              <Link to={"/me/update"}>edit profile</Link>
            </div>
            <div>
              <div>
                <h4>full name</h4>
                <p>{user?.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user?.email}</p>
              </div>
              <div>
                <h4>joined on</h4>
                <p>{String(user?.createdAt).substr(0, 10)}</p>
              </div>
              <div>
                <Link to={"/order/me"}>my orders</Link>
                <Link to={"/password/update"}>change password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
