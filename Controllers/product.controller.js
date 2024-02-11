import ProductModel from "../Modals/Product.model.js";

export const addProduct = async (req,res)=>{
    try{
        const{ title1,title2,image,Emi,id} = req.body;
        if(!title1 || !title2 || !image || !Emi)return res.status(401).json({success:false,message:"all fields are mandotory"})
        
        const product = new ProductModel({
            title1,title2,image,Emi,userId:id
        })
        await product.save()

        return res.status(200).json({success:true,message:"product added successfully"})

    }catch(error){
        return res.status(500).json({success:false,message:error})
    }
}