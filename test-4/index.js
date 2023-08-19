import express  from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import { Login, Register,getCurrentUser } from "./controllers/User.Controllers.js";
import{ addProduct, allProducts, deleteYourProduct, getYourProducts, updateYourProduct} from './controllers/product.Controolers.js'
import { checkSeller } from "./Meedleware/SelllerMeedleware.js";
import { addCart, addWishlist, getCartProducts, getWishlistProducts, removeCartProduct } from "./controllers/Buyer.Controolers.js";


const app = express();
app.use(express.json());
dotenv.config();

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


 
//Seller

app.post("/add-product", checkSeller, addProduct)
app.get("/get-your-products", checkSeller, getYourProducts)
app.patch("/update-your-product",checkSeller, updateYourProduct )
app.delete("/delete-your-product",checkSeller,deleteYourProduct)
app.delete("/remove-cart-product",checkSeller,removeCartProduct)







mongoose.connect(process.env.Mongo_URL).then(() =>{
    console.log("connected to DB..")
})

app.listen(8000, () =>{
    console.log("Listening on port 8000")
})






