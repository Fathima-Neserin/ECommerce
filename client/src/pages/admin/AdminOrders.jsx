import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth.context";
import { Select } from "antd";
import axios from "axios";
import moment from "moment";

const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Ordered",
    "Dispatched",
    "Shipped",
    "Out For Delivery",
    "Delivered",
    "Cancel Order",
  ]);
  const [chngeStatus, setChangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getAllOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/all-orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.token) getAllOrders();
  }, [auth?.token]);

  const handleStatusChange = async (value, orderId) => {
    try {
      const {data} = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`, {status: value});
      getAllOrders()
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Layout title={"Admin - Orders"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>

            <div className="container mt-4">
              <div className="table-responsive bg-white shadow-sm p-4 rounded">
                <table className="table  text-center align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Status</th>
                      <th>Buyer</th>
                      <th>Date</th>
                      <th>Payment</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, index) => (
                      <tr key={index} className="align-middle">
                        <td>{index + 1}</td>
                        <td>
                          <Select
                            bordered={false}
                            onChange={(value) => handleStatusChange(value, order._id)}
                            defaultValue={order?.status || "Ordered"}
                            className="form-select border rounded px-2"
                          >
                            {status.map((s, i) => (
                              <Option key={i} value={s}>
                                {s}
                              </Option>
                            ))}
                          </Select>
                        </td>

                        <td>{order?.buyer?.name}</td>
                        <td>{moment(order?.createdAt).fromNow()}</td>
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

export default AdminOrders;
