import React, { useEffect } from "react";
import SideBar from "./SideBar";
import "./Dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { useDispatch, useSelector } from "react-redux";
import { adminProduct } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction";
import Loading from "../Layout/Loading";
const Dashboard = () => {
  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(adminProduct());
    dispatch(getAllOrders());
  }, [dispatch]);

  let totalAmount = 0;

  let outOfStock = 0;
  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });
  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["#fff"],
        hoverBackgroundColor: ["#e7866d"],
        data: [0, totalAmount],
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "In Stock"],
    datasets: [
      {
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        hoverBackgroundColor: ["#e7866d", "#45ed45e"],
        data: [outOfStock, products?.length - outOfStock],
      },
    ],
  };
  return (
    <div className="dashboard">
      <SideBar />
      <div className="right_dashboard">
        <Typography component="h1">Dashboard</Typography>
        <div className="dashboard_summary">
          <div>
            <p>
              total amount
              <br />${totalAmount}
            </p>
          </div>
          <div className="dashboard_summary2">
            <Link to={"/admin/products"}>
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to={"/admin/orders"}>
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to={"/admin/users"}>
              <p>Users</p>
              <p>{users.length}</p>
            </Link>
          </div>
        </div>

        <div className="line_chart">
          <Line data={lineState} />
        </div>

        <div className="doughnut_chart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
