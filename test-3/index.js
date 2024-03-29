import express from "express"
import mongoose from "mongoose"
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import { Login, Register, getCurrentUser, getNumber } from "./Controllers/User.Controllers.js"
import { AddProduct, AddRating, AllProduct, DeliteyourProduct, UpdateProduct, addComment, addToCart, allCartProduct, getAllProduct, getSingleProductData } from "./Controllers/ProductControllers.js"


const app = express()
dotenv.config();
app.use (express.json())
app.use(morgan("dev"));
dotenv.config()


app.get("/",(req,res)=>{
    res.send("Working....")
})
app.post("/register",Register)
app.post("/login",Login)
app.post("/get-current-user", getCurrentUser)

app.post("/add-product",AddProduct)
app.get("/all-product",AllProduct)
app.patch("/update-product",UpdateProduct )
app.post("/get-all-product", getAllProduct )
app.delete("/delite-your-product", DeliteyourProduct )
app.post("/add-rating",AddRating)
app.post("/get-single-product",getSingleProductData)
app.post("/add-cart",addToCart)
app.get("/all-cart-product",allCartProduct)
app.post("/get-number",getNumber)
app.post("/add-comment", addComment)

mongoose.connect(process.env.Mongo_URL).then(()=>{
    console.log("Connected DB")
})
app.listen(8000,()=>{
console.log("Listing on Port 8000")
})

//   ******************class pratice***************

// import express from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import User from "./modal/user.modal.js"
// const app = express();
// dotenv.config();
// app.use(express.json())


// app.get("/", function (req, res) {
//     res.send("Working...")
// })
// app.post("/login", function (req, res) {
//     res.send("login from login function")
// })

// app.post("/register",async function (req, res) {
//   const { name,surname,age,password,confirmpassword,email}=req.body
//   if(!name)return res.send("name is missing")
//   if(!surname)return res.send("surname is missing")
//   if(!age)return res.send("age is missing")
//   if(!password)return res.send("password is missing")
//   if(!confirmpassword)return res.send("confirm password is missing")
//   if(!email)return res.send("email is missing")
//   if(password != confirmpassword)return res.send("password and confirmpassword are not match")

//   const user = new User({
//     name:name,
//     surname:surname,
//     age,
//     password,
//     confirmpassword,

// })

  
//   await user.save()
//   res.send("registration done")
// })
//  app.get("/find", async(req,res)=> {
//     const { name } = req.body;
//     if(!name) return res.send("name is required")

//     const user = await User.find({name:name}). select ("-password")
//     console.log(  user,"users list here")
//     if(user.length){
//         return res.send(user)
//     }
//     return res.send("No User found.")

//  })

//  app.patch("/update/:id", async(req, res)=>{
//     const { age, number} = req.body;
//     const{ id } = req.params

//     if(!id) return res.send ("id is required")
//     if(!id) return res.send ("id is required")
//     if(!id) return res.send ("id is required")

//     const  updateUser = updateUser (id, { age, number }, ).select("-password")
//     return res.json({ message: "Data updated...", data: updateUser })

//  })
  
//  app.delete("/delete", async function (req,res){
// const { id } = req.query;
// if(!id) return res.send("Id is required..")

// const deletedUser = await User.findByIdAndDelete(id)
// return res.json({massage: "User deleted", data: deletedUser})
//  })

// mongoose.connect(process.env.MONGO_URL).then(() => {
//     console.log("Connected to DB..")
// })

// app.listen(8000, () => {
//     console.log("Listening on port 8000");
// })

