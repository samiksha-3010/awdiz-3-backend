import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';

import { AuthContext } from './component/Context/Auth.Context';
import { useContext } from 'react';
import { Home } from './component/Home';
import Register from './component/Register';
import Login from './component/Login';
import AddProduct from './component/Seller/AddProduct';
import Navbar from './component/Comman/Navbar';
import Profile from './component/Profile';
import SingleProduct from './component/BUYER/SingleProduct';
import YourProducts from './component/Seller/YourProducts';
import Cart from './component/Buyer/Cart';



function App() {

  const {state} = useContext(AuthContext);

  console.log(state?.user,"-user")
  return (
    <div className="App">
      <Navbar/>
     <Routes>
     <Route path='/' element={<Home/>} />
     <Route path='/login' element={< Login/>} />
     <Route path='/register' element={<Register />} />
     <Route path='/add-product' element={<AddProduct />} />
     <Route path='/profile' element={<Profile/>} />
     <Route path='/singleproduct/:id' element={<SingleProduct/>}/>
     <Route path='/cart' element={<Cart/>}/>
     <Route path='/your-product' element={<YourProducts/>}/>



     



     </Routes>
       
    </div>
  );
}

export default App;
