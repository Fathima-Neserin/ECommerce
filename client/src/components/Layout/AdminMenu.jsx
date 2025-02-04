import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaBox,
  FaClipboardList,
  FaShoppingCart,
  FaUsers,
  FaLayerGroup,
} from "react-icons/fa";

const AdminMenu = () => {
  return (
    <div className="text-center">
      <h4 className="mb-3 ">Admin Panel</h4>
      <div className="list-group">
        <NavLink
          to="/dashboard/admin/create-category"
          className="list-group-item list-group-item-action d-flex align-items-center bg-transparent border-0 p-3 text-dark"
        >
          <FaLayerGroup className="me-3 fs-3" />
          Create Category
        </NavLink>
        <NavLink
          to="/dashboard/admin/create-product"
          className="list-group-item list-group-item-action d-flex align-items-center bg-transparent border-0 p-3 text-dark"
        >
          <FaBox className="me-3 fs-3" />
          Create Product
        </NavLink>
        <NavLink
          to="/dashboard/admin/products"
          className="list-group-item list-group-item-action d-flex align-items-center bg-transparent border-0 p-3 text-dark"
        >
          <FaClipboardList className="me-2 fs-3" />
          Products
        </NavLink>
        <NavLink
          to="/dashboard/admin/orders"
          className="list-group-item list-group-item-action d-flex align-items-center bg-transparent border-0 p-3 text-dark "
        >
          <FaShoppingCart className="me-2 fs-3" />
          Orders
        </NavLink>
        <NavLink
          to="/dashboard/admin/users"
          className="list-group-item list-group-item-action d-flex align-items-center bg-transparent border-0 p-3 text-dark "
        >
          <FaUsers className="me-2 fs-3" />
          Users
        </NavLink>
      </div>
    </div>
  );
};

export default AdminMenu;
