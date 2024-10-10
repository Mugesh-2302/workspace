import React, { useState, useEffect } from 'react';
import './Todo.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

const Todo = () => {
  const [todo, setTodo] = useState('');
  const [db, setDb] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state for actions
  const [error, setError] = useState(''); // Error message

  // Fetch data when the component is mounted
  useEffect(() => {
    getData();
  }, []);

  // Post new todo item
  const datapost = () => {
    if (!todo.trim()) {
      setError('Todo cannot be empty');
      return;
    }
    setLoading(true);
    setError('');
    
    // Optimistically update the UI
    const newTodo = { id: Date.now(), todo };
    setDb([...db, newTodo]); // Update UI immediately
    
    axios.post('http://localhost:3000/posts', { todo })
      .then(() => {
        setTodo('');
      })
      .catch(() => {
        setError('Failed to post data');
        // Revert optimistic update on failure
        setDb(db.filter(item => item.id !== newTodo.id));
      })
      .finally(() => setLoading(false));
  };

  // Get all todo items from server
  const getData = () => {
    setLoading(true);
    axios.get('http://localhost:3000/posts')
      .then((response) => {
        setDb(response.data);
      })
      .catch(() => {
        setError('Failed to retrieve data');
      })
      .finally(() => setLoading(false));
  };

  // Update an existing todo item
  const updateData = (id, data) => {
    setLoading(true);
    axios.put(`http://localhost:3000/posts/${id}`, { todo: data })
      .then(() => {
        const updatedDb = db.map(item => item.id === id ? { ...item, todo: data } : item);
        setDb(updatedDb);
      })
      .catch(() => {
        setError('Failed to update data');
      })
      .finally(() => setLoading(false));
  };

  // Delete a todo item with confirmation
  const deleteData = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setLoading(true);
      axios.delete(`http://localhost:3000/posts/${id}`)
        .then(() => {
          setDb(db.filter(item => item.id !== id));
        })
        .catch(() => {
          setError('Failed to delete data');
        })
        .finally(() => setLoading(false));
    }
  };

  // Prompt the user to enter new data for updating
  const newData = (id) => {
    const data = prompt('Enter new data');
    if (data && data.trim()) {
      updateData(id, data);
    }
  };

  return (
    <div className="todo-container">
      <h2>Todo List</h2>

      {/* Display error message */}
      {error && <p className="error-message">{error}</p>}

      <TextField
        id="outlined-basic"
        label="Todo"
        variant="outlined"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        error={!!error}
        helperText={error || ''}
      />
      <br />
      <Button variant="contained" onClick={datapost} disabled={loading}>
        {loading ? 'Posting...' : 'Post'}
      </Button>
      <Button variant="outlined" onClick={getData} disabled={loading}>
        {loading ? 'Loading...' : 'Get Data'}
      </Button>

      {/* Loading spinner */}
      {loading && <CircularProgress className="loading-spinner" />}

      <div className="todo-list">
        <ul>
          {db.length > 0 ? (
            db.map((item) => (
              <li key={item.id} className="todo-item">
                {item.todo}
                <Button onClick={() => newData(item.id)}>Edit</Button>
                <Button onClick={() => deleteData(item.id)}>Delete</Button>
              </li>
            ))
          ) : (
            <p>No todo items available</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
