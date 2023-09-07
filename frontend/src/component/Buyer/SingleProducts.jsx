import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../apiConfig/index';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../Context/Auth.Context';
import axios from 'axios';


const SingleProduct  = () => {
    const [singleProductData, setSingleProductData] = useState({});
    const { id } = useParams();
    
    //  console.log(singleProductData)

    const { state } = useContext(AuthContext)


    useEffect(() => {
        if (id) {
            async function getSingleProductData() {
                try {
                    const response = await api.post('/buyer/get-single-product-data', { productId: id })
                    if (response.data.success) {
                        setSingleProductData(response.data.product)
                    }
                } catch (error) {

                }
            }
            getSingleProductData()
        }
    }, [id])

    // console.log(singleProductData, "singleProductData")

    async function addToCart(productId) {
        console.log(productId, "singleProductData")
        try {
            const response = await api.post('/buyer/add-to-cart', { productId, userId: state?.user?._id });
            console.log(response.data,"gfdfdf")
            if (response.data.success) {
                console.log(response.data.success,"gfdfdbnnvvf")
                setSingleProductData(response.data.products)
               
                toast.success("Product added successfully to cart.")
            }
        } catch (error) {
            toast.error("Internal server error, please try again...")
        }
    }

    return (
        <div>
            {singleProductData?.name ? <div style={{ display: 'flex', justifyContent: 'space-around' }}>

                <div style={{ width: "45%", height: "600px", border: "2px solid red" }}>
                    <img style={{ width: "100%", height: "100%" }} src={singleProductData.image} alt='img' />
                </div>
                <div style={{ width: "45%", height: "600px" }}>
                    <h1>{singleProductData.name}</h1>
                    <h3>Price : {singleProductData.price}</h3>
                    <h3>Category : {singleProductData.category}</h3>
                    <button onClick={() => addToCart(singleProductData._id)}  style={{width:"20%",height:"40px",backgroundColor:"red"}}>Add to cart</button>
                </div>

            </div> : <div>Loading....</div>}
        </div>
    )
}

export default SingleProduct