import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from '../services/axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/users/login', { email, password });
      localStorage.setItem('token', response.data.token); // Save token
      alert('Login successful!');
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || 'Error');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
        Login
      </Button>
    </Container>
  );
};

export default LoginPage;

