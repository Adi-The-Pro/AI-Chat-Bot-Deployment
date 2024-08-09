const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const router = require('./routes/index.js');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(morgan("dev"));

app.use("/api/v1",router);

module.exports = app;