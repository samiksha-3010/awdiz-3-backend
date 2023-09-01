import express from 'express';
import  allProducts  from '../controllers/Product.controllers.js';
import { Login, Register, getCurrentUser, getNumber, sendOtp, verifyOtp, } from '../controllers/User.Controllers.js';

const router = express.Router();


router.post("/register", Register)
router.post("/login", Login)
router.post('/get-current-user', getCurrentUser)
router.post("/get-number", getNumber)
app.get("/all-products", allProducts);
router.post("/send-otp", sendOtp)
app.post("/verify-otp", verifyOtp)


export default router;