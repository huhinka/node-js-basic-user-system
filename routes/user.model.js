import mongoose from 'mongoose'
import convertPassword from './user.util.js'

const Schema = mongoose.Schema

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    admin: {
      type: Boolean,
      required: false,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    versionKey: false
  }
)

UserSchema.pre('save', function (next) {
  this.password = convertPassword(this.password)
  next()
})

export default mongoose.model('user', UserSchema)
