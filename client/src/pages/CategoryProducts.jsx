import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/cart.context";
import toast from "react-hot-toast";

const CategoryProducts = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [cart, setCart] = useCart();
  const params = useParams();
  const navigate = useNavigate();

  const getProductsByCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/category-product/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (params?.slug) getProductsByCategory();
  }, [params?.slug]);

  // Add to Cart Function
  const handleAddToCart = async (e, product) => {
    e.preventDefault();
    try {
      const isProductInCart = await cart.some(
        (item) => item._id === product._id
      );
      if (!isProductInCart) {
        const updatedCart = [...cart, product];
        setCart(updatedCart);
        await localStorage.setItem("cart", JSON.stringify(updatedCart));
        toast.success("Item added to cart");
      } else {
        toast.error("Item already present in your cart");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"Category based products"}>
      <div className="container mt-3">
        <h2 className="text-center">Category - {category.name}</h2>
        <h6 className="text-center">{products.length} items found</h6>
        <div className="row">
          {products?.map((product) => (
            <div
              key={product._id}
              className="col-12 col-sm-6 col-md-4 col-lg-2 mb-4"
            >
              <div className="card h-100 w-360">
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                  className="card-img-top product-img"
                  alt={product.name}
                  style={{ objectFit: "cover", height: "200px" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text" style={{ flex: "2 2 auto" }}>
                    {product.description.substring(0, 29)}.....
                  </p>
                  <p className="card-text">$ {product.price}</p>
                  <div className="d-flex">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => navigate(`/product/${product.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-secondary btn-sm ms-2"
                      onClick={(e) => handleAddToCart(e, product)}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProducts;
