import mongoose from "mongoose"
import {CONNECTION_STRING} from "../config"
const db=async()=>
{
  
const conn=await mongoose.connect(CONNECTION_STRING!)
console.log("Database connected successfully")
return conn;
}
export default db;