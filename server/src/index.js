import express from 'express'
import dotenv from 'dotenv'
import { UserRouter } from './routes/users.js'
import { taskRouter } from './routes/tasks.js'
import cors from 'cors'
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
app.use("/users", UserRouter)
app.use("/tasks", taskRouter)

app.listen(process.env.PORT, ()=>{
  console.log('server running at 5500')
})