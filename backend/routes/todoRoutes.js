import express from 'express';
import todosData from '../models/todoModel.js'
import Auth from '../Authentication.js';

const routes = express.Router();

// Create a new todo list
routes.post('/create-todolist', Auth, async (req, res) => {
    const { title, content, tags } = req.body;
   const userId = req.user._id;
    

    try {

     const newTodoList = await todosData.create({
        title,
        content,
        tags: tags || [],
        userId: userId
    });

    return res.json({  message: 'Todo created successfully', newTodoList });
    } catch (error) {
     return res.status(500).json({ message: error.message });
    }

});

// Get all todo lists for the authenticated user

routes.get('/get-all-todolist', Auth, async (req, res) => {
    const userId = req.user._id;
  try {
   const getTodos = await todosData.find({ userId: userId}).sort({ isPinned: -1});
   return res.json({ message: 'Todos retrieved successfully', getTodos });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// update a todo list by ID
routes.put('/update-todolist/:id', Auth, async (req, res) => {
  const { id } = req.params;
  const { title, content, tags, isPinned } = req.body;
  const userId = req.user._id;
  if (!title && !content && !tags && isPinned === undefined) {
    return res
      .status(400)
      .json({ message: 'Please provide at least one field to update' });
  }

  try {
    const updatedTodo = await todosData.findOne({
      _id: id,
      userId: userId, 
    });

    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    if (title !== undefined) updatedTodo.title = title;
    if (content !== undefined) updatedTodo.content = content;
    if (tags !== undefined) updatedTodo.tags = tags;
    if (isPinned !== undefined) updatedTodo.isPinned = isPinned;

    await updatedTodo.save();

    return res.status(200).json({ message: 'Todo updated successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// delete a todo list by ID
routes.delete('/delete-todolist/:id', Auth, async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
    try { 
      const deletedTodo = await todosData.findOneAndDelete({
        _id: id,
        userId: userId,
      });

      if (!deletedTodo) {
        return res.status(404).json({ message: 'Todo not found' });
      }

      return res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
});

// update isPinned status
routes.put('/update-pin/:id', Auth, async (req, res) => {
  const { id } = req.params;
  const { isPinned } = req.body;
  const userId = req.user._id;

  try {
    const updatedTodo = await todosData.findOne({
      _id: id,
      userId: userId,
    });

    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    updatedTodo.isPinned = isPinned;
    await updatedTodo.save();

    return res.status(200).json({ message: 'Pin status updated successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

routes.get('/search-todos', Auth, async (req, res) => {
  const { query } = req.query;
  const userId = req.user._id;

  try {
    const searchTodos = await todosData.find({
      userId: userId,
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } },
        { tags: { $regex: query, $options: 'i' } }
      ]
    });

    return res.json({ message: 'Todos searched successfully', searchTodos });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default routes;