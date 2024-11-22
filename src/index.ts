require('dotenv').config()

import express from 'express'
import http from 'http'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import mongoose from 'mongoose'
const eventsController = require('./controllers/eventsController')

const port = process.env.PORT || 4500

const app = express()

app.use(
  cors({
    credentials: true
  })
)

app.use(express.json())
app.use(cookieParser())
app.use(express.static('assets'))

app.use('/getEvents', eventsController.getEvents)
app.use('/getEventById', eventsController.getEventById)

const server = http.createServer(app)

server.listen(port, () => {
  
  console.log(`server running at PORT:${port}`)
})
mongoose.connect(process.env.MONGO_URL)
mongoose.connection.on('error', (error: Error) => console.log(error))

/*  "start": "node dist/index.js"
  "main": "dist/index.js",
  "types": "dist/index.js.map" */