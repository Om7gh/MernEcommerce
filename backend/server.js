const app = require("./app");
const cloudinary = require("cloudinary").v2;
const connectDatabase = require("./config/database");

// Handling Uncaught Exception

process.on("uncaughtException", (error) => {
  console.log(`error: ${error.message}`);
  console.log("Shutting down the server due Uncaught Exception");
  process.exit(1);
});

// config
require("dotenv").config({ path: "backend/config/config.env" });

// connection database

connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// Unhandled Promise Rejection

process.on("unhandledRejection", (error) => {
  console.log(`Error: ${error.message}`);
  console.log("Shutting down the server due unhandled Promise Rejection");
  server.close(() => {
    process.exit(1);
  });
});
