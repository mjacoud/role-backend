import { Request, Response } from 'express'

import { EventModel } from '../Models/events'

const asyncHandler = require('express-async-handler')

export interface EventQuery {
  category?: string
  price?: {
    $eq?: number
    $lte?: number
    $gt?: number
  }
  startDate?: {
    $gte?: string
    $lte?: string
  }
  endDate?: {
    $gte?: string
    $lte?: string
  }
  coordenates?: {
    $geoWithin?: {
      $centerSphere: [number, number]
    }
  }
}

//@desc Get Events by Search params
//@route POST /events
//@acess Private

const getEvents = asyncHandler(async (req: Request, res: Response) => {
  const { category, startDate, endDate, price, radius, coordenates } = req.body
  
  
  let query: EventQuery = {}

  if (category) {
    query.category = category
  }
  
  if (price == 0) {
    query.price = { $eq: parseInt(price) }
  }
  if (price > 0) {
    query.price = { $lte: parseInt(price), $gt: 0 }
  }

  if (startDate && endDate) {
    query.startDate = {
      $gte: startDate,
      $lte: endDate
    }
    query.endDate = { $gte: startDate, $lte: endDate }
  }
  
  if (coordenates) {
    query.coordenates = {
      $geoWithin: {
        $centerSphere: [coordenates, radius / 3963.2]
      }
    }
  }
  
  const events = await EventModel.find(query).lean().exec()
  
  console.log(events)

  if (!events) {
    return res.status(400).json({ message: 'No Event Found' })
  }


  res.json(events)
})

//@desc Get Event By Id
//@route POST /eventById
//@acess Private

const getEventById = asyncHandler(async (req: Request, res: Response) => {
  const { eventId } = req.body
  
  const event = await EventModel.findById(eventId).lean()

  if (!event) {
    return res.status(400).json({ message: 'Nenhum evento foi encontrado' })
  }

  res.json(event)
})

//@desc create a User
//@route POST /user
//@acess Private

//@desc Update a User
//@route PATCH /user
//@acess Private

//@desc Delete a User
//@route DELETE /user
//@acess Private

module.exports = {
  getEvents,
  getEventById
}
