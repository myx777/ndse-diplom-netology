const express = require('express');const http = require('http');const userRoutes = require('./routes/userRoutes');const advertisementRoutes = require('./routes/advertisementRoutes');const mongoose = require('mongoose');const passport = require('./config/passport');const session = require('express-session');const app = express();const server = http.createServer(app);// Настройка сессийapp.use(session({  secret: 'SECRET', // замените на секретное значение  resave: false,  saveUninitialized: true}));// Настройка Passport.jsapp.use(passport.initialize());app.use(passport.session());// Подключение к MongoDB(async function () {  try {    await mongoose.connect(      'mongodb://delivery:123456@mongo/delivery?retryWrites=true&w=majority',    );    console.log('MongoDB Connected successfully.');  } catch (err) {    console.log('MongoDB connection error:', err);  }})();// Middlewareapp.use(express.urlencoded({ extended: true }));app.use(express.json());// Роутыapp.use('/users', userRoutes);app.use('/advertisements', advertisementRoutes);module.exports = { app, server };