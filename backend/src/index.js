const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const Todo = mongoose.model('Todo', new mongoose.Schema({
  title: { type: String, required: true }
}));

app.use(cors());
app.use(express.json());

app.get('/api/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

app.post('/api/todos', async (req, res) => {
  try {
    if (!req.body.title) return res.status(400).json({ error: 'Title is required' });
    const todo = new Todo({ title: req.body.title });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://test:test@mongodb:27017/todo?authSource=admin');
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

connectDB();
app.listen(5000, () => console.log('Server running on port 5000'));