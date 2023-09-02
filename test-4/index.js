import express  from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from 'cors'
import morgan from "morgan"
import jwt from 'jsonwebtoken';
import routesIndex from './routes/index.js'


const app = express();
app.use(express.json());
dotenv.config();
app.use(cors())
app.use(morgan("dev"))

app.get("/",(req,res) => {
  res.send("working..")
})




function checkJwt(req, res, next) {
  const fullToken = req.headers.authorization
  console.log(fullToken, "fullToken")
  if (fullToken?.length > 12) {
      const token = fullToken.split(" ")[1];
      if (token != null) {
          try {
              console.log(token, "token at middleware")
              const decoededData = jwt.verify(token, process.env.JWT_SECRET);

              const expTime = decoededData?.exp;
              const currentTimestamp = Math.floor(Date.now() / 1000);
              console.log(expTime, currentTimestamp, "expTime at middleware")
              if (currentTimestamp > expTime) {
                  return res.status(404).json({ success: false, message: "session is over, please login again." })
              }
              next();
          } catch (error) {
              console.log(error, "after error at exp")
              return res.status(500).json({ success: false, message: "Token is expired." })

          }
      }
  }
  next();
}

app.use('/api/v1', routesIndex)

mongoose.connect(process.env.Mongo_URL).then(() =>{
    console.log("connected to DB..")
})

app.listen(8000, () =>{
    console.log("Listening on port 8000")
})






