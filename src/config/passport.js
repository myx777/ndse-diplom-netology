const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const AuthService = require('../services/AuthService');

// Настройка LocalStrategy
passport.use(
  'local',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
      AuthService.verify.bind(AuthService),
  ),
);

// Сериализация пользователя для сохранения в сессии
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// Десериализация пользователя по ID, который был сохранен в сессии.
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).select('-__v');
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

module.exports = passport;
