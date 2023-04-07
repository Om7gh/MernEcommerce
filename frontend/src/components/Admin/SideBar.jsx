import React from "react";
import "./SideBar.css";
import { Link } from "react-router-dom";
import { TreeItem, TreeView } from "@material-ui/lab";
import {
  ExpandMore,
  PostAdd,
  ImportExport,
  ListAlt,
  Dashboard,
  People,
  RateReview,
  Add,
} from "@mui/icons-material";

const SideBar = () => {
  return (
    <div className="sidebar">
      <Link to="/" className="link">
        ElectroSmart
      </Link>
      <Link to="/admin/dashboard" className="link">
        <p>
          <Dashboard />
          Dashboard
        </p>
      </Link>

      <TreeView
        className="link"
        defaultCollapseIcon={<ExpandMore />}
        defaultExpandIcon={<ImportExport />}
      >
        <TreeItem nodeId="1" label="Products">
          <Link to="/admin/products" className="link">
            <TreeItem nodeId="2" label="All" icon={<PostAdd />} />
          </Link>
          <Link to="/admin/product/new">
            <TreeItem nodeId="3" label="Create" icon={<Add />} />
          </Link>
        </TreeItem>
      </TreeView>

      <Link to="/admin/orders" className="link">
        <p>
          <ListAlt />
          Orders
        </p>
      </Link>
      <Link to="/admin/users" className="link">
        <p>
          <People />
          Users
        </p>
      </Link>
      <Link to="/admin/reviews" className="link">
        <p>
          <RateReview />
          Reviews
        </p>
      </Link>
    </div>
  );
};

export default SideBar;
