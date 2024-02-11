import UserModal from '../Modals/User.model.js'
import bcrypt from 'bcrypt'
import Jwt from 'jsonwebtoken'


export const Register = async (req,res)=>{
    try{
        const{name,number,email,password} = req.body.userData;
        if(!name || !number || !email || !password )return res.status(401).json({success:false,message:"all field are mandotory"})

         const hashedPassword = await bcrypt.hash(password,10)
        const user = new UserModal({
            name,number,email,password:hashedPassword
        })
        await user.save()

        return res.status(200).json({success:true,message:"apple id created succefully"})
    }catch(error){
        return res.status(500).json({success:false,message:error})
    }
}

export const Login = async (req,res)=>{
    try{
        const{email} = req.body.userData;
        if( !email )return res.status(401).json({success:false,message:"email not register"})

         
        const user = await UserModal.findOne({email:email})
        if(!user)return res.status(401).json({success:false,message:"email not register"})

        const token = await Jwt.sign({id:user._id},process.env.JWT_SECRETE)

        return res.status(200).json({success:true,message:"apple id created succefully",user:{name:user.name,id:user.id},token})
    }catch(error){
        return res.status(500).json({success:false,message:error})
    }
}

export const getCurrentUser = async (req, res) => {
    try{
       const{token} = req.body;
 
       if(!token) return res.status(401).json({success:false,message:"id not found"})
 
       const {id} = await Jwt.verify(token,process.env.JWT_SECRETE)
 
       const user = await UserModal.findById(id);
       if(!user)return res.status(401).json({success:false,message:"id not found"})
 
       
 
       return res.status(200).json({success:true,message:"user found",user:{name:user.name,id:user._id}})
    }catch(error){
       return res.status(500).json({success:false,message:error})
    }
 }