require('dotenv').config()

import express from 'express'
import http from 'http'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import mongoose from 'mongoose'

const eventsController = require('./controllers/eventsController')

const port = process.env.PORT || 5500

const app = express()

app.use(
  cors({
    credentials: true
  })
)

app.use(express.json())
app.use(compression())
app.use(cookieParser())

app.use('/getEvents', eventsController.getEvents)
app.use('/getEventsById', eventsController.getEventById)

const server = http.createServer(app)

server.listen(port, () => {
  console.log(`server running at PORT:${port}`)
})

mongoose.connect(process.env.MONGO_URL)
mongoose.connection.on('error', (error: Error) => console.log(error))
