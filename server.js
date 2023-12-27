import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnect } from "./db.js";
import { Todo } from "./modals/todoModal.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3001, () => console.log("Server is running on port 3001"));

dbConnect();

app.get("/", (req, res) => {
  res.send({ message: "Hello from server" });
});

// Create todo
app.post("/addTodo", async (req, res) => {
  try {
    const { task } = req.body;

    const newtodo = new Todo({
      task: task,
    });

    await newtodo.save();

    return res.status(200).send({ message: "New todo created!" });
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

// Get all todos
app.get("/todos", async (req, res) => {
  try {
    const todo = await Todo.find();

    return res.status(200).send({ data: todo, message: "success" });
  } catch (error) {
    res.status(500).send({ message: "Error" });
  }
});

// Edit todo
app.put("/editTodo/:id", async (req, res) => {
  try {
    const { task } = req.body;
    const { id } = req.params;

    await Todo.findByIdAndUpdate(id, { task: task });

    return res.status(200).send({ message: "Todo updated successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error while editing" });
  }
});

// Delete todo
app.delete("/deleteTodo/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await Todo.findByIdAndDelete(id);

    return res.status(200).send({ message: "Todo deleted!" });
  } catch (error) {
    res.status(500).send({ message: "Error while deleting!" });
  }
});
