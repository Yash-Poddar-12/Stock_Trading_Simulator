# Stock Trading Simulator

A full-stack MERN (MongoDB, Express, React, Node) application that lets users register, log in, and simulate buying/selling stocks with a virtual balance. Includes a fun **bull’s eyes** login page (where the bull’s eyes follow your cursor and close when typing a password), default stocks display, portfolio tracking, and live stock price fetching via Alpha Vantage (or similar APIs).

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)

---

## Features

1. **User Authentication**  
   - Register and log in using JWT-based authentication  
   - Passwords are securely hashed

2. **Bull’s Eyes Login**  
   - Pupils follow the cursor  
   - Eyes close when typing in the password field

3. **Default Stocks Display**  
   - Displays 5 default stocks in a 3 + 2 card layout  
   - Shows live price and daily change (in green or red)

4. **Portfolio Tracking**  
   - Each user has a virtual balance (e.g., $1,000,000) to simulate trades  
   - Tracks quantity, price, and changes for each owned stock

5. **Stock Search**  
   - Allows searching for any stock symbol  
   - Displays current price and change

6. **Buy/Sell Simulation**  
   - Deducts from user balance on “buy” and updates portfolio  
   - Increases user balance on “sell” if shares are owned

7. **Responsive & Themed UI**  
   - Material-UI (MUI) for consistent styling  
   - Light-themed pages with a gradient background

---

## Tech Stack

- **Frontend**: React, Material-UI (MUI)  
- **Backend**: Node.js, Express  
- **Database**: MongoDB (Atlas or local)  
- **Authentication**: JWT (jsonwebtoken), bcrypt for password hashing  
- **API Calls**: Alpha Vantage (or similar) for stock data  
- **Version Control**: Git & GitHub

---


