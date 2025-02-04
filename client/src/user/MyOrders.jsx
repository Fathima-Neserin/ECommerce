import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import UserMenu from "../components/Layout/UserMenu";
import axios from "axios";
import { useAuth } from "../context/auth.context";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  return (
    <Layout title={"Your Orders"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>

            <div className="container mt-4">
              <div className="table-responsive bg-white shadow-sm p-4 rounded">
                <table className="table text-center align-middle">
                  <thead className="table-light">
                    <tr>
                      <th className="w-10">#</th>
                      <th className="w-15">Status</th>
                      <th className="w-20">Buyer</th>
                      <th className="w-20">Date</th>
                      <th className="w-15">Payment</th>
                      <th className="w-10">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, index) => (
                      <tr key={index} className="align-middle">
                        <td>{index + 1}</td>
                        <td>
                          <span
                            className={`badge ${
                              order?.payment?.status ===
                                "submitted_for_settlement" ||
                              order?.payment?.status === "settled"
                                ? "bg-success"
                                : "bg-danger"
                            }`}
                          >
                            {order?.payment?.status ===
                              "submitted_for_settlement" ||
                            order?.payment?.status === "settled"
                              ? "Success"
                              : "Failed"}
                          </span>
                        </td>
                        <td className="text-truncate">{order?.buyer?.name}</td>
                        <td className="text-truncate">
                          {moment(order?.createdAt).fromNow()}
                        </td>
                        <td>${order?.payment?.amount}</td>
                        <td>{order?.products?.length}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="row mt-4">
                {orders?.map((order) =>
                  order.products?.map((product) => (
                    <div className="col-md-4 mb-3" key={product._id}>
                      <div className="card h-100 shadow border border-secondary">
                        <img
                          src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                          className="card-img-top border-bottom border-secondary"
                          alt={product.name}
                          style={{ height: "400px", objectFit: "cover" }}
                        />
                        <div className="card-body p-2 d-flex flex-column">
                          <h6 className="card-title fw-bold text-truncate">
                            {product.name}
                          </h6>
                          <p className="card-text text-muted small flex-grow-1">
                            {product.description.substring(0, 40)}...
                          </p>
                          <span className="fw-bold text-primary mt-auto">
                            ${product.price}
                          </span>
                          <button
                            className="btn btn-secondary btn-sm w-100"
                            onClick={() => navigate(`/product/${product.slug}`)}
                          >
                            More Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyOrders;
