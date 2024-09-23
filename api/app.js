const express = require('express');
const app = express();
require('dotenv').config();
const routes = require('./routes/routes');

app.use(express.urlencoded({ extended: true }));

app.use('/auth', routes.auth);
app.use('/users', routes.user);
app.use('/posts', routes.post);

app.listen(process.env.PORT);
