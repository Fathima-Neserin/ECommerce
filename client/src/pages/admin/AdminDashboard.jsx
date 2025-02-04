import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth.context";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="col-md-3"
          >
            <AdminMenu />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="col-md-7 ms-5 d-flex justify-content-center"
          >
            <div
              className="card shadow-lg w-100 p-5"
              style={{ borderRadius: "15px", backgroundColor: "#f9f9f9" }}
            >
              <h3 className="mb-3 text-center text-primary">
                {auth?.user?.name}
              </h3>
              <h4 className="mb-2 text-center text-secondary">
                {auth?.user?.email}
              </h4>
              <p className="mb-2 text-center text-secondary">
                {auth?.user?.phone}
              </p>
              <p className="mb-4 text-center" style={{ color: "#555" }}>
                {auth?.user?.address}
              </p>
              <button
                className="btn btn-outline-warning"
                onClick={() => navigate("/dashboard/user/profile")}
              >
                Update Profile
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
