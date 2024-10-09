import mongoose from 'mongoose'

const EventSchema = new mongoose.Schema({
  category: String,
  title: String,
  description: String,
  address:String,
  latitude:Number,
  startDate:String,
  endDate:String,
  workingHours: [[Number]],
  longitude:Number,
  price:Number,
  imageSrc: String,
  thumbnailSrc: String,
  eventSrc:String
})


export const EventModel = mongoose.model('Event', EventSchema)
