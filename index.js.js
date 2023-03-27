const express=require("express")
const [router,loginroute]=require("./routes/regroutes")
const connect=require("./connection")
const [postrout,rrouter,update_rout,delete_rout,top]=require("./routes/postroutes")
const auth=require("./middlewares/authmiddlewares")
const app=express()
app.use(cors())
app.use(express.json())
app.use("/users",router)
app.use("/users",loginroute)
app.use("/posts",rrouter)
app.use("/posts",update_rout)
app.use("/posts",delete_rout)
app.use("/posts",top)
app.use(auth)
app.use("/posts",postrout)

app.listen(3000,()=>{
    try {
        connect()
        console.log("connected to db");
    } catch (error) {
        console.log(error);
    }
})
