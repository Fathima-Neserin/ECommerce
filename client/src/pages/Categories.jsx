import React from "react";
import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title={"All Categories"}>
      <div className=" row container justify-center" style={{ margin: "80px" }}>
        <motion.h1
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="text-center mt-3"
        >
          All Categories
        </motion.h1>
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5 }}
          className="row"
        >
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
        </motion.div>
      </div>
    </Layout>
  );
};

export default Categories;
