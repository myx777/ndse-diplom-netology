const express = require('express');
const http = require('http');

const userRoutes = require('./routes/userRoutes');

const mongoose = require('mongoose');


const app = express();
const server = http.createServer(app);

//  Подключение к MongoDB


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Роуты
app.use('/users', userRoutes);

module.exports = { app, server };