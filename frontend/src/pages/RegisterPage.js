// src/pages/RegisterPage.js
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

const RegisterPage = ({ setAuth }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
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
      await axios.post('http://localhost:5000/api/auth/register', formData);
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem('token', res.data.token);
      setAuth(true);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || 'Error registering');
    }
  };

  return (
    <Box
      ref={containerRef}
      onMouseMove={handleMouseMove}
      sx={{
        minHeight: '100vh',
        width: '100vw',
        background: 'linear-gradient(135deg, #121212, #1a1a2e)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      {/* Bull Eyes */}
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

      {/* Register Card */}
      <Container
        maxWidth="sm"
        sx={{
          bgcolor: 'rgba(18, 18, 18, 0.95)',
          p: 4,
          borderRadius: 2,
          textAlign: 'center',
          zIndex: 1,
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ color: '#f0f0f0', fontWeight: '700' }}>
          StockVista
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ color: '#f0f0f0' }}>
          Create Your Account
        </Typography>
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            margin="normal"
            onChange={handleChange}
            required
            InputProps={{ style: { color: '#f0f0f0' } }}
            InputLabelProps={{ style: { color: '#f0f0f0' } }}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            margin="normal"
            onChange={handleChange}
            required
            InputProps={{ style: { color: '#f0f0f0' } }}
            InputLabelProps={{ style: { color: '#f0f0f0' } }}
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
            InputProps={{ style: { color: '#f0f0f0' } }}
            InputLabelProps={{ style: { color: '#f0f0f0' } }}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Register
          </Button>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" sx={{ color: '#f0f0f0' }}>
            Already have an account?{' '}
            <Link href="/login" underline="hover" sx={{ color: '#1976d2' }}>
              Login
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default RegisterPage;
