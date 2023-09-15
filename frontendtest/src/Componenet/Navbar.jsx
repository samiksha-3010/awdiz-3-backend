import React, { useContext } from 'react'
import { AuthContext } from './Context/Auth.Context'

const Navbar = () => {
  const {state,dispatch} =  useContext (AuthContext)
  return (
    <div style={{border:"1px solid black",display:"flex",justifyContent:"space-around", height:"70px",width:"100%"}}>
      <div style={{ width:"50%",display:"flex", justifyContent:"space-around"}} >
     <h2>Logo</h2>
      {state?.user?.role == "Seller" && <h2>Mens</h2>}
      {state?.user?.role == "Seller" && <h2>Womens</h2>}
     {state?.user?.role == "Seller" &&<h2>Kids</h2>}
     {state?.user?.role == "Seller" && <h2>Add Product</h2>}
     {state?.user?.role == "Seller" &&<h2>Your Product</h2>}
     </div>
   
     <div style={{width: "20%", display: 'flex', justifyContent: 'space-around',border:"1px solid red"}}>
     {state?.user?.name? <>
      {state?.user?.role == "Buyer" &&<h2>Login/Register</h2>}
      {state?.user?.role== "Buyer" && <h2>Profile</h2>}
     </>: <h2 onClick={()=>dispatch({type:"LOGOUT"})}>Logout</h2>}
     </div>
    
     </div>
  )
}

export default Navbar