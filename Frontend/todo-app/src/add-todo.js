import React, { useState } from 'react';
import axios from 'axios';

const AddTodo = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [message, setMessage] = useState('');

  const getCookie = (name) => {
    const value = `; document.cookie`.match(`; ${name}=([^;]*)(;|$)?`);
    return value ? value[1] : '';
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = getCookie('Pycharm-faadfda0'); // Retrieve token from cookie
  
    if (!token) {
      // Handle the case where the token is missing, maybe redirect to login
      console.log("Token not found in cookie");
      setMessage('Please login to create a todo.');
      return null;
    }
  
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/todos/add-todo',
        { title, description, priority },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Sending token in the header
          },
          withCredentials: true, // Ensure cookies are sent with the request
        }
      );
  
      if (response.status !== 200) {
        throw new Error('Failed to add todo.');
      }
  
      // Redirect after successful submission
      window.location.href = '/todos';
    } catch (error) {
      console.error('Error adding todo:', error);
      setMessage('Failed to add todo. Please try again later.');
    }
  };
  
  

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          Add New Todo
        </div>
        <div className="card-body">
          {message && <div className="alert alert-danger">{message}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Priority</label>
              <select
                className="form-control"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                required
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              Add Todo
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTodo;
