import React from 'react'
import Layout from '../components/Layout/Layout';
import contactUs from "../assets/contactus.jpg";
import { IoIosMail } from "react-icons/io";
import { BiPhoneCall } from "react-icons/bi";
import { BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
<Layout title={"Contact us"}>
<div className="row contactus">
  <div className="col-md-6">
    <img
    src={contactUs}
    alt='contactus'
    style={{ width: "90%" }}/>
  </div>
  <div className="col-md-6">
    <h1 className='bg-dark p-2 text-white text-center'>CONTACT US</h1>
    <p className='text-justify mt-2'>
      Any query and info about product feel free to call anytime. 24X7 available :)
    </p>
    <p className='mt-3'>
     <IoIosMail/> : www.help@ecommerceapp.com
    </p>
    <p className='mt-3'>
     <BiPhoneCall/> : 04935-7890654
    </p>
    <p className='mt-3'>
     <BiSupport/> : 1800-000-1100 (toll-free)
    </p>  
    </div>
</div>
  </Layout>
  )
}

export default Contact