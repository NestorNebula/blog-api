const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const prisma = require('../models/queries');
const bcrypt = require('bcrypt');

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await prisma.getUserByUsermail(username);
      if (!user) {
        return done(null, false);
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false);
      }
      return done(null, user);
    } catch {
      return done(err);
    }
  })
);
