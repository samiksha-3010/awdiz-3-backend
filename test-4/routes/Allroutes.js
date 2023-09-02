import express from 'express';
import { Login, Register, getCurrentUser, getNumber, sendOtp, verifyOtp, } from '../controllers/User.Controllers.js';
import { allProducts } from '../controllers/product.Controolers.js';

const router = express.Router();


router.post("/register", Register)
router.post("/login", Login)
router.post('/get-current-user', getCurrentUser)
router.post("/get-number", getNumber)
router.get("/all-products", allProducts);
router.post("/send-otp", sendOtp)
router.post("/verify-otp", verifyOtp)


export default router;