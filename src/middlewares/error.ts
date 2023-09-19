import {Request,Response,NextFunction} from "express";
const error=(err:Error,req:Request,res:Response,next:NextFunction)=>{
    console.log(err);
    res.status(500).json({msg:"Something went wrong!"})
}
export default error;