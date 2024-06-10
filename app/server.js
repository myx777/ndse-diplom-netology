const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const { port } = require('./config/config');

const app = express();
const server = http.createServer(app);

//  Подключение к MongoDB


// Middleware
app.use(express.urlencoded({ extended: true }));


// Роуты


module.exports = { app, server };