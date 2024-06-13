const User = require('../models/user');
const { hashPassword } = require('../utils/password');

class UserService {
  // создание нового user
  async create(data) {
    try {
      const { salt, hash } = await hashPassword(data.password);
      const user = new User({ ...data, salt, passwordHash: hash });
      return await user.save();
    } catch (err) {
      throw new Error(`Ошибка создания нового пользователя: ${err.message}`);
    }
  }

  // поиск user по email
  async find(email) {
    try {
      const user = await User.findOne({ email }).select('-__v');
      return user || null;
    } catch (err) {
      throw new Error(`Пользователь не найден ${err.message}`);
    }
  }
}

module.exports = new UserService();