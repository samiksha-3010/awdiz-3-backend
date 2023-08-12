import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from "./modal/user.modal.js"



const app = express();
dotenv.config();
app.use(express.json())

app.get("/", function (req, res) {
    res.send("Working...")
})
app.post("/login", function (req, res) {
    res.send("login from login function")
})
app.post("/register",async function (req, res) {
  const { name,surname,age,password,confirmpassword,email}=req.body
  if(!name)return res.send("name is missing")
  if(!surname)return res.send("surname is missing")
  if(!age)return res.send("age is missing")
  if(!password)return res.send("password is missing")
  if(!confirmpassword)return res.send("confirm password is missing")
  if(!email)return res.send("email is missing")
  if(password != confirmpassword)return res.send("password and confirmpassword are not match")

  const user = new User({
    name:name,
    surname:surname,
    age,
    password,
    confirmpassword,
})



  await user.save()
  res.send("registration")
})




mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to DB..")
})



app.listen(8000, () => {
    console.log("Listening on port 8000");
})