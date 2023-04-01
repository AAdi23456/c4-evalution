const mongoose=require("mongoose")

const regschema=mongoose.Schema({
   firstname : String,
    secondname:String,
    phoneno:String,
email : {type:String,required:true,unique:true},

password : String,

userID:String
},{
versionKey:false
})
const usermodel=mongoose.model("Reg",regschema)
module.exports=usermodel
