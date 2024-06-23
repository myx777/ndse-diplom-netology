const UserService = require('../services/UserService');

class UserController {
  async createUser(req, res) {
    try {
      console.log(req.body)
      const user = await UserService.create(req.body);
      console.log(user)
      res.status(201).send(user);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async findUserByEmail(req, res) {
    try {
      const user = await UserService.find(req.body);
      if (!user) {
        return res.status(200).send(null);
      }

      res.status(200).send(user);
    } catch (err) {
      res.status(500).send(err);
    }
  }
}

module.exports = new UserController();
