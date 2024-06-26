const User = require('../models/user');
const { hashPassword, validatePassword } = require('../utils/password');

class AuthService {
  // создание нового user
  static async registration(data) {
    try {
      const { salt, hash } = await hashPassword(data.password);
      const user = new User({ ...data, salt, passwordHash: hash });

      const userFound = await this.find(data.email);
      return !userFound ? await user.save() : null;
    } catch (err) {
      throw new Error(`Ошибка создания нового пользователя: ${err.message}`);
    }
  }

  // поиск user по email
  static async find(email) {
    try {
      const user = await User.findOne({ email }).select('-__v');
      return user || null;
    } catch (err) {
      throw new Error(`Пользователь не найден ${err.message}`);
    }
  }
  /**
   * Верификация пользователя.
   * @param {string} email - Email пользователя.
   * @param {string} password - Пароль пользователя.
   * @param {function} done - Функция завершения.
   */
  static async verify(email, password, done) {
    try {
      const user = await this.find(email);
      if (!user) return done(null, false, { message: 'Неверный email или пароль!' });

      const { passwordHash, salt } = user;
      const validatedPassword = await validatePassword(password, passwordHash, salt);
      if (!validatedPassword) return done(null, false, { message: 'Неверный email или пароль!' });

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
}

module.exports = AuthService;