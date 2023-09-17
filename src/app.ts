import express,{Request,Response} from "express";
import authRoutes from "./routes/AuthRoutes";
import userRoutes from "./routes/userRoutes";

import { PORT} from "./config";
import db from "./database/db";

const port:number=Number(PORT);
const app=express();

app.use(express.json())
app.use("/auth",authRoutes);
app.use("/user",userRoutes);


app.get("/",(req:Request,res:Response)=>{
    res.send("hello this is working");
})
db().then(()=>{

    app.listen(port,()=>{
        console.log(`Server is listening at address ${port}`)
    })
}
).catch((err)=>{
    console.log(err+"Database connection failed")
})