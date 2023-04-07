import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid, dataGrid } from "@mui/x-data-grid";
import "./ProductList.css";
import Loading from "../Layout/Loading";
import {
  clearErrors,
  getAllUsers,
  deleteUser,
} from "../../actions/userActions";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button, Typography } from "@mui/material";
import MetaData from "../MetaData";
import { Edit, Delete, Image } from "@mui/icons-material";
import SideBar from "./SideBar";
import { DELETE_USER_RESET } from "../../constants/userConstants";
import { Avatar } from "@mui/material";
const Users = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, users } = useSelector((state) => state.allUsers);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.profile
  );
  console.log(users);

  const history = useNavigate();

  const deleteProductHandler = (id) => {
    dispatch(deleteUser(id));
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
      alert.success("User Deleted Successfully");
      history("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }
    dispatch(getAllUsers());
  }, [alert, error, dispatch, deleteError, isDeleted, history]);

  const columns = [
    { field: "id", headerName: "User Id", minWidth: 250, flex: 0.5 },
    { field: "name", headerName: "Username", minWidth: 200, flex: 0.3 },
    { field: "email", headerName: "Email", minWidth: 300, flex: 1 },
    {
      field: "role",
      headerName: "Role",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.row.role === "user" ? "redColor" : "greenColor";
      },
    },
    {
      field: "action",
      headerName: "Action",
      minWidth: 150,
      flex: 0.5,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/users/${params.row.id || ""}`}>
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
  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        email: item.email,
        role: item.role,
      });
    });

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <MetaData title="All Users | admin" />
          <div className="dashboard">
            <SideBar />
            <div className="productList_container">
              <Typography component="h1">All Users</Typography>
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

export default Users;
