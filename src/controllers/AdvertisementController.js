// контроллер поиска, создания и "псевдо" удаления объявления из БД
const AdvertisementService = require('../services/AdvertisementService');

class AdvertisementController {
  // создание объявления из тела запроса
  async createAdvertisement(req, res) {
    console.log(req)
    try {
      const advertisement = await AdvertisementService.create(req.body);
      res.status(201).send(advertisement);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  // поиск объявления
  async findAdvertisement(req, res) {
    try {
      const advertisementFound = await AdvertisementService.find(req.body);
      res.status(200).send(advertisementFound);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  // "псевдо" удаление объявления
  async removeById(req, res) {
    console.log(req.params.id)
    try {
      const advertisementRemoved = await AdvertisementService.remove(
        req.params.id,
      );
      res.status(200).send(advertisementRemoved);
    } catch (err) {
      res.status(500).send(err);
    }
  }
}

module.exports = new AdvertisementController();
