import ProductModal from "../modal/ProductModal.js";
import jwt from "jsonwebtoken";
import UserModal from "../modal/UserModal.js";
import { json } from "express";

export const AddProduct = async (req,res) =>{
    try{ 
    const { name, price, image, category } = req.body
    const { token } = req.body;

    if (!name || !price || !image || !category || !token) return res.status(404).json({ success: false, message: "All fields are mandtory.." })

    const decodedData = jwt.verify(token, process.env.JWT_SECRET)

    if (!decodedData) {
        return res.status(404).json({ success: false, message: "Token not valid." })
    }

    const userId = decodedData.userId;

    const product = new ProductModal({ name, price, image, category, userId: userId });
    await product.save();

    return res.status(201).json({ success: true, message: "Product Created Successfully." })

} catch (error) {
    return res.status(500).json({ success: false, error: error.message })
}  
}

export const AllProduct = async (req,res) =>{
    try {
        const product = await ProductModal.find({})
    if(product.length){
        return res.status(200).json({success:true,product:product})
    }
    return res.status(404).json({success:false,message:"No product Found"})
        
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
        
    }
 
}

export const UpdateProduct =async  (req,res) =>{
 
        try {
            const { productId, name, image, price, category, token } = req.body;
            if (!token) return res.status(404).json({ status: "error", message: "Token is mandtory.." })
    
            const decodedData = jwt.verify(token, process.env.JWT_SECRET)
    
            if (!decodedData) {
                return res.status(404).json({ status: "error", message: "Token not valid." })
            }
    
            const userId = decodedData.userId;
    
            const updatedProduct = await ProductModal.findOneAndUpdate({ _id: productId, userId: userId }, { name, image, price, category }, { new: true })
    
            if (updatedProduct) {
                return res.status(200).json({ status: "Sucess", product: updatedProduct })
            }
            return res.status(404).json({ status: "error", message: "You are trying to update product which is not yours.." })
    
        } catch (error) {
            return res.status(500).json({ status: "error", error: error.message })
        }

}

 export const  getAllProduct  = async (req,res) =>{
    try {
        const {token} =( req.body)
      const decodedData = jwt.verify(token,process.env.JWT_SECRET)
      if(!decodedData){
        returnres.status(400).json({status:"error",message:"Token Is not Valid"})
      }
      const userId = decodedData.userId
      const AllProduct =  await ProductModal.find({userId:userId}) 
    if(AllProduct.length){
        return res.status(200).json({success:true,product:AllProduct})

      }
      return res.status(404).json({success:false,message:"No product found"})
        
    } catch (error) {
        return res.status(500).json({ status: "error", error: error.message })   
        
    }

 }
export const DeliteyourProduct =  async(req,res)=>{
        try {
            const { productId, token } = req.body;
    
            if (!productId) return res.status(404).json({ status: "error", message: "Product id is mandtory.." })
    
            const decodedData = jwt.verify(token, process.env.JWT_SECRET);
            const userId = decodedData.userId;
    
            const isDeleted = await ProductModal.findOneAndDelete({ _id: productId, userId: userId })
            if (isDeleted) {
                return res.status(200).json({ success: true, message: "Product Deleted Successfully." })
            }
    
            throw new Error("Mongodb error")
    
        } catch (error) {
            return res.status(500).json({ status: "error", error: error.message })
        }
}

 export const AddRating =  async(req,res)=>{
    try {
        const { productId,rating} = req.body

        const updatedProductRating  = await ProductModal.findByIdAndUpdate(productId,{ $push:{rating:rating}},{new:true})
        if(UpdateProduct){
             return res.status(200).json({success:true,message:"Rating added Successfull",product:updatedProductRating }) 
        }
        throw new Error ("Mongodb error")
        
    } catch (error) {
        return res.status(500).json({status:"error",error:error.message})
        
    }
 }

 export const getSingleProductData = async (req,res)=>{
    try {
        const {productId} = req.body
        if(!productId) 
        return res.status(404).json({success:false,message:"Product id is Mandotory" })
       const product = await ProductModal.findById(productId)
       if(product){
        return res.status(200).json({success:true,product})
       }
       return res.status(404).json({success:false,error:"Product Detail Is Not Found"})
    
    } catch (error) {
        return res.status(500).json({status:true,error:error.message})
        
    }
 }

 export const addToCart =  async(req,res)=>{
    try {
        const {productId,userId} = req.body
        if(!userId) return res.status(404).json({success:false,message:"userId is Mandotory"})
        if(!productId) return res.status(404).json({success:false,message:"productId is Mandotory"})
         
        const  user = await UserModal.findByIdAndUpdate(userId,{$push:{cart:productId}})
        if(!user) return res.status(404).json({success:false,message:"User Not a found"})

        return res.status(200).json({success:true})
        
    } catch (error) {
        return res.status(500).json({status:true,error:error.message})
        
    }
 }

 export const  allCartProduct = async (req,res) =>{
  try {
    const {userId} = req.body
    if(!userId) return res.status({success:false,message:"UserId is Mandtory"})
    const user = await UserModal.findById(userId)
if(!user)return res.status(404).json({success:false,message:"user not Found"})
var finalData = []
var array = user?.cart;
for (var i = 0;i< array?.length; i++){
    const productData = await ProductModal.findById(array[i])
    if(productData){
        finalData.push(productData)
    }
}
return res.status(200).json({success:true,allCartProduct:finalData})
  } catch (error) {
    return res.status(500).json({success:false,error:message.error})
    
  }
 }


 export  const  addComment =  async(req,res)=>{
try {
    const {productId,token,comment} = req.body
    const decodedData = jwt.verify(token,process.env.JWT_SECRET)
    if(!decodedData) {
        return res.status(400).json({success:false,message:"Token not Valid"})
    }
    const userId = decodedData.userId
    const user =  await UserModal.findById(userId)
    const UpdateProductComment = await ProductModal .findByIdAndUpdate(productId,{$push:{comment:{comment:comment,name:user.name}}},{new:true})
  if(UpdateProductComment){
    return res.status(200).json({success:"true",message:"Comment Addaed Success",product:"UpdateProductComment"})
  }
  throw new Error ("MongoDb Erorr")
    
} catch (error) { 
    return res.status(500).json({success:false,error:error.message})
}
 }
