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

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: 'light',
          primary: { main: '#1976d2' },
          background: { default: '#f5f5f5', paper: '#fff' },
        },
        typography: {
          fontFamily: '"Poppins", sans-serif',
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
