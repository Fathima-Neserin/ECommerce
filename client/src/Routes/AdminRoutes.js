import { useState, useEffect } from "react";
import { useAuth } from "../context/auth.context";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Layout/Spinner";

export default  function AdminRoutes() {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();

    useEffect(() => {
      const authCheck = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API}/api/v1/auth/admin-auth`
          );
          if (response.data.ok) {
            setOk(true);
          } else {
            setOk(false);
          }
        } catch (error) {
          console.error("Error in admin auth check:", error.response?.data || error.message);
          setOk(false); // Ensure to set `ok` to `false` in case of an error
        }
      };
       
    
    if(auth?.token) authCheck();
    },[auth?.token]);

    return ok ?  <Outlet/> : <Spinner path="/"/>
}