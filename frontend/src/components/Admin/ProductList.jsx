import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid, dataGrid } from "@mui/x-data-grid";
import "./ProductList.css";
import Loading from "../Layout/Loading";
import {
  clearErrors,
  adminProduct,
  deleteProduct,
} from "../../actions/productAction";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button, Typography } from "@mui/material";
import MetaData from "../MetaData";
import { Edit, Delete } from "@mui/icons-material";
import SideBar from "./SideBar";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstant";

const ProductList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const history = useNavigate();

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
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
      alert.success("Product Deleted Successfully");
      history("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
    dispatch(adminProduct());
  }, [alert, error, dispatch, deleteError, isDeleted, history]);

  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 250, flex: 0.5 },
    { field: "name", headerName: "Name", minWidth: 200, flex: 1 },
    { field: "stock", headerName: "Stock", minWidth: 150, flex: 0.3 },
    { field: "price", headerName: "Price", minWidth: 270, flex: 0.5 },
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
            <Link to={`/admin/products/${params.row.id || ""}`}>
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
  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
      });
    });

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <MetaData title="All Product | admin" />
          <div className="dashboard">
            <SideBar />
            <div className="productList_container">
              <Typography component="h1">All Products</Typography>
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

export default ProductList;
