import React, { useEffect, useState } from "react";
import api from "../apiConfig/index";
// import { toast } from "react-hot-toast";
// import { response } from "express";

const YourProducts = () => {
  const [allProducts, setAllProducts] = useState();
  useEffect(() => {
    async function getProducts() {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const response = await api.post("/seller/get-your-products", { token });
        if (response.data.success) {
          setAllProducts(response.data.products);
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    }
    getProducts();
  }, []);
  return (
    <div>
      <h1>Your Products Here ...</h1>

      {allProducts?.length ? (
        <div style={{ display: "flex", justifyContent: "space-around" ,flexWrap:"wrap"  }}>
          {" "}
          {allProducts.map((product) => (
            <div
              style={{
                border: "2px solid black",
                width: "210px",
                height: "350px",
              }}
              key={product._id}
            >
              <img
                style={{ width: "100%", height: "70%"}}
                src={product.image}
              />
              <h3>Name : {product.name}</h3>
              <h3>Price : {product.price}</h3>
            </div>
          ))}
        </div>
      ) : (
        <div>No Products found!</div>
      )}
    </div>
  );
};

export default YourProducts;