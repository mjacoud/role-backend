import { Request, Response } from 'express'

import { EventModel } from '../Models/events'

const asyncHandler = require('express-async-handler')

export interface EventQuery {
  category?: string
  price?: {
    $eq?: number
    $lte?: number
    $gt?: number
    $gte?:number
  }
  $sort?:{price:number}
  $or?: [
    {
      startDate?: {
        $gte?: Date
        $lte?: Date
      }
    },
    {
      endDate?: {
        $gte?: Date
        $lte?: Date
      }
    },
    {
      startDate?: { $lte?: Date }
      endDate?: { $gte?: Date }
    }
  ]
  coordenates?: {
    $geoWithin?: {
      $centerSphere: [number[],number]
    }
  }
}

//@desc Get Events by Search params
//@route POST /getEvents
//@acess Public

const getEvents = asyncHandler(async (req: Request, res: Response) => {
  const { category, startDate, endDate, price, radius,latitude,longitude } = req.body
  
  console.log('Body recebido:', req.body);
  console.log('----------------------')
  
  let query: EventQuery = {}
  
  if (category) {
    query.category = category
  }
  
  if (price == null) {
    query.price = { $gte: 0 }
  }

  if (parseInt(price) > 0) {
    query.price = { $lte: parseInt(price)}
  }


  if (startDate && endDate) {
      query = {
        $or: [
          {
            startDate: {
              $gte: startDate, 
              $lte: endDate   
            }
          },
          {
            endDate: {
              $gte: startDate,
              $lte: endDate    
            }
          },
          {
            startDate: { $lte: startDate },
            endDate: { $gte: endDate }
          }
        ]
      };
    }
  
  if (latitude && longitude) {
    query.coordenates = {
      $geoWithin: {
        $centerSphere: [[parseFloat(latitude),parseFloat(longitude)], radius / 6378.1]
      }
    }
  }

  
  const events = await EventModel.find(query).sort({ price: -1 }).lean().exec()
  
  
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
