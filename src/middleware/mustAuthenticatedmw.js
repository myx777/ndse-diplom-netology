// Проверка аутентификации
const mustAuthenticatedMw = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send({ message: 'Пользователь не аутентифицирован' });
};

module.exports = mustAuthenticatedMw;
