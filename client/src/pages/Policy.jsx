import React from 'react'
import Layout from '../components/Layout/Layout';
import policy from "../assets/policy.jpg";

const Policy = () => {
  return (
<Layout>
  <div className="row policy">
          <div className="col-md-6">
            <img
            src={policy}
            alt='policy'
            style={{ width: "100%" }}/>
          </div>
          <div className="col-md-6">
            <h1 className='bg-dark p-2 text-white text-center'>PRIVACY POLICY</h1>
            <p className='text-justify mt-2'>
            At ECOMMERCE App, your privacy is our top priority. We are dedicated to safeguarding your personal information and ensuring your shopping experience is secure, transparent, and trustworthy.

We collect and use your data responsibly to provide a seamless shopping experience, improve our services, and personalize your interactions with us. Rest assured, we do not share or sell your personal information to third parties without your consent, and all data is protected using industry-standard security measures.

Our Privacy Policy explains in detail how we collect, use, and protect your information, as well as your rights regarding your data. By using our platform, you agree to the practices outlined in our policy.

For complete details, we encourage you to read our full Privacy Policy. If you have any questions or concerns, our support team is here to assist you.

Your trust is important to us, and we are committed to maintaining it.
            </p>
          
            </div>
        </div></Layout>
 )
}

export default Policy