import express from 'express';
import { addProduct, deleteYourProduct, getYourProducts, updateYourProduct } from '../controllers/product.Controolers.js';
import { checkSeller } from '../Meedleware/All.Meedleware.js';


const router = express.Router();

router.post('/add-product', checkSeller, addProduct)
router.post("/get-your-products", checkSeller, getYourProducts)
router.patch("/update-your-product", checkSeller, updateYourProduct)
router.delete("/delete-your-product", checkSeller, deleteYourProduct)

export default router;