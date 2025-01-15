import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Spinner = () => {
const [count, setCount] = useState(5);
const navigate = useNavigate();
const location = useLocation();

useEffect(() => {
    const interval = setInterval(() => {
        setCount((prevCount) => --prevCount)
    }, 1000)
    count === 0 && navigate("/login",{
        state: location.pathname
    })
    return () => clearInterval(interval)
}, [count, navigate])
    return (
    <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "100vh"}}>
    <h1 className='text-center'>Redirecting to you in {count} seconds</h1>
    <div className="spinner-border" role="status">    
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
  
  )
}

export default Spinner
