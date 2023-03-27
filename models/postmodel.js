const mongoose=require("mongoose")
const regschema=mongoose.Schema({
    title : String,
    body : String,
    device: String,
    no_of_comments: Number,
    userID:String
    
})
const postmodel=mongoose.model("posts",regschema)
module.exports=postmodel
