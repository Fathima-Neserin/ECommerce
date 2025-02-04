import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaUser, FaShoppingBag } from "react-icons/fa";

const UserMenu = () => {
  useEffect(() => {
    console.log("UserMenu mounted");
    return () => console.log("UserMenu unmounted");
  }, []);

  return (
    <div className="text-center">
      <h4 className="mb-3">Dashboard</h4>
      <div className="list-group">
        <NavLink
          to="/dashboard/user/profile"
          className="list-group-item list-group-item-action d-flex align-items-center bg-transparent border-0 p-3"
        >
          <FaUser className="me-3 fs-3" />
          Profile
        </NavLink>
        <NavLink
          to="/dashboard/user/orders"
          className="list-group-item list-group-item-action d-flex align-items-center bg-transparent border-0 p-3"
        >
          <FaShoppingBag className="me-3 fs-3" />
          My Orders
        </NavLink>
      </div>
    </div>
  );
};

export default UserMenu;
