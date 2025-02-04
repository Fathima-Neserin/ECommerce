import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/search.context";

const Search = () => {
  const [search, setSearch] = useSearch();
  return (
    <Layout title={"Search Results"}>
      <div className="container">
        <div className="text-center mt-3">
          <h1>Search Results</h1>
          <h6>
            {search?.results.length < 1
              ? "No Products Found"
              : `${search?.results.length} products found`}
          </h6>
          <div className="row">
            {search?.results.map((product) => (
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
                      <button className="btn btn-primary btn-sm">
                        More Details
                      </button>
                      <button className="btn btn-secondary btn-sm ms-2">
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
