import React from 'react'
import Header from './Header'
import Footer from './Footer';
import { Helmet } from "react-helmet";

function Layout({children, title, descripion, keywords, author}) {
  return (
    <div>
       <Helmet>
       <meta charSet="utf-8" />
       <meta name="description" content={descripion} />
       <meta name="keywords" content={keywords} />
       <meta name="author" content={author} />
       <title>{title}</title>
      </Helmet>
      <Header/>
      <main style={{minHeight: "75vh"}}>
      {children}
      </main>
      <Footer/>
    </div>
  )
}

Layout.defaultProps = {
  title : "Ecommerce App - Let's shop",
  descripion : "MERN Stack Project",
  keywords : "mern, react, node, mongodb, express",
  author : "Fathima Nezrin"
}
export default Layout
