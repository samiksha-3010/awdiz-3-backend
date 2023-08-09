import express from "express"
import mongoose from "mongoose"
import { Register, login } from "./controller/User.controller.js"
 const app = express()
 app.get("/",function(req, res){
    res.send("Welocme to backend")
 })

 app.get("/login",login)
 app.get("/Register",Register)
 mongoose.connect("mongodb+srv://samiksha:samiksha123@cluster0.vob2no7.mongodb.net/awdiz-3-backend")
 .then (()=>console.log("connect to monogodb")) .catch((error)=>{
    console.log("error was conecting monogodb",error)
 })
 app.listen(8000,() => {
    console.log("server listing on port 8000")
 })
 