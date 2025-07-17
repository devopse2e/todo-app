import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/todos')
      .then(response => setTodos(response.data))
      .catch(() => setError('Failed to fetch todos'));
  }, []);

  const addTodo = () => {
    if (!newTodo.trim()) {
      setError('Todo cannot be empty');
      return;
    }
    axios.post('http://localhost:5000/api/todos', { title: newTodo })
      .then(response => {
        setTodos([...todos, response.data]);
        setNewTodo('');
        setError('');
      })
      .catch(() => setError('Failed to add todo'));
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        value={newTodo}
        onChange={e => setNewTodo(e.target.value)}
        placeholder="Enter a new todo"
      />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;