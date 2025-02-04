import React from "react";
import Layout from "../components/Layout/Layout";
import aboutUs from "../assets/aboutus.jpg";
import { motion } from "framer-motion";

function About() {
  return (
    <Layout title={"About us"}>
      <div className="row footer-links">
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="col-md-6"
        >
          <img src={aboutUs} alt="aboutus" style={{ width: "90%" }} />
        </motion.div>
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5 }}
          className="col-md-6"
        >
          <h1 className="bg-dark p-2 text-white text-center">ABOUT US</h1>
          <p className="text-justify mt-2">
            Welcome to ECOMMERCE App, your one-stop shop for your needs
            <br />
            We’re committed to offering high-quality products, affordable
            prices, and a seamless shopping experience.
            <br />
            With trusted suppliers and fast delivery, we make it easy to find
            what you love—all in one place.
            <br />
            Your satisfaction is our priority.
            <br />
            Happy shopping :)
          </p>
        </motion.div>
      </div>
    </Layout>
  );
}

export default About;
