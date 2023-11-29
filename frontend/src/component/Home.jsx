// import React,{useContext, useEffect, useState} from 'react'
// import { AuthContext } from './Context/Auth.Context';
// import api from './apiConfig';

// const Home = () => {

//   const {state} = useContext(AuthContext);
//   const [allProducts, setAllProducts] = useState([]);
//   const [page, setPage] = useState(1);
//   const [filterByDate, setFilterByDate] = useState({ filter: "1" });
//   const [name, setName] = useState("");
 

//   const handleFilterChangeValue = (e) => {
//     setFilterByDate({ [e.target.name]: e.target.value });
//   };

//   const handleSearchChange = (e) => {
//     setName(e.target.value);
//   };

//   const incrementPage = () => {
//     setPage((prev) => prev + 1);
//   };
   
//   useEffect(() => {
//     async function getProducts() {
//       try {
       
//         const response = await api.get("/all/all-products",{ page,
//           name,
//           filterByDate});
//           // if (response.data.success)
//         if (response.status === 200) {
//           setAllProducts(response.data.products);
//         }  
//       } catch (error) {
//         console.log(error.response.data.message);
//       }
//     }
//     getProducts();
//   }, [ page,
//     name,
//     filterByDate]);
 
//   return (
//     <div className="product-style">
//       <div><h2>All Home Product</h2>{state?.user?.name}</div>
//       <div>
//           <input
//             style={{
//               height: "30px",
//               width: "200px",
//               border: "1px solid black",
//             }}
//             type="text"
//             onChange={handleSearchChange}
//           />
//         </div>

    
//       {allProducts?.length ? (
//         <div style={{ display: "flex", justifyContent: "space-around" ,flexWrap:"wrap"  }}>
//           {" "}
//           {allProducts.map((product) => (
//             <div
//               style={{
//                 border: "2px solid black",
//                 width: "210px",
//                 height: "350px",
//               }}
//               key={product._id}
//             >
//               <img
//                 style={{ width: "100%", height: "70%"}}
//                 src={product.image}
//               />
//               <h3>Name : {product.name}</h3>
//               <h3>Price : {product.price}</h3>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div>Loading...</div>
//         ///
//       )}
//         <div>
//           <button style={{backgroundColor:"black",color:"white",width:"10%",height:"40px"}} onClick={incrementPage}>Next Page</button>
//         </div>
//         <div
//           style={{
//             padding: "20px 40px",
//           }}
//         >
//           <h3>Filtering:</h3>
//           <select 
//             onChange={handleFilterChangeValue}
//             name="filter"
//             value={filterByDate.filter}
//             defaultValue="1"
//           >
//             <option value="-1">Ascending</option>
//             <option value="1">Descending</option>
//           </select>
//         </div>
//       </div>
     
//   );

// }
// export default Home;

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./Context/Auth.Context";
import api from "./apiConfig";
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const { state } = useContext(AuthContext);
  const [allProducts, setAllProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(''); 
  const productsPerPage = 2;
  const router = useNavigate();

  useEffect(() => {
    async function getProducts() {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await api.get("all/all-products", { token });
      if (response.data.success) {
        setAllProducts(response.data.Product);
      }
    }
    getProducts();
  }, [ ]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;


  const filteredProducts = allProducts?.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentProducts = filteredProducts?.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredProducts.length / productsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); 
  };

  return (
    <div>
      <div style={{ textAlign: "center" }}><h2>Welcome User</h2>: {state?.user?.name}</div>
      <div >
        <h2>All products</h2>

        <div>
       
          <input 
            type="text"
            placeholder="Search product"
          
            onChange={handleSearchChange}
          />
        </div>

        {currentProducts.length ? (
          <div style={{ display: "flex", justifyContent: "space-around" }}>  {" "}
            {currentProducts.map((product) => (
              <div onClick={() => router(`/single-products/${product._id}`)} key={product._id}   style={{
                border: "2px solid grey",
                width: "230px",
                height: "400px",
              }}>
                <div >
                  <img src={product.image} alt={product.name}  style={{ width: "100%", height: "73%" }} />
                </div>
                <p>{product.name}</p>
                <p>{product.price} $</p>
              </div>
            ))}
          </div>
        ) : (
          <div>Loding...</div>
        )}
        <div>
          <button  style={{backgroundColor:"black",color:"white",width:"10%",height:"40px"}} onClick={prevPage}>Previous Page</button>
          <button style={{backgroundColor:"black",color:"white",width:"10%",height:"40px"}} onClick={nextPage}>Next Page</button>
        </div>
      </div>
    </div>
  );
};

export default Home;