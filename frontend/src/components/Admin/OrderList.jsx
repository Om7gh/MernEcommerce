import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import "./ProductList.css";
import Loading from "../Layout/Loading";
import {
  clearErrors,
  getAllOrders,
  deleteOrder,
} from "../../actions/orderAction";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button, Typography } from "@mui/material";
import MetaData from "../MetaData";
import { Edit, Delete } from "@mui/icons-material";
import SideBar from "./SideBar";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstant";
import { DELETE_ORDERS_RESET } from "../../constants/orderConstants";

const OrderList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, orders } = useSelector((state) => state.allOrders);
  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  const history = useNavigate();

  const deleteProductHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success("Order Deleted Successfully");
      history("/admin/orders");
      dispatch({ type: DELETE_ORDERS_RESET });
    }
    dispatch(getAllOrders());
  }, [alert, error, dispatch, deleteError, isDeleted, history]);

  const columns = [
    { field: "id", headerName: "Order Id", minWidth: 250, flex: 0.5 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 200,
      flex: 1,
      cellClassName: (params) => {
        return params.row.status === "Processing" ? "redColor" : "greenColor";
      },
    },
    { field: "itemsQty", headerName: "ItemsQty", minWidth: 150, flex: 0.4 },
    { field: "amount", headerName: "Amount", minWidth: 270, flex: 0.5 },
    {
      field: "action",
      headerName: "Action",
      minWidth: 200,
      flex: 0.3,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/order/${params.row.id || ""}`}>
              <Edit />
            </Link>

            <Button onClick={() => deleteProductHandler(params.row.id)}>
              <Delete />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];
  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <MetaData title="All Orders | admin" />
          <div className="dashboard">
            <SideBar />
            <div className="productList_container">
              <Typography component="h1">All Orders</Typography>
              <DataGrid
                rows={rows}
                columns={columns}
                className="productList_table"
                autoHeight
              />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderList;
