import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

// Middleware
app.use(cors())
app.use(express.json())

// Health check route
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'FocusFlow API is running' })
})

// TODO: Import and use routes from ./routes

app.listen(PORT, () => {
    console.log(`FocusFlow API listening on port ${PORT}`)
})
