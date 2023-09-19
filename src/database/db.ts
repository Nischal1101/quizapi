import mongoose from "mongoose"
import {CONNECTION_STRING} from "../config"
import logger from "../config/logger"
const db=async()=>
{

const conn=await mongoose.connect(CONNECTION_STRING!)
logger.info("Database connected successfully",{service:"Database service"})
return conn;
}
export default db;