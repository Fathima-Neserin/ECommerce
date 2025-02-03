import React from "react";
import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title={"All Categories"}>
      <div
        className=" row container justify-center"
        style={{ margin: "120px" }}
      >
        <div className="row">
          {categories.map((category) => (
            <div className="col-md-4 mt-5 mb-3 gx-3 gy-3" key={category._id}>
              <Link
                className="btn cat-btn text-center p-3 border-2 border-transparent outline outline-2 outline-gray-500 rounded-md hover:bg-gray-100"
                to={`/categories/${category.slug}`}
              >
                {category.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
