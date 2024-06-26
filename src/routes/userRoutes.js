const UserController = require('../controllers/AuthController');
const router = require('express').Router();

// Регистрация пользователя
router.post('/signup', (req, res, next) => UserController.register(req, res, next));

// Аутентификация пользователя
router.post('/signin', (req, res, next) => {
  UserController.login(req, res, next);
});

module.exports = router;
