import mongoose from "mongoose";

const Schema = mongoose.Schema;

const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  tags: {
    type: [String],
    default: [],
  },
  isPinned: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Todo", todoSchema);
