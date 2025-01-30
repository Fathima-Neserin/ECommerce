import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  // get Product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/fetch-products/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProducts(data?.product._id, data?.product.category._id)
    } catch (error) {
      console.log(error);
    }
  };
  // get similar products
  const getSimilarProducts = async (pdtId, ctgId) => {
    try {
      const {data} = await axios.get( `${process.env.REACT_APP_API}/api/v1/product/related-product/${pdtId}/${ctgId}`);
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Layout>
      <div className="row container mt-2">
        <div className="col-md-6">
          <img
            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
            className="card-img-top product-img"
            alt={product.name}
            style={{ objectFit: "cover", height: 400, width: 400 }}
          />
        </div>
        <div className="col-md-6 ">
          <h1 className="text-center">Product Details</h1>
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>Price : $ {product.price}</h6>
          <h6>Category : {product.category?.name}</h6>
          <button className="btn btn-secondary btn-sm ms-2">Add To Cart</button>
        </div>
      </div>
      <hr/>
      <div className="row">
      <h1 className="text-center">Similar Products</h1>
        {relatedProducts.length < 1 && <p className="text-center">No simlar products found</p>}
        <div className="row ms-2">
            {relatedProducts?.map((product) => (
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
                     
                      <button className="btn btn-secondary btn-sm ms-2">
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>      </div>
    </Layout>
  );
};

export default ProductDetails;
