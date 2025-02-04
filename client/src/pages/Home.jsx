import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Price";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart.context";
import toast from "react-hot-toast";
import "../styles/card.styles.css";
import { motion } from "framer-motion";

function Home() {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const totalCount = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/count-product`
      );
      setCount(data?.totalProducts);
    } catch (error) {
      console.log(error);
    }
  };
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/categories`
      );
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
    totalCount();
  }, []);


  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/list-product/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((category) => category !== id);
    }
    setChecked(all);
  };

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/list-product/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked, radio]);

  const filterProducts = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/filter-products`,
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (checked.length || radio.length) filterProducts();
  }, [checked, radio]);

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
    <Layout title={"All Products - Best offers"}>
      <div className="row mt-3">
        <div className="col-md-2">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column ml-6">
            {categories?.map((category) => (
              <Checkbox
                key={category._id}
                onChange={(e) => handleFilter(e.target.checked, category._id)}
                className="m-2 ms-5"
              >
                {category.name}
              </Checkbox>
            ))}
          </div>
          <h4 className="text-center mt-3">Filter By Price</h4>
          <div className="d-flex flex-column ml-6">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices.map((price) => (
                <div key={price._id} className="m-2 ms-5">
                  <Radio value={price.array}>{price.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger btn-sm ms-3"
              onClick={() => window.location.reload()}
            >
              RESET
            </button>
          </div>
        </div>
        <div className="col-md-9">
          <motion.h1
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            All Products
          </motion.h1>
          <div className="row">
            {products?.map((product) => (
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
          <div className="m-3 p-2 text-center">
            {products && products.length < count && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
