const express = require('express');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');
const routes = require('./routes/routes');
const passport = require('passport');
const cors = require('cors');
require('./utils/passport');

const origins = ['http://localhost:5173'];
app.use(
  cors({
    origin: function (origin, cb) {
      if (origins.indexOf(origin) === -1) {
        return cb(
          new Error("The origin doesn't have access rights to this API.")
        );
      }
      return cb(null, true);
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/auth', routes.auth);
app.use(
  '/users',
  passport.authenticate('jwt', { session: false }),
  routes.user
);
app.use(
  '/posts',
  passport.authenticate('jwt', { session: false }),
  routes.post
);
app.use(
  '/comments',
  passport.authenticate('jwt', { session: false }),
  routes.comment
);

app.listen(process.env.PORT);
