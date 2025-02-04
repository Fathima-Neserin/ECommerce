import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth.context";

const AdminDashboard = () => {
  const [auth, setAuth] = useAuth();

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-7 ms-5 d-flex justify-content-center">
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
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
