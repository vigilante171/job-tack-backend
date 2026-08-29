import express from 'express'
import authRoutes from '../src/routes/auth.routes.js'
import cors from 'cors'
import helmet from 'helmet'
const app=express()
app.use(express.json())
app.use(helmet())
app.use(cors())
app.get("/api/v1/health",(rea,res)=>{
    res.status(200).json({
        success : true ,
        message:"Job tracker api is running "
    })
})
app.use("api/vi/auth" , authRoutes)
export default app;