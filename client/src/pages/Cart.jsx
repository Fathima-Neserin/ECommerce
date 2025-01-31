import React, { useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart.context";
import { useAuth } from "../context/auth.context";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    let existingCartItem = localStorage.getItem("cart");
    setCart(JSON.parse(existingCartItem));
  }, []);

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const removeCartItem = (pdtId) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pdtId);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"Your Cart"}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello ${auth?.token ? auth?.user?.name : "Guest"}`}
            </h1>
            <h4 className="text-center">
              {cart?.length
                ? `You have ${cart.length} items in your cart. ${
                    auth?.token ? "" : "Please login to checkout."
                  }`
                : "Your cart is empty."}
            </h4>
          </div>
        </div>

        <div className="row">
          <div className="col-md-8">
            <div className="row">
              {cart?.map((product) => (
                <div
                  className="row m-2 mb-2 p-3 card flex-row"
                  key={product._id}
                >
                  <div className="col-md-4">
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                      className="card-img-top product-img"
                      alt={product.name}
                      style={{ objectFit: "cover", marginBottom: "3px" }}
                      width="150px"
                      height="250px"
                    />
                  </div>
                  <div className="col-md-8">
                    <p>{product.name}</p>
                    <p>{product.description.substring(0.3)}....</p>
                    <p>Price : $ {product.price}</p>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeCartItem(product._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-md-4 text-center">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total : {totalPrice()}</h4>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
