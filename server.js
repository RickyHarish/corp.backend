import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import colors from 'colors'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import morgan from 'morgan'
import cors from 'cors';

import { errorHandler, notFound } from './middleware/errorMiddleware.js'

dotenv.config()
connectDB()
const app = express()

app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

app.use(express.json())


app.use('/api/users', userRoutes)

app.use('/api/orders', orderRoutes)

app.use('/api/products', productRoutes)

app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res)=>(res.send(process.env.PAYPAL_CLIENT_ID)))

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))


if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/front-end/build')))
    app.get('*', (req, res)=>res.sendFile(path.resolve(__dirname, 'front-end', 'build', 'index.html')))
}else{
    app.get('/', (req, res)=>{
        res.send("API is Running...")
    })
    
}


app.use(notFound)

app.use(errorHandler)


const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server Running in ${process.env.NODE_ENV} mode on Port ${PORT}`.yellow.bold))
