// src/pages/WelcomePage.js
import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const navigate = useNavigate();
  
  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        background: 'linear-gradient(to right, #74ebd5, #ACB6E5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          bgcolor: 'rgba(255, 255, 255, 0.9)',
          p: 4,
          borderRadius: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="h3" gutterBottom>
          STOCKTRADE
        </Typography>
        <Typography variant="h6" gutterBottom>
          Your Trading Journey Begins Here
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button variant="contained" sx={{ mr: 2 }} onClick={() => navigate('/login')}>
            Login
          </Button>
          <Button variant="outlined" onClick={() => navigate('/register')}>
            Register
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default WelcomePage;
