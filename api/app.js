const express = require('express');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');
const routes = require('./routes/routes');
const passport = require('passport');
require('./utils/passport');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/auth', routes.auth);
app.use(
  '/users',
  passport.authenticate('jwt', { session: false }),
  routes.user
);
app.use('/posts', routes.post);
app.use('/comments', routes.comment);

app.listen(process.env.PORT);
