// src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Divider,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Grid,
  Paper,
} from '@mui/material';
import { keyframes } from '@mui/system';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Trade from '../components/Trade';
import StockSearch from '../components/StockSearch';
import DefaultStockList from '../components/DefaultStockList';

// Define pulse animation for the balance section background
const pulse = keyframes`
  0% { transform: scale(0.95); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
`;

const Dashboard = () => {
  const [userData, setUserData] = useState({ balance: 0, portfolio: [] });
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const refreshUserData = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/user/me', {
        headers: { 'x-auth-token': token },
      });
      setUserData(res.data);
    } catch (err) {
      console.error('Error fetching user data', err);
    }
  };

  useEffect(() => {
    refreshUserData();
  }, [token]);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    handleMenuClose();
    navigate('/login');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        background: 'linear-gradient(135deg, #121212 0%, #1a1a2e 100%)',
        overflowX: 'hidden',
      }}
    >
      {/* Neon Navbar */}
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: 'rgba(30, 30, 30, 0.8)',
          backdropFilter: 'blur(15px)',
          padding: '15px 5%',
          boxShadow: '0 4px 6px rgba(138,79,255,0.1)',
        }}
      >
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontWeight: '700',
              fontSize: '1.8em',
              background: 'linear-gradient(45deg, #00ffff, #8a4fff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 10px rgba(0,255,255,0.3)',
            }}
          >
            StockVista
          </Typography>
          <Box sx={{ position: 'relative' }}>
            <IconButton
              onClick={handleProfileMenuOpen}
              sx={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                border: '2px solid #8a4fff',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.1)',
                  boxShadow: '0 0 15px #8a4fff',
                },
              }}
            >
              <AccountCircle sx={{ fontSize: '40px', color: '#fff' }} />
            </IconButton>
            <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleMenuClose}>
              <MenuItem onClick={handleLogout}>
                <i className="fas fa-sign-out-alt" style={{ marginRight: '8px' }}></i> Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4 }}>
        {/* Balance Section */}
        <Box
          className="balance-section"
          sx={{
            background: 'linear-gradient(145deg, #1e1e1e, #2a2a3a)',
            borderRadius: '20px',
            p: 3,
            textAlign: 'center',
            mb: 3,
            boxShadow:
              '0 10px 30px rgba(138,79,255,0.1), inset 0 0 20px rgba(138,79,255,0.1)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background: 'radial-gradient(circle at center, rgba(138,79,255,0.1), transparent 70%)',
              animation: `${pulse} 5s infinite alternate`,
            },
          }}
        >
          <Typography variant="h4" sx={{ color: '#fff', mb: 1 }}>
            Available Balance
          </Typography>
          <Typography
            id="account-balance"
            sx={{
              fontSize: '3em',
              background: 'linear-gradient(45deg, #00ffff, #8a4fff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 15px rgba(0,255,255,0.3)',
            }}
          >
            ${userData.balance}
          </Typography>
        </Box>

        {/* Portfolio Section */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
            Your Portfolio
          </Typography>
          {userData.portfolio.length === 0 ? (
            <Typography sx={{ color: '#fff' }}>No holdings yet.</Typography>
          ) : (
            <Grid container spacing={2}>
              {userData.portfolio.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Paper
                    sx={{
                      p: 2,
                      textAlign: 'center',
                      background: 'linear-gradient(145deg, #1e1e2a, #2a2a3a)',
                      borderRadius: '15px',
                      transition: 'all 0.3s ease',
                      border: '1px solid rgba(138,79,255,0.1)',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                        boxShadow: '0 15px 30px rgba(138,79,255,0.2), 0 0 20px rgba(0,255,255,0.1)',
                      },
                      color: '#fff',
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {item.symbol}
                    </Typography>
                    <Typography sx={{ fontSize: '1.1rem', mt: 1 }}>
                      Qty: {item.quantity}
                    </Typography>
                    {item.priceBought && (
                      <Typography sx={{ fontSize: '0.9rem', mt: 1 }}>
                        Bought at: ${item.priceBought}
                      </Typography>
                    )}
                    {item.change && (
                      <Typography sx={{ fontSize: '0.9rem', mt: 1 }}>
                        Change: {item.change}
                      </Typography>
                    )}
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

        <Divider sx={{ my: 3, borderColor: '#8a4fff' }} />

        {/* Default Stocks Section */}
        <DefaultStockList />

        <Divider sx={{ my: 3, borderColor: '#8a4fff' }} />

        {/* Trade Section */}
        <Trade refreshUserData={() => refreshUserData()} />

        <Divider sx={{ my: 3, borderColor: '#8a4fff' }} />

        {/* Stock Search Section */}
        <StockSearch />
      </Container>
    </Box>
  );
};

export default Dashboard;
