// Проверка аутентификации
const mustAuthenticatedMw = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send({ message: 'Не авторизован' });
};

module.exports = mustAuthenticatedMw;
