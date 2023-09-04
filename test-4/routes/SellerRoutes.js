import express from 'express';
import { addProduct, deleteYourProduct, getYourProducts, updateYourProduct } from '../controllers/product.Controolers.js';
import { checkSeller } from '../Meedleware/All.Meedleware.js';


const router = express.Router();

router.post('/add-product',addProduct)
router.post("/get-your-products",getYourProducts)
router.patch("/update-your-product",updateYourProduct)
router.delete("/delete-your-product",deleteYourProduct)

export default router;