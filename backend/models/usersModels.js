import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdOn: {
    type: String,
    default: new Date().getTime(),
  },
});

export default mongoose.model("User", userSchema);
