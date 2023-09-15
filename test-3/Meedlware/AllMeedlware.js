import UserModal from "../modal/UserModal.js"

export const checkSeller = async (req,res)=>{
   try {
    const {token} = req.body
    if(!token)
    return res.status(404).json({success:false,message:"Token Is Mandotory"})
    
    const decodedData = jwt.verify(token,process.env.JWT_SECRET)
    if(!decodedData){
        return res.status(404).json({success:false,message:"Token Is not Valid"})
    }

    const userId = decodedData.userId

    const user = await UserModal.findById(userId)
    if(!user || user?.role != "Seller"){
        return res.status(404).json({success:false,message:"User nOT valid from add product for meedlware"})
    }
   } catch (error) {
    return res.status(400).json({ error:message.error,success:false})
    
   } 
}