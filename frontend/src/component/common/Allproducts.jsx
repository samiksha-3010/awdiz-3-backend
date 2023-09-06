// import React, { useEffect, useState } from "react";
// import api from "../apiConfig/index";
// import { toast } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// const Allproducts = () => {
//   const [products, setProducts] = useState();
//   const router = useNavigate();

//   console.log(products)

//   useEffect(() => {
//     async function getProducts() {
//       try {
//         const response = await api.get("/all/all-products");
//         if (response.data.success) {
//           setProducts(response.data.products);
//         }
//       } catch (error) {
//         console.log(error, "error in all prdouctd");
//         toast.error(error.response.data.message);
//       }
//     }
//     getProducts();
//   }, []);

//   return (
//     <div>
//       <h1>All Products</h1>
//       <div>
//         {products?.length ? (
//           <div
//             style={{
//               display: "flex",
//               flexWrap: "wrap",
//               justifyContent: "space-around",
//             }}
//           >
//            {products.map((pro) => (
//               <div
//                 onClick={() => router(`/singleproduct/${pro._id}`)}
//                 style={{
//                   width: "23%",
//                   height: "450px",
//                   cursor: "pointer",
//                   border: "2px solid black",
//                 }}
//                 key={pro._id}
//               >
//                 <img
//                   style={{ width: "100%", height: "300px" }}
//                   src={pro.image}
//                 />
//                 <h2>Name:{pro.name}</h2>
//                 <h4>Price:{pro.price}</h4>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div>Loading!!..</div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Allproducts;



