const express = require('express');
const app = express();
require('dotenv').config();
const routes = require('./routes/routes');

app.use(express.urlencoded({ extended: true }));

app.listen(process.env.PORT);
