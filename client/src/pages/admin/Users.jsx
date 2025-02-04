import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { useAuth } from "../../context/auth.context";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [auth, setAuth] = useAuth();

  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/users`
      );
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getAllUsers();
  }, [auth?.token]);

  const deleteUser = async (id) => {
    try {
      let answer = window.confirm("Are you sure you want to delete this user?");
      if (!answer) return;

      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/auth/delete-user/${id}`
      );

      if (data?.success) {
        toast.success(data?.message);
        getAllUsers();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, cannot delete this user");
    }
  };

  return (
    <Layout title={"Dashboard - All Users"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="col-md-3"
          >
            <AdminMenu />
          </motion.div>

          {/* User List */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="col-md-9"
          >
            <h1 className="text-center">All Users</h1>
            <div className="container">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="row"
              >
                {users?.map((user) => (
                  <motion.div
                    key={user._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="col-md-4 mt-3 mb-3"
                  >
                    <div className="card shadow-sm p-3">
                      <h5 className="card-title p-1">Name: {user?.name}</h5>
                      <p>Email: {user?.email}</p>
                      <p>Phone: {user?.phone}</p>
                      <p>Address: {user?.address}</p>
                      <button
                        className="btn btn-danger mt-2"
                        onClick={() => deleteUser(user._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
