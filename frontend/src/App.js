import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Home } from './component/Home';
import Register from './component/Register';
import Login from './component/Login';

function App() {
  return (
    <div className="App">
     <Routes>
     <Route path='/' element={<Home/>} />
     <Route path='/login' element={< Login/>} />
     <Route path='/register' element={<Register />} />


     </Routes>
       
    </div>
  );
}

export default App;
