require('dotenv').config();
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const prisma = require('../models/queries');

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['token'];
  }
  return token;
};
const opts = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.AT,
};
passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    const user = await prisma.getFullUserById(jwt_payload.id);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  })
);
