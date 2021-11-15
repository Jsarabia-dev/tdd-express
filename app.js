require('dotenv').config();
const express = require('express');

const app = express();

app.listen(process.env.PORT, () => console.log(`App is running in port ${process.env.PORT}`))
