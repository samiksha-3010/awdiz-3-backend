import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';

import { AuthContext } from './component/Context/Auth.Context';
import { useContext } from 'react';
import Navbar from './component/Navbar';
import { Home } from './component/Home';
import Register from './component/Register';
import Login from './component/Login';
import AddProduct from './component/Seller/AddProduct';
import YourProduct from './component/Seller/YourProduct';

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
     <Route path='/your-product' element={<YourProduct />} />


     </Routes>
       
    </div>
  );
}

export default App;
