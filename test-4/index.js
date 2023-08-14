import express  from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import { Login, Register } from "./controllers/User.Controllers.js";


const app = express();
app.use(express.json());
dotenv.config();

app.get("/",(req,res) => {
  res.send("working..")
})
app.post("/register", Register)

app.post("/login", Login)

mongoose.connect(process.env.Mongo_URL).then(() =>{
    console.log("connected to DB..")
})

app.listen(3001, () =>{
    console.log("Listening on port 3001")
})






