import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./MyOrders.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import { useAlert } from "react-alert";
import Loading from "../Layout/Loading";
import { Link, useParams } from "react-router-dom";
import { Typography, Box } from "@mui/material";
import { Launch } from "@mui/icons-material";
import MetaData from "../MetaData";
const MyOrders = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  let rows = [];
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.row.status === "Processing" ? "redColor" : "greenColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.3,
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        const id = params.row.id;
        return (
          <Link to={`/order/${id || ""}`}>
            <Launch />
          </Link>
        );
      },
    },
  ];

  orders &&
    orders.forEach((item, index) => {
      console.log(item.orderItems.length);
      rows.push({
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
        itemsQty: item?.orderItems?.length,
      });
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [error, dispatch, alert]);

  return (
    <Fragment>
      <MetaData title={`${user.name} - Orders`} />
      {loading ? (
        <Loading />
      ) : (
        <div className="myOrderPage">
          <DataGrid
            rows={rows}
            columns={columns}
            autoHeight
            className="grid_table"
            pageSize={10}
            disableSelectionOnClick
          />
          <Typography className="myOrdersName">{`${user.name}'s orders`}</Typography>
        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;
