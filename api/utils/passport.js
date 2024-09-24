require('dotenv').config();
const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const prisma = require('../models/queries');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.AT,
};
passport.use(
  new Strategy(opts, async (jwt_payload, done) => {
    const user = await prisma.getUserById(jwt_payload.id);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  })
);
