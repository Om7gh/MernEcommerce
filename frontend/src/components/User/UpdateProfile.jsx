import React, { Fragment, useState, useEffect } from "react";
import "./UpdateProfile.css";
import Image from "../../asset/raw.jpg";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FaceIcon from "@mui/icons-material/Face";
import ProfilePrev from "../../asset/Profile.png";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  loadUser,
  profileUpdate,
} from "../../actions/userActions";
import { useAlert } from "react-alert";
import Loading from "../Layout/Loading";
import { useNavigate } from "react-router-dom";
import MetaData from "../MetaData";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { user } = useSelector((state) => state.user);
  const { error, loading, isUpdated } = useSelector((state) => state.profile);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState(ProfilePrev);

  const profileUpdateSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(profileUpdate(myForm));
  };

  const profileUpdateDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const history = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loadUser());
      history("/Profile");
    }

    dispatch({ type: UPDATE_PROFILE_RESET });
  }, [dispatch, error, alert, history, isUpdated, user]);

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <MetaData title={`${user?.name} | Update Profile`} />
          <div className="updateProfile">
            <img src={Image} alt="img" className="img-header" />
            <div className="updateProfile__box">
              <h2>
                Hey <span>{`${user?.name}`}</span> Use this form for updating
                your profile Information.
              </h2>

              <form
                className="updateForm"
                encType="multipart/form-data"
                onSubmit={profileUpdateSubmit}
              >
                <div className="signUpName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
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

                <div id="profileUpdateImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={profileUpdateDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateBtn"
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

export default UpdateProfile;
