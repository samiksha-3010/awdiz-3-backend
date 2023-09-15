import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
    name:{
        type:String,
        require:true,
        unique:true,
    },
    email:{
        type:"String",
        require:true,
    },
    password:{
        type:"String",
        require:"true",
    },
    number:{
        type:Number,
        require:"true"
    },
    role:{
        type:"String",
        default:"Buyer",
        enum:["Buyer","Seller","Admin"]
    }
})
export default mongoose.model("User",userSchema)

// import mongoose, { Schema } from "mongoose";

// const userschema= new Schema({
// name:{
//     type:String,
//     require:true,
//     unique:true,
// },
// surname:{
//   type:String,
//    require:true,   
// },
// age: {
//     type: Number,
//     require:true
// },
// email:{
//     type: String, 
//      require:true 
// },
// password:{
//     type:String,
//      require:true  
// },
//  confirmpassword:{
//     type:String,
//      require:true 
//  }
// })
// export default mongoose.model("user",userschema)