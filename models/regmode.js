const mongoose=require("mongoose")

const regschema=mongoose.Schema({
    name : String,
email : {type:String,required:true,unique:true},
gender :String,
password : String,
age : Number,
city : String,
is_married : Boolean,
userID:String
},{
versionKey:false
})
const usermodel=mongoose.model("Reg",regschema)
module.exports=usermodel