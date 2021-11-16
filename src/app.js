require('dotenv').config();
const express = require('express');
const cors = require('cors');

const UserRouter = require('./user/UserRouter');

const app = express();

// Body Parse
app.use(express.json());

// CORS
app.use(cors());

// Routes
app.use(UserRouter);

module.exports = { app };
