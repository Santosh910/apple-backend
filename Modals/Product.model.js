import mongoose, { Schema } from "mongoose";

const product = new Schema({
    title1:String,
    title2:String,
    image:String,
    Emi:String,
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
        
    
},{
    timestamps:true
})

export default mongoose.model('Product',product)