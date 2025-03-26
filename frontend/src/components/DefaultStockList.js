// src/components/DefaultStockList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Grid, Paper } from "@mui/material";

const defaultSymbols = ["AAPL", "GOOGL", "AMZN", "MSFT", "TSLA"];

const DefaultStockList = () => {
  const [stockDataList, setStockDataList] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const requests = defaultSymbols.map((symbol) =>
          axios.get(`http://localhost:5000/api/stocks/search?symbol=${symbol}`)
        );
        const responses = await Promise.all(requests);
        const data = responses.map((res) => res.data);
        setStockDataList(data);
      } catch (err) {
        console.error("Error fetching default stocks:", err);
        setError(err.response?.data?.msg || "Failed to fetch default stocks.");
      }
    };

    fetchStockData();
  }, []);

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom sx={{ color: "#f0f0f0" }}>
        Default Stocks
      </Typography>
      {stockDataList.length === 5 ? (
        <>
          {/* First Row: 3 stocks */}
          <Grid container spacing={2} sx={{ mb: 2 }}>
            {stockDataList.slice(0, 3).map((stock, idx) => (
              <Grid item xs={12} sm={4} key={idx}>
                <Paper
                  sx={{
                    p: 2,
                    textAlign: "center",
                    backgroundColor: "#1e1e1e",
                    color: "#f0f0f0",
                    borderRadius: 2,
                    border: "2px solid #8a4fff",
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    {stock.symbol}
                  </Typography>
                  <Typography sx={{ fontSize: "1.1rem", mt: 1 }}>
                    Price: ${stock.price}
                  </Typography>
                  <Typography sx={{ fontSize: "0.9rem", mt: 1 }}>
                    Change: {stock.change} ({stock.changePercent})
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
          {/* Second Row: 2 stocks */}
          <Grid container spacing={2}>
            {stockDataList.slice(3, 5).map((stock, idx) => (
              <Grid item xs={12} sm={6} key={idx}>
                <Paper
                  sx={{
                    p: 2,
                    textAlign: "center",
                    backgroundColor: "#1e1e1e",
                    color: "#f0f0f0",
                    borderRadius: 2,
                    border: "2px solid #8a4fff",
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    {stock.symbol}
                  </Typography>
                  <Typography sx={{ fontSize: "1.1rem", mt: 1 }}>
                    Price: ${stock.price}
                  </Typography>
                  <Typography sx={{ fontSize: "0.9rem", mt: 1 }}>
                    Change: {stock.change} ({stock.changePercent})
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <Typography sx={{ color: "#f0f0f0" }}>Loading default stocks...</Typography>
      )}
    </Box>
  );
};

export default DefaultStockList;
