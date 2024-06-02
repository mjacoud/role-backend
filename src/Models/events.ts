import mongoose from 'mongoose'

const EventSchema = new mongoose.Schema({
  category: String,
  title: String,
  description: String,
  address:String,
  coordenates: [Number],
  workingHours:{
    String:[Number]
  },
  imageSrc: String,
  thumbnailSrc: String,
})

export const EventModel = mongoose.model('Event', EventSchema,'parques')
