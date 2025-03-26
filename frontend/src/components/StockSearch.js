// src/components/StockSearch.js
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import axios from 'axios';

const StockSearch = () => {
  const [symbol, setSymbol] = useState('');
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/stocks/search?symbol=${symbol}`);
      setStockData(res.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.msg || "Could not fetch stock data.");
      setStockData(null);
    }
  };

  return (
    <Box sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ color: "#f0f0f0" }}>
        Stock Search
      </Typography>
      <TextField
        label="Enter stock symbol (e.g., AAPL)"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        fullWidth
        margin="normal"
        InputProps={{ style: { color: '#f0f0f0' } }}
        InputLabelProps={{ style: { color: '#f0f0f0' } }}
      />
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      {stockData && (
        <Paper
          sx={{
            p: 2,
            mt: 2,
            border: '2px solid #8a4fff',
            textAlign: 'center',
            backgroundColor: "#1e1e1e",
            color: "#f0f0f0",
          }}
        >
          <Typography variant="subtitle1">{stockData.symbol}</Typography>
          <Typography>Price: ${stockData.price}</Typography>
          <Typography>
            Change: {stockData.change} ({stockData.changePercent})
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default StockSearch;
