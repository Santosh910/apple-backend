import UserModel from "../Modals/User.model.js";

export const checkId = async (req,res,next)=>{
    try{
          const {id} =req.body;
          const user = await UserModel.findById(id)
          if(user){
            next()
          }else{
            return res.status(404).json({success:false,message:"user not found"})
          }
    }catch(error){
        return res.status(500).json({success:false,message:error})
    }
}