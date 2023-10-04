import React, { useEffect, useState } from "react";
import api from "../apiConfig/index";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Allproducts = () => {
  const [products, setProducts] = useState();
  const [page, setPage] = useState(1)
  const router = useNavigate();
  

  
  // const selectPageHandler = (selectedPage) => {
  //   if (selectedPage >= 1 && selectedPage <= products.length / 10 && selectedPage !== page) {
  //     setPage(selectedPage)
  //   }
  // }



  useEffect(() => {
    async function getProducts() {
      try {
        const response = await api.get("/all/all-products");

        console.log(response);
        // if (response.data.success)
        if (response.status === 200) {

          setProducts(response.data.products);
        }
      } catch (error) {
        console.log(error, "error in all prdouctd");
        toast.error(error.response.data.message);
      }
    }
    getProducts();
  }, []);

  // console.log(products)

  return (
    <div>
    
      <h1>All Products</h1>
      <div>
        {products?.length ? (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
           {products.map((pro) => (
              <div
                onClick={() => router(`/singleproduct/${pro._id}`)}
                style={{
                  width: "23%",
                  height: "450px",
                  cursor: "pointer",
                  border: "2px solid black",
                }}
                key={pro._id}
              >
                <img
                  style={{ width: "100%", height: "300px" }}
                  src={pro.image}
                />
                <h2>Name:{pro.name}</h2>
                <h4>Price:{pro.price}</h4>
              </div>
            ))}
          </div>
        ) : (
          <div>Loading!!..</div>
        )}

        {/* pagination */}

{/* {products.length > 0 && <div className="pagination">
        <span onClick={() => selectPageHandler(page - 1)} className={page > 1 ? "" : "pagination__disable"}>◀</span>

        {[...Array(products.length / 10)].map((_, i) => {
          return <span key={i} className={page === i + 1 ? "pagination__selected" : ""} onClick={() => selectPageHandler(i + 1)}>{i + 1}</span>
        })}

        <span onClick={() => selectPageHandler(page + 1)} className={page < products.length / 10 ? "" : "pagination__disable"}>▶</span>
      </div>} */}


      </div>
    </div>
  );
};

export default Allproducts;



