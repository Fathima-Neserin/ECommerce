import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/search.context";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart.context";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Search = () => {
  const [search, setSearch] = useSearch();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

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
    <Layout title={"Search Results"}>
      <div className="container">
        <div className="text-center mt-3">
          <motion.h1
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            Search Results
          </motion.h1>
          <h6>
            {search?.results.length < 1
              ? "No Products Found"
              : `${search?.results.length} products found`}
          </h6>
          <div className="row">
            {search?.results.map((product) => (
              <motion.div
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.5 }}
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
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
