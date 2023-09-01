import express from 'express';
import { addComments, addRating } from '../controllers/product.Controolers';
import { addCart, addWishlist, getCartProducts, getWishlistProducts, removeCartProduct } from '../controllers/Buyer.Controolers.js';


const router = express.Router();

router.patch('/add-rating', isValidUser, addRating)
router.patch('/add-comments',isValidUser, addComments) // - assignemnt - {userId comment}
router.post("/add-wishlist", addWishlist)
router.get("/get-wishlist-products", getWishlistProducts)

router.post("/add-cart", addCart)
router.get("/get-cart-products", getCartProducts)


router.delete("/remove-cart-product", removeCartProduct) , {productId, userId}


export default router;