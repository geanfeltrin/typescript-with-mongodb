import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name:  {
    type: String
  },
    email: {
      type: String,
      unique: true
    },
    password: {
      type: String,
      select: false
    },
})


export const User = mongoose.model('User', userSchema)