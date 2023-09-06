import React,{useContext, useEffect, useState} from 'react'
import { AuthContext } from './Context/Auth.Context';
import Allproducts from './common/Allproducts';
import api from './apiConfig';

const Home = () => {
  const {state} = useContext(AuthContext);
  const [allProducts, setAllProducts] = useState();
  useEffect(() => {
    async function getProducts() {
      try {
      
        const response = await api.get("/all/all-products");
        if (response.data.success) {
          setAllProducts(response.data.products);
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    }
    getProducts();
  }, []);

  // console.log(state?.user,"-user")

  return (
    <div className="product-style">
      <div>Home Page{state?.user?.name}</div>
 

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
        <div>Loading...</div>
      )}
    </div>
  );

}
export default Home;