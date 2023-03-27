const express=require("express")
const bycrpt=require("bcrypt")
const rrouter=express.Router()
const postmodel=require("../models/postmodel")
const postrout=express.Router()
const jwt =require("jsonwebtoken")
const update_rout=express.Router()
const delete_rout=express.Router()
const top=express.Router()
postrout.post("/add",async(req,res)=>{
    const data=req.body
    console.log(data);
    try {
        const datatodb=new postmodel(data)
        await datatodb.save()
        res.status(200).json({"msg":"post uploaded successfully"})

    } catch (error) {
        console.log(error);
        res.status(400).json({"msg":error})
    }
})

rrouter.get("/",async(req,res)=>{
   const{page,device,min,max}=req.query
   const perpage=3
   const skip=(+page-1)*perpage

    
    const token=req.headers.authorization
    const decode=jwt.verify(token,"login")
    const filter={}
    if(device){
        filter.device=device
    }
    if(min){
        filter.min=min
    }
    if(max){
        filter.max=max
    }
    if(filter){
    if(decode){
        const posts=await postmodel.find({
            userID:decode.userID//,filter
        }).skip(skip).limit(perpage)
        res.status(200).json(posts)
    }else{
        res.status(404).json({"msg":"No posts found"})
    }
}
})
update_rout.patch("/update/:id",async(req,res)=>{
//we will get the id with help frontend localstorage
const newdata=req.body
const token=req.headers.authorization
const decode=jwt.verify(token,"login")
try {
    if(decode.userID){
        const{ID}=req.params
        const data=await postmodel.findByIdAndUpdate(ID,newdata,{new:true})
        await data.save()
        res.status(200).json({"msg":" post updated"})
    }else{

    }res.status(404).json({"msg":"login first"})
} catch (error) {
    res.status(404).json({"msg":"login first"})
    console.log(error);
}
})
delete_rout.delete("/delete/:id",async(req,res)=>{
    const token=req.headers.authorization
    try {
        const decode=jwt.verify(token,"login")
        if(decode.userID){
            const{id}=req.params
            const data=await postmodel.findByIdAndDelete(id)
            await data.save()
            res.status(200).json({"msg":" data deeletd"})
        }else{
            res.status(400).json({"msg":" login first"})
        }

    } catch (error) {
        console.log(error);
        res.status(404).json({"msg":"login first"})
    }
})
top.get("/top",async(req,res)=>{
    try {
        const token=req.headers.authorization
const decode=jwt.verify(token,"login")
const data=await postmodel.find({userID:decode.userID}).sort({no_of_comments:1}).toArray()
res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(404).json({"msg":"no data found"})
    }
})

module.exports=[postrout,rrouter,update_rout,delete_rout,top]