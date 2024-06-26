// контроллер поиска, создания и "псевдо" удаления объявления из БД
const AdvertisementService = require('../services/AdvertisementService');

class AdvertisementController {
  // создание объявления из тела запроса
  static async createAdvertisement(req, res) {
    try {
      const { shortText, description, tags, user } = req.body;
      const parsedUser = JSON.parse(user);

      const advertisementData = {
        shortText,
        description,
        tags,
        userId: parsedUser.id,
      };

      if (req.files) {
        advertisementData.images = req.files.map(file => file.path);
      }
      const advertisement =
        await AdvertisementService.create(advertisementData);

      res.status(201).send({
        data: [
          {
            id: advertisement.id,
            shortTitle: advertisement.shortTitle,
            description: advertisement.description,
            images: advertisement.images,
            user: {
              id: parsedUser.id,
              name: parsedUser.name,
            },
            createdAt: advertisement.createdAt,
          },
        ],
        status: 'ok',
      });
    } catch (err) {
      res.status(500).send(err);
    }
  }

  // поиск объявления
  static async findAdvertisement(req, res) {
    try {
      const advertisementFound = await AdvertisementService.find(req.body);
      if (advertisementFound.length === 0) {
        res.status(200).send([{ error: `Объявлений нет` }]);
      } else {
        res.status(200).send({
          data: advertisementFound,
          status: 'ok',
        });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }

  // "псевдо" удаление объявления
  static async removeById(req, res) {
    try {
      const advertisementRemoved = await AdvertisementService.remove(
        req.params.id,
      );
      res.status(200).send(advertisementRemoved);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  // все объявления
  static async getAllAdvertisements(req, res) {
    try {
      const allAdvertisements = await AdvertisementService.getAll();
      if (allAdvertisements.length === 0) {
        res.status(200).send([{ error: `Объявлений нет` }]);
      } else {
        res.status(200).send({
          data: allAdvertisements,
          status: 'ok',
        });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }
}

module.exports = AdvertisementController;
