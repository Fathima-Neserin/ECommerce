import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Products = () => {
  const [products, setProducts] = useState([]);
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
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
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

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/fetch-products?page=${page}`
      );
      setProducts(data?.products);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
    totalCount();
  }, [page]);

  return (
    <Layout title={"Products List"}>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5 }}
          className="col-md-9"
        >
          <h1 className="text-center mt-3">All Products List</h1>
          <div className="row">
            {products?.map((product) => (
              <div
                key={product._id}
                className="col-12 col-sm-6 col-md-4 col-lg-2 mb-4"
              >
                <Link
                  to={`/dashboard/admin/product/${product.slug}`}
                  className="text-decoration-none"
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
                        <button className="btn btn-primary btn-sm">
                          More Details
                        </button>
                        <button className="btn btn-secondary btn-sm ms-2">
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          {products?.length < count && (
            <div className="m-3 p-2 text-center">
              <button
                className="btn btn-warning"
                onClick={() => setPage(page + 1)}
              
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
};

export default Products;
