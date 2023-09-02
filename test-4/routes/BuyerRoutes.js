import express from 'express';
import { addComments, addRating, allCartProducts, getSingleProductData } from '../controllers/product.Controolers.js';
import { addCart, addWishlist, getCartProducts, getWishlistProducts, removeCartProduct } from '../controllers/Buyer.controller.js';
import { isValidUser } from '../Meedleware/All.Meedleware.js';


const router = express.Router();

router.patch('/add-rating', isValidUser, addRating)
router.patch('/add-comments',isValidUser, addComments) // - assignemnt - {userId comment}
router.post("/add-wishlist", addWishlist)
router.get("/get-wishlist-products", getWishlistProducts)
router.post("/add-cart", addCart)
router.get("/get-cart-products", getCartProducts)
router.delete("/remove-cart-product", removeCartProduct)
// *********


router.post("/get-single-product-data", getSingleProductData)
router.post('/all-cart-products', allCartProducts)  


export default router;