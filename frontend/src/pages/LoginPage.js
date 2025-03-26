// src/pages/LoginPage.js
import React, { useState, useRef } from 'react';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Link,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BullEyes from '../components/BullEyes';

const LoginPage = ({ setAuth }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const containerRef = useRef(null);
  const navigate = useNavigate();

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height * 0.3;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const maxDist = 100;
    const clampedX = Math.max(-1, Math.min(1, dx / maxDist));
    const clampedY = Math.max(-1, Math.min(1, dy / maxDist));
    setOffsetX(clampedX);
    setOffsetY(clampedY);
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email.includes('@')) {
      setError("Please enter a valid email address that contains '@'");
      return;
    }
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      setAuth(true);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || 'Error logging in');
    }
  };

  return (
    <Box
      ref={containerRef}
      onMouseMove={handleMouseMove}
      sx={{
        minHeight: '100vh',
        width: '100vw',
        background: 'linear-gradient(to right, #74ebd5, #ACB6E5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      {/* Bull Eyes positioned at the top */}
      <Box
        sx={{
          position: 'absolute',
          top: '5%',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 0,
        }}
      >
        <BullEyes offsetX={offsetX} offsetY={offsetY} isClosed={isPasswordFocused} />
      </Box>

      {/* Login Card */}
      <Container
        maxWidth="sm"
        sx={{
          bgcolor: 'rgba(255, 255, 255, 0.9)',
          p: 4,
          borderRadius: 2,
          textAlign: 'center',
          zIndex: 1,
        }}
      >
        <Typography variant="h4" gutterBottom>
          STOCKTRADE
        </Typography>
        <Typography variant="body1" gutterBottom>
          Your Trading Journey Begins Here
        </Typography>
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            margin="normal"
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            margin="normal"
            onChange={handleChange}
            required
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(false)}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2">
            Don't have an account?{' '}
            <Link href="/register" underline="hover">
              Register
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;
