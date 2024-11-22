import { Request, Response } from 'express';
import { EventModel } from '../Models/events';
import { redisClient } from '../redisConfig'; // Assuma que redisClient foi configurado em outro arquivo
const asyncHandler = require('express-async-handler');

export interface EventQuery {
  category?: string;
  price?: {
    $eq?: number;
    $lte?: number;
    $gt?: number;
    $gte?: number;
  };
  $sort?: { price: number };
  $or?: [
    {
      startDate?: {
        $gte?: Date;
        $lte?: Date;
      };
    },
    {
      endDate?: {
        $gte?: Date;
        $lte?: Date;
      };
    },
    {
      startDate?: { $lte?: Date };
      endDate?: { $gte?: Date };
    }
  ];
  coordenates?: {
    $geoWithin?: {
      $centerSphere: [number[], number];
    };
  };
}

//@desc Get Events by Search params
//@route POST /getEvents
//@acess Public
const getEvents = asyncHandler(async (req: Request, res: Response) => {
  const { category, startDate, endDate, price, radius, latitude, longitude } = req.body;

  let query: EventQuery = {};

  if (category) {
    query.category = category;
  }

  if (price == null) {
    query.price = { $gte: 0 };
  } else if (parseInt(price) > 0) {
    query.price = { $lte: parseInt(price) };
  }

  if (startDate && endDate) {
    query.$or = [
      {
        startDate: {
          $gte: startDate,
          $lte: endDate,
        },
      },
      {
        endDate: {
          $gte: startDate,
          $lte: endDate,
        },
      },
      {
        startDate: { $lte: startDate },
        endDate: { $gte: endDate },
      },
    ];
  }

  if (latitude && longitude) {
    query.coordenates = {
      $geoWithin: {
        $centerSphere: [[parseFloat(latitude), parseFloat(longitude)], radius / 6378.1],
      },
    };
  }

  // Gera uma chave única para o Redis com base na query
  const redisKey = `events:${JSON.stringify(query)}`;

  // Tenta obter os dados do cache
  const cachedEvents = await redisClient.get(redisKey);
  console.log('Redis Key:', redisKey);

  if (cachedEvents) {
    console.log('Cache encontrado');
    return res.json(JSON.parse(cachedEvents));
  }

  // Caso não encontre no cache, consulta no MongoDB
  const events = await EventModel.find(query).sort({ price: -1 }).lean();

  if (!events || events.length === 0) {
    return res.status(404).json({ message: 'No Event Found' });
  }

  // Salva os resultados no cache com expiração de 1 hora
  await redisClient.setex(redisKey, 3600, JSON.stringify(events));

  res.json(events);
});


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
