// import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from "./component/Home"
import Register from './component/Register';
import Login from './component/Login';
import AddProduct from './component/Seller/AddProduct';
import Navbar from './component/Comman/Navbar';
import Profile from './component/Profile';
import YourProducts from './component/Seller/YourProducts';
import SingleProduct from './component/Buyer/SingleProduct';
import Cart from './component/Buyer/Cart';

function App() {
  return (
    <div className="App">
      <Navbar/>
     <Routes>
     <Route exact path='/' element={<Home/>} />
     <Route exact path='/login' element={<Login/>} />
     <Route exact path='/register' element={<Register />} />
     <Route exact path='/add-product' element={<AddProduct />} />
     <Route exact path='/profile' element={<Profile/>} />
     <Route exact path='/singleproduct/:id' element={<SingleProduct/>}/>
     <Route exact path='/your-product' element={<YourProducts/>}/>
     <Route exact path='/cart' element={<Cart/>}/>  
     </Routes>
    </div>
  );
}
export default App;
