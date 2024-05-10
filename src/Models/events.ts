import mongoose from 'mongoose'

const EventSchema = new mongoose.Schema({
  imageSrc: String,
  thumbnailSrc: String,
  title: String,
  description: String,
  coordenates: [Number],
  date:[Number],
  location: String,
  category: String,
  eventSrc: String
})

export const EventModel = mongoose.model('Event', EventSchema)
