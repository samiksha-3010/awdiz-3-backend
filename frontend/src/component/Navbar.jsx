import React, { useContext } from 'react'
import { AuthContext } from './Context/Auth.Context';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const router = useNavigate()
    const {state, dispatch} = useContext(AuthContext);
  return (
    <div style={{border:"1px solid black",display:"flex",justifyContent:"space-around",height:"70px"}}>
        <div  style={{ width: "50%", display: 'flex', justifyContent: 'space-around' }}> 
            <h4>Logo</h4>
            {state?.user?.role != "Seller" && <h4>Mens</h4>}
            {state?.user?.role != "Seller" &&<h4>Womens</h4>}
            {state?.user?.role != "Seller" && <h4>Kids</h4>}
          {/* ***seller*** */}

          {state?.user?.role == "Seller" &&<h4 onClick={() => router('/add-product')}>AddProduct</h4>}
          {state?.user?.role == "Seller" && <h4 onClick={() => router('/your-product')}>YourProduct</h4>}
        </div>
        <div style={{ width: "20%", display: 'flex', justifyContent: 'space-around' }}>
        {state?.user?.name ? <>
            {state?.user?.role == "Buyer" && <h4>Cart</h4>}
            <h4>Profile</h4>
            <h4 onClick={() => dispatch({ type: "LOGOUT" })}>Logout</h4>
           </>: <h4 onClick={() => router('/login')}>Login/Register</h4>}
        </div>


    </div>
  )
}

export default Navbar;