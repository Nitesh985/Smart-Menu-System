import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'



const app = express()

app.use(cors({
    origin:process.env.CORS_ORIGIN
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static('public'))

app.use(cookieParser())


// routes
import dishRouter from './routes/dish.routes.js'
import orderRouter from './routes/order.routes.js'
import categoryRouter from './routes/category.routes.js'
import paymentRouter from './routes/payment.routes.js'
import tableRouter from './routes/table.routes.js'


app.use("/api/v1/dishes", dishRouter)
app.use("/api/v1/orders", orderRouter)
app.use("/api/v1/categories", categoryRouter)
app.use("/api/v1/payment", paymentRouter)
app.use("/api/v1/tables", tableRouter)
app.use("/api/v1/test", (req,res)=>{
    return res.status(200).json({
        message:"Everything is okay",
        status:200
    })
})



export default app