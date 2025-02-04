import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/auth.styles.css";
import { useAuth } from "../../context/auth.context";

const Login = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        { email, password }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setAuth({
          ...auth,
          user: response.data.user,
          token: response.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(response.data));
        navigate(location.state || "/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, Try again later");
    }
  };
  return (
    <Layout title={"Login - Ecommerce App"}>
      <div className="form-container">
        <br />
        <br />
        <form onSubmit={handleSubmit}>
          <h1 className="title">Please Login;</h1>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail"
              placeholder="Enter your Email"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword"
              placeholder="Enter your Password"
              required
            />
          </div>
          <div className="mb-3">
            <button
              type="button"
              className="forpwd-btn"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password
            </button>
          </div>
          <button type="submit" className="reg-btn">
            LOGIN
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
