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
      <Typography variant="h6" gutterBottom sx={{ color: "#fff" }}>
        Stock Search
      </Typography>
      <TextField
        label="Enter stock symbol (e.g., AAPL)"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        fullWidth
        margin="normal"
        InputProps={{ style: { color: '#fff' } }}
        InputLabelProps={{ style: { color: '#fff' } }}
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
            border: '2px solid #1976d2',
            textAlign: 'center',
            backgroundColor: "#1E1E1E",
            color: "#fff",
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
