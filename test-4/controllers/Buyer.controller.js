import ProductModal from "../modal/Product.Modal.js";
import User from "../modal/User.js";
import jwt from "jsonwebtoken";

export const addCart = async (req, res) => {
    try {
        const { token, productId } = req.body;
        if (!token || !productId) throw new Error("Token and product id is requir.")

        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedData?.userId;

        const user = await User.findById({ _id: userId })

        user?.cart.push(productId);

        await user.save();

        return res.status(200).json({ success: true, user: user })

    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message })
    }
}
export const getCartProducts = async (req, res) => {
    try {
        const { token } = req.body;

        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedData?.userId;

        const user = await User.findById(userId)


        if (user) {
            var finalData = [];
            for (var i = 0; i < user.cart.length; i++) {
               
                const product = await ProductModal.findById(user.cart[i])
                if (product) {
                    finalData.push(product)
                }
            }
            return res.status(200).json({ success: true, products: finalData })
        }
        throw new Error("User not found.")

    } catch (error) {
        return res.status(500).json({ status: "error", message: error })
    }
}


export const addWishlist = async (req, res) => {
    try {
        const { token, productId } = req.body;
        if (!token || !productId) throw new Error("Token and product id is requir.")

        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedData?.userId;

        const user = await User.findById({ _id: userId })

        user?.wishlist.push(productId);

        await user.save();

        return res.status(200).json({ success: true, user: user })

    } catch (error) {
        return res.status(500).json({ status: "error", message: error })
    }
}



export const getWishlistProducts = async (req, res) => {
    try {
        const { token } = req.body;

        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedData?.userId;

        const user = await User.findById(userId)
        if (user) {
            var finalData = [];
            for (var i = 0; i < user.wishlist.length; i++) {
             
                const product = await ProductModal.findById(user.wishlist[i])
                if (product) {
                    finalData.push(product)
                }
            }
            return res.status(200).json({ success: true, products: finalData })
        }
        throw new Error("User not found.")

    } catch (error) {
        return res.status(500).json({ status: "error", message: error })
    }
}

export  const removeCartProduct  = async (req, res) =>{
    try{

        const {productId,token} = req.body;
        if(!productId || !token)  throw new Error("Product Id and token Mendtory")

        const decodedData = jwt.verify(token,process.env.JWT_SECRET);
        const userId = decodedData.userId;

        const user= await  User.findById({_id:userId})
        const cart = user?.cart

        const  removeCartProductProductId = cart.indexOf(productId)
        cart.splice( removeCartProductProductId, 1)

        await user.save()
        return res.status(200).json({success: true, user: User })
    }catch (error) {
    
            return res.status(500).json({status:error, message: error.message})
        }
 }










        
 














