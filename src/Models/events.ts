import mongoose from 'mongoose'

const EventSchema = new mongoose.Schema({
  imageSrc: String,
  thumbnailSrc: String,
  title: String,
  description: String,
  coordenates: [Number],
  startDate: String,
  endDate: String,
  location: String,
  category: String,
  eventSrc: String
})

export const EventModel = mongoose.model('Event', EventSchema)
