const jwt=require("jsonwebtoken")
const express=require("express")
const auth=(req,res,next)=>{
    const token =req.headers.authentication
    // dont use bearer for authorization
    console.log(req);
    console.log(token)
    if(token){
        const decode=jwt .verify(token,"login")
        console.log(token);
        if(decode){
            req.body.userID=decode.userID
            console.log(decode);
            next()
        }else{
            res.status(400).json({"msg":"please logion first"})
        }
    }else{
            res.status(400).json({"msg":"please logion first"})
        }
    }
module.exports=auth