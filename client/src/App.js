import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Auth/Register";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Auth/Login";
import Dashboard from "./user/Dashboard";
import PrivateRoutes from "./Routes/PrivateRoutes";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import AdminRoutes from "./Routes/AdminRoutes";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateCategory from "./pages/admin/CreateCategory";
import CreateProduct from "./pages/admin/CreateProduct";
import Users from "./pages/admin/Users";
import MyOrders from "./user/MyOrders";
import Profile from "./user/Profile";

function App() {
  return (
    <div>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/dashboard" element={<PrivateRoutes/>}>
      <Route path="user" element={<Dashboard/>}/>
      <Route path="user/orders" element={<MyOrders/>}/>
      <Route path="user/profile" element={<Profile/>}/>
      </Route>
      <Route path="/dashboard" element={<AdminRoutes/>}>
      <Route path="admin" element={<AdminDashboard/>}/>
      <Route path="admin/create-category" element={<CreateCategory/>}/>
      <Route path="admin/create-product" element={<CreateProduct/>}/>
      <Route path="admin/users" element={<Users/>}/>
      </Route>
      <Route path="/register" element={<Register/>}/>
      <Route path="/forgot-password" element={<ForgotPassword/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/policy" element={<Policy/>}/>
      <Route path="*" element={<PageNotFound/>}/>
      </Routes>
      <Toaster/>
    </div>
  );
}

export default App