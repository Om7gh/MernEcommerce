import React from "react";
import "./about.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import { YouTube, Instagram } from "@mui/icons-material";
const About = () => {
  const visitInstagram = () => {
    window.location = "https://instagram.com/";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/dn6pxbvex/image/upload/v1680389028/avatars/pde6vvuwt4xtqvrnjtl1.png"
              alt="Founder"
            />
            <Typography>Omar Ghazi</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>This is a sample wesbite made by @Omar Ghazi.</span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a href="https://www.youtube.com/" target="blank">
              <YouTube className="youtubeSvgIcon" />
            </a>

            <a href="https://instagram.com/" target="blank">
              <Instagram className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
