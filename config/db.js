import mongoose from "mongoose";
import orderModel from '../models/oderModel.js'
import userModel from '../models/userModel.js'
import productModel from '../models/productModel.js'

const username = encodeURIComponent("Harish");
const password = encodeURIComponent("abcd1234");

const URL = `mongodb+srv://${username}:${password}@artists.tgfc6jz.mongodb.net/?retryWrites=true&w=majority&appName=Artists` || process.env.MONGO_URI

const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(URL)
        console.log(`MongoDB Connected: ${ conn.connection.host}`.cyan.underline)
        await orderModel.createIndexes()
        await userModel.createIndexes()
        await productModel.createIndexes()
        
    } catch(error){
         console.log(`Error:${error.message}`.red.underline.bold)
         process.exit(1)
    }
}

export default connectDB