import express  from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from 'cors'
import morgan from "morgan"

import { Login, Register,getCurrentUser, getNumber, sendOtp } from "./controllers/User.Controllers.js";
import{ addComments, addProduct, addRating, allProducts, deleteYourProduct, getYourProducts, updateYourProduct} from './controllers/product.Controolers.js'
import { checkSeller, isAdmin, isValidUser } from "./Meedleware/All.Meedleware.js";
import { addCart, addWishlist, getCartProducts, getWishlistProducts, removeCartProduct} from "./controllers/Buyer.Controolers.js";
import { blockProduct, blockUser, getAllBuyers, getAllProducts, getAllSellers, getBlockedProducts, getUnVerifiedProducts, getverifiedProducts, unBlockUser, unblockProduct, verifyProduct } from "./controllers/Admin.Controolers.js";



const app = express();
app.use(express.json());
dotenv.config();
app.use(cors())
app.use(morgan("dev"))

app.get("/",(req,res) => {
  res.send("working..")
})



//All
app.post("/register", Register)
app.post("/login", Login)
app.post("/get-current-user",getCurrentUser)
app.get("/all-products", allProducts)

//Buyer
app.post("/add-cart",addCart)
app.get("/get-cart-products", getCartProducts)
app.post("/add-wishlist",addWishlist)
app.get("/get-Wishlist-products",getWishlistProducts)
app.patch('/add-rating',isValidUser, addRating)
app.patch('/add-comments',isValidUser, addComments)// - assignemnt - {userId comment}


//Seller
app.post("/get-number",getNumber)
app.post("/send-otp",sendOtp)


app.post("/add-product", checkSeller, addProduct)
app.post("/get-your-products", checkSeller, getYourProducts)
app.patch("/update-your-product",checkSeller, updateYourProduct )
app.delete("/delete-your-product",checkSeller,deleteYourProduct)
app.delete("/remove-cart-product",checkSeller,removeCartProduct)

//admin

app.get('/get-all-buyers', isAdmin, getAllBuyers) // UserModel.find({role : "Buyer"}) - assignemnt
app.get('/get-all-sellers', isAdmin, getAllSellers)// UserModel.find({role : "Seller"}) - assignemnt
app.get("/get-all-products", isAdmin, getAllProducts) // ProductModel.find({}) 

app.patch("/block-user",isAdmin,blockUser)
app.patch("/unblock-user", isAdmin, unBlockUser)
app.patch("/block-product",isAdmin, blockProduct)
app.patch("/unblock-product",isAdmin, unblockProduct)
app.patch("/verify-product",isAdmin, verifyProduct)

app.patch("/get-verify-product", isAdmin, getverifiedProducts) -
app.patch("/get-un-verify-product", isAdmin, getUnVerifiedProducts) -
app.patch("/get-blocked-product", isAdmin, getBlockedProducts) 
// app.patch("/get-all-product", isAdmin, getallverifyProducts) 


mongoose.connect(process.env.Mongo_URL).then(() =>{
    console.log("connected to DB..")
})

app.listen(8000, () =>{
    console.log("Listening on port 8000")
})






