const UserService = require('../services/UserService');

class UserController {
  async createUser(req, res) {
    try {
      const user = await UserService.create(req.body);
      console.log(user)
      let responseData;
      if(!user) {
        responseData = {
          "error": "email занят",
          "status": "error"
        }
      } else {
        responseData = {
          "data": {
            "id": user.id,
            "email": user.email,
            "name": user.name,
            "contactPhone": user.contactPhone,
          },
          "status": "ok"
        }
      }
      console.log(responseData)
      res.status(201).send(responseData);
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
