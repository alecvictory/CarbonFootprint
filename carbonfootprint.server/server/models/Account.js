import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Account = new Schema(
  {
    subs: [{ type: String, unique: true }],
    _id: { type: String, required: true },
    email: { type: String, lowercase: true, unique: true },
    name: { type: String, required: true },
    picture: { type: String },
    bio: { type: String, default: 'You Need To Do A Bio' },
    location: { type: String, default: 'Boise, ID' }
    // NOTE If you wish to add additional public properties for Accounts do so here
  },
  { timestamps: true, _id: false, toJSON: { virtuals: true } }
)

export default Account
