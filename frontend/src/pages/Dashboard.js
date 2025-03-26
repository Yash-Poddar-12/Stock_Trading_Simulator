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
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Trade from '../components/Trade';
import StockSearch from '../components/StockSearch';
import DefaultStockList from '../components/DefaultStockList';

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
        background: 'linear-gradient(to right, #74ebd5, #ACB6E5)',
        overflowX: 'hidden',
      }}
    >
      <AppBar position="static" sx={{ backgroundColor: '#1976d2', boxShadow: 3 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            StockTrade Dashboard
          </Typography>
          <IconButton size="large" edge="end" color="inherit" onClick={handleProfileMenuOpen}>
            <AccountCircle />
          </IconButton>
          <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleMenuClose}>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Container
        maxWidth="md"
        sx={{
          mt: 4,
          bgcolor: 'background.paper',
          borderRadius: 2,
          p: 4,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Balance: ${userData.balance}
        </Typography>

        {/* Portfolio Section */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            Your Portfolio
          </Typography>
          {userData.portfolio.length === 0 ? (
            <Typography>No holdings yet.</Typography>
          ) : (
            <Grid container spacing={2}>
              {userData.portfolio.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Paper
                    sx={{
                      p: 2,
                      textAlign: "center",
                      backgroundColor: "#1E1E1E",
                      color: "#fff",
                      borderRadius: 2,
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      {item.symbol}
                    </Typography>
                    <Typography sx={{ fontSize: "1.1rem", mt: 1 }}>
                      Quantity: {item.quantity}
                    </Typography>
                    {item.priceBought && (
                      <Typography sx={{ fontSize: "0.9rem", mt: 1 }}>
                        Bought at: ${item.priceBought}
                      </Typography>
                    )}
                    {/* If you have a change field for portfolio items, show it */}
                    {item.change && (
                      <Typography sx={{ fontSize: "0.9rem", mt: 1 }}>
                        Change: {item.change}
                      </Typography>
                    )}
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

        <Divider sx={{ my: 3 }} />

        <DefaultStockList />

        <Divider sx={{ my: 3 }} />

        <Trade refreshUserData={refreshUserData} />

        <Divider sx={{ my: 3 }} />

        <StockSearch />
      </Container>
    </Box>
  );
};

export default Dashboard;
