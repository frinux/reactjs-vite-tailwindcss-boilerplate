import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import tasksRouter from './routes/tasks.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'FocusFlow API is running' })
})

// Tasks API
app.use('/api/tasks', tasksRouter)

app.listen(PORT, () => {
    console.log(`FocusFlow API listening on port ${PORT}`)
})
