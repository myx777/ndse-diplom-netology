const UserController = require('../controllers/userController');
const router = require('express').Router();

// регистрация user
router.post('/registration', (req, res) => UserController.createUser(req, res));

// поиск user по email
router.post('/search', (req, res) => UserController.findUserByEmail(req, res));

module.exports = router;
