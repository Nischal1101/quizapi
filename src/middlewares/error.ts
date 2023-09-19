import {Request,Response,NextFunction} from "express";
import logger from "../utils/logger";


const error=(err:Error,req:Request,res:Response,next:NextFunction)=>{
  //logging error. 
  logger.log({
  level: 'error',
  message: err.message
});
    res.status(500).json({msg:"Something went wrong!"})
}
export default error;