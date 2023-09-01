import axios from 'axios';
import React, { useEffect, useState } from 'react'
import api from '../ApiConfig';
const YourProduct = () => {
    const [allProducts,setAllProducts] = useState()
    useEffect(()=>{
        async function getProducts(){
            const token = JSON.parse(localStorage.getItem("token"));
            const response = await api.post("http:localhost:8000/get-your-products",{ token})
            if(response?.data?.success){
            
                setAllProducts(response.data.products)
                 // console.log(response.data,"productdata");

            }
        }
        getProducts();
           // console.log(allProducts,"allproducs")
    },[])
  
  return (
    <div>
        <h1>Your Product</h1>
        {allProducts?.length ? <div style={{ display: "flex", justifyContent: "space-around" }}> {allProducts.map((product) => (
               <div key={product._id}>
                   <img src={product.image} />
                    <h2>Name :{product.name}</h2>      
                  <h3>Price :{product.price}</h3>
                </div>
            ))}
             </div> 
             : <div>No Products found...</div>}
       

    </div>
  )
}

export default YourProduct;





