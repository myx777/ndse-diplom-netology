const UserService = require('../services/AuthService');
const passport = require('../config/passport');

/**
 * Контроллер для управления пользователями.
 */
class AuthController {
  /**
   * Создает нового пользователя.
   * @param {Object} req - Объект запроса Express.
   * @param {Object} res - Объект ответа Express.
   * @returns {Promise<void>}
   */
  static async register(req, res, next) {
    try {
      const user = await UserService.registration(req.body);

      if (!user) {
        return res.status(400).send({
          error: 'email занят',
          status: 'error',
        });
      }

      // создаем нового пользователя и сразу логинемся
      req.logIn(user, err => {
        if (err) return next(err);

        return res.status(200).send({
          data: {
            id: user.id,
            email: user.email,
            name: user.name,
            contactPhone: user.contactPhone,
          },
          status: 'ok',
        })
      })

    } catch (err) {
      res.status(500).send(err);
    }
  }

  /**
   * Аутентифицирует пользователя.
   * @param {Function} next - Функция next Express для обработки следующего middleware.
   * @returns {void}
   */
  static login(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res
          .status(401)
          .json({ message: info.message || 'Неверный логин или пароль' });
      }
      req.logIn(user, err => {
        if (err) {
          return next(err);
        }
        return res.redirect('/users/private');
      });
    })(req, res, next);
  }

  /**
   * Выходит из системы, завершая сессию пользователя.
   * @returns {void}
   */
  static logout(req, res) {
    req.logout(err => {
      if (err) {
        return res.status(500).send(err);
      }
      res.redirect('/users/signin');
    });
  }
}

module.exports = AuthController;
