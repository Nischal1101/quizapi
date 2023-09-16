import express from "express";
import userRoutes from "./routes/userRoutes";
const port:number=3000;
const app=express();
app.use("/api/v1",userRoutes);

app.get("/",(req,res)=>{
    res.send("hello this is working");
})
app.listen(port,()=>{
    console.log(`Server is listening at address ${port}`)
})