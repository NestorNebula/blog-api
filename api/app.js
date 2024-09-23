const express = require('express');
const app = express();
require('dotenv').config();
const routes = require('./routes/routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', routes.auth);
app.use('/users', routes.user);
app.use('/posts', routes.post);
app.use('/comments', routes.comment);

app.listen(process.env.PORT);
