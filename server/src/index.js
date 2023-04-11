import express from 'express'
import dotenv from 'dotenv'
import { UserRouter } from './routes/users.js'
dotenv.config()

const app = express()
app.use(express.json())
app.use("/users", UserRouter)
app.use("/tasks", UserRouter)

app.listen(process.env.PORT, ()=>{
  console.log('server running at 5500')
})