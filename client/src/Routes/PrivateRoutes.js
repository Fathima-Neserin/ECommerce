import { useState, useEffect } from "react";
import { useAuth } from "../context/auth.context";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Layout/Spinner";

export default  function PrivateRoutes() {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();

    useEffect(() => {
    const authCheck = async() => {
        const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/user-auth`)
          if(response.data.ok){
            setOk(true);
          }else{
            setOk(false)
          }
    }
    if(auth?.token) authCheck();
    },[auth?.token]);

    return ok ?  <Outlet/> : <Spinner/>
}