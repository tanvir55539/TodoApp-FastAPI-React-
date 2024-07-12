import React, { useState } from 'react';
import axios from 'axios';
import Layout from './layout';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/auth/forgetPass', { email });
      setMessage('Please check your email to reset your password.');
    } catch (error) {
      console.error('Error sending password reset email:', error);
      setMessage('Failed to send password reset email. Please try again later.');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          Reset Password
        </div>
        <div className="card-body">
          {message && <div className="alert alert-info">{message}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input type="text" className="form-control" value={email}
                     onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
