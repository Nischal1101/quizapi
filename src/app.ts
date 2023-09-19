import express,{Request,Response,NextFunction} from "express";
import authRoutes from "./routes/AuthRoutes";
import userRoutes from "./routes/userRoutes";

import { PORT} from "./config";
import db from "./database/db";
import error from "./middlewares/error";

const port:number=Number(PORT);
const app=express();

app.use(express.json())
declare global{
    namespace Express{
        interface Request{
            userId:string;
        }
    }
}
app.use("/auth",authRoutes);
app.use("/user",userRoutes);



app.get("/",(req:Request,res:Response)=>{
    res.send("hello this is working");
})
app.use(error);
db().then(()=>{

    app.listen(port,()=>{
        console.log(`Server is listening at address ${port}`)
    })
}
).catch((err)=>{
    console.log(err+"Database connection failed")
})