const UserController = require('../controllers/AuthController');
const router = require('express').Router();
const mustAuthenticatedMw = require('../middleware/mustAuthenticatedmw');

// Регистрация пользователя
router.post('/signup', (req, res, next) => UserController.register(req, res, next));

// Аутентификация пользователя
router.post('/signin', (req, res, next) => {
  UserController.login(req, res, next);
});

// Применение mustAuthenticatedMw ко всем маршрутам, начинающимся с /private
router.all('/private', mustAuthenticatedMw);
router.all('/private/*', mustAuthenticatedMw);

module.exports = router;
