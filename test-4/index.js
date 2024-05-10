import express  from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from 'cors'
import morgan from "morgan"
import routesIndex from './routes/index.js'


const app = express();
app.use(express.json());
app.use(cors())
app.use(morgan("dev"))
dotenv.config();


app.get("/",(req,res) => {
  res.send("working..")
})

app.use('/api/v1', routesIndex)

mongoose.connect(process.env.Mongo_URL).then(() =>{
    console.log("connected to DB..")
})

app.listen(8000, () =>{
    console.log("Listening on port 8000")
})







