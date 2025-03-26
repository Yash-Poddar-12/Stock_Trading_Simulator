// src/components/Trade.js
import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';

const Trade = ({ refreshUserData }) => {
  const [tradeData, setTradeData] = useState({ symbol: '', quantity: '', price: '' });
  const [message, setMessage] = useState('');
  const token = localStorage.getItem("token");

  const onChange = (e) =>
    setTradeData({ ...tradeData, [e.target.name]: e.target.value });

  const handleTrade = async (type) => {
    try {
      const url = `http://localhost:5000/api/trade/${type}`;
      const res = await axios.post(url, tradeData, {
        headers: { "x-auth-token": token },
      });
      setMessage(res.data.msg);
      if (refreshUserData) refreshUserData();
    } catch (err) {
      setMessage(err.response?.data?.msg || "Trade error");
    }
  };

  return (
    <Box sx={{ p: 2, bgcolor: '#1e1e1e', borderRadius: 2, mt: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ color: '#f0f0f0' }}>
        Make a Trade
      </Typography>
      <TextField
        label="Stock Symbol (e.g., AAPL)"
        name="symbol"
        onChange={onChange}
        fullWidth
        margin="normal"
        InputProps={{ style: { color: '#f0f0f0' } }}
        InputLabelProps={{ style: { color: '#f0f0f0' } }}
      />
      <TextField
        label="Quantity"
        name="quantity"
        onChange={onChange}
        fullWidth
        margin="normal"
        InputProps={{ style: { color: '#f0f0f0' } }}
        InputLabelProps={{ style: { color: '#f0f0f0' } }}
      />
      <TextField
        label="Price per Share"
        name="price"
        onChange={onChange}
        fullWidth
        margin="normal"
        InputProps={{ style: { color: '#f0f0f0' } }}
        InputLabelProps={{ style: { color: '#f0f0f0' } }}
      />
      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Button variant="contained" color="success" onClick={() => handleTrade('buy')}>
          Buy
        </Button>
        <Button variant="contained" color="error" onClick={() => handleTrade('sell')}>
          Sell
        </Button>
      </Box>
      {message && (
        <Typography sx={{ mt: 2, color: '#f0f0f0' }}>
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default Trade;
