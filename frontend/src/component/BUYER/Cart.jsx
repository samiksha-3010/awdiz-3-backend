import React, { useContext, useEffect, useState } from 'react'
import api from '../apiConfig/index';
import { AuthContext } from '../Context/Auth.Context';


const Cart = () => {
    const [cartProducts, setCartProducts] = useState([]);
    const { state } = useContext(AuthContext)

    console.log(state,"state here")

    useEffect(() => {
        async function getCartProduct() {
            try {
                const response = await api.post('/buyer/all-cart-products', { userId: state?.user?._id })
                if (response.data.success) {
                    setCartProducts(response.data.cartProducts)
                }
            } catch (error) {
                console.log(error, "error in cart")
            }
        }
        if (state?.user?._id) {
            getCartProduct()
        }
    }, [state])


    // console.log(cartProducts, "cartProducts here")

    return (
        <div>Cart Products here...</div>
    )
}

export default Cart