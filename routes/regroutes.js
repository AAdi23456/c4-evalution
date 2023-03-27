const express=require("express")
const bycrpt=require("bcrypt")
const router=express.Router()
const regmodel=require("../models/regmode")
const loginrout=express.Router()
const jwt =require("jsonwebtoken")
router.post("/register",async(req,res)=>{
    const {name,email,gender,password,age,city,is_married}=req.body

    try {
        bycrpt.hash(password,8,async(err,hash)=>{
            const datatodb=new regmodel({name,email,gender,password:hash,age,city,is_married})
            await datatodb.save()
            res.status(200).json({"msg":'reg. completed'})
        })
    } catch (error) {
        console.log(error)
        res.status(200).json({"mag": "reg. failed"})
    }
})

loginrout.post("/login",async (req,res)=>{
    const { email,password}=req.body
    try {
        const user=await regmodel.findOne({email})
        if(user){
            console.log(user);
            bycrpt.compare(password,user.password,(err,result)=>{
                console.log(err);
                if(result){
                    console.log(result);
                    console.log(user._id)
                    res.status(200).json({"msg":"login success","token":jwt.sign({"userID":user._id},"login"
                    )})
                    
                }else{
                    res.status(4000).json({"msg":"wrong pass or email"})
                }
            })
        }
    } catch (error) {
        res.status(400).json({"msg":"please login first"})
        console.log(error);
    }

})
module.exports=[
    router,loginrout
]