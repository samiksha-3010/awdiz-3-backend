import express  from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import { Login, Register,getCurrentUser } from "./controllers/User.Controllers.js";
import{ addProduct, allProducts, getYourProducts, updateYourProduct} from './controllers/product.Controolers.js'
import { checkSeller } from "./Meedleware/SelllerMeedleware.js";


const app = express();
app.use(express.json());
dotenv.config();

app.get("/",(req,res) => {
  res.send("working..")
})
app.post("/register", Register)

app.post("/login", Login)

app.post("/get-current-user",getCurrentUser)

app.post("/add-product", checkSeller, addProduct)
 

app.get("/all-products", allProducts)

app.get("/get-your-products", checkSeller, getYourProducts)

app.patch("/update-your-product",checkSeller, updateYourProduct )



mongoose.connect(process.env.Mongo_URL).then(() =>{
    console.log("connected to DB..")
})

app.listen(8000, () =>{
    console.log("Listening on port 8000")
})






