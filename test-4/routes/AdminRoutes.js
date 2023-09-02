
import express from 'express';
import { isAdmin } from '../Meedleware/All.Meedleware.js';
import { blockProduct, blockUser, getAllBuyers, getAllProducts, getAllSellers, getBlockedProducts, getUnVerifiedProducts, getverifiedProducts, unBlockUser, unblockProduct, verifyProduct } from '../controllers/Admin.Controolers.js';


const router = express.Router();

 router.get('/get-all-buyers', isAdmin, getAllBuyers) // UserModel.find({role : "Buyer"}) - assignemnt
router.get('/get-all-sellers', isAdmin, getAllSellers)// UserModel.find({role : "Seller"}) - assignemnt
 router.get("/get-all-products", isAdmin, getAllProducts) // ProductModel.find({}) - assignemnt
router.patch("/block-user", isAdmin, blockUser)
router.patch("/unblock-user", isAdmin, unBlockUser)
router.patch("/block-product", isAdmin, blockProduct)
router.patch("/un-block-product", isAdmin, unblockProduct)
router.patch("/verify-product", isAdmin, verifyProduct)
 router.patch("/get-verify-product", isAdmin, getverifiedProducts) // assignemnt
 router.patch("/get-un-verify-product", isAdmin, getUnVerifiedProducts) // assignemnt
 router.patch("/get-blocked-product", isAdmin, getBlockedProducts) // assignemnt

export default router;