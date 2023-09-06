// import logo from './logo.svg';
// import './App.css';

import { Route, Routes } from "react-router";
import Home from "./component/Home";
import Register from "./component/Register";
import Login from "./component/Login";
import AddProduct from "./component/Seller/AddProduct";
import Profile from "./component/Profile";
import SingleProduct from "./component/Buyer/SingleProducts";
import YourProducts from "./component/Seller/YourProducts";
import Cart from "./component/Buyer/Cart";
import Navbar from "./component/common/Navbar"
// import Allproducts from "./component/common/Allproducts";

function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
      <Route exact path='/' element={<Home/>} />
     <Route exact path='/login' element={<Login/>} />
     <Route exact path='/register' element={<Register />} />
     <Route exact path='/add-product' element={<AddProduct/>} />
     <Route exact path='/profile' element={<Profile/>} />
     <Route exact path='/singleproduct/:id' element={<SingleProduct/>}/>
     <Route exact path='/your-product' element={<YourProducts/>}/>
     <Route exact path='/add-cart' element={<Cart/>}/> 
     {/* <Route exact path='/all-products' element={<Allproducts/>}/>   */}
      </Routes>
    </div>
  );
}

export default App;
