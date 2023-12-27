import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  isEditing: {
    type: Boolean,
    default: false,
  },
});

export const Todo = mongoose.model("todos", TodoSchema);
