// src/App.js
import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';

function App() {
  const [isAuthenticated, setAuth] = useState(!!localStorage.getItem("token"));

  // Dark theme configuration
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: 'dark',
          primary: { main: '#0d47a1' }, // dark blue primary
          background: {
            default: '#000000', // true black background
            paper: '#121212',   // slightly lighter for cards
          },
          text: {
            primary: '#ffffff', // white text
            secondary: '#bbbbbb',
          },
        },
        typography: {
          fontFamily: '"Poppins", sans-serif', // Use a modern font like Poppins
        },
      }),
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage setAuth={setAuth} />} />
          <Route path="/register" element={<RegisterPage setAuth={setAuth} />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
