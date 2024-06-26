const AdvertisementController = require('../controllers/AdvertisementController');
const router = require('express').Router();

// создание объявлений, принимает все нелбходимые поля по Sсhema
router.post('/create', async (req, res) =>
  AdvertisementController.createAdvertisement(req, res),
);
// поиск объявлений
router.get('/find', async (req, res) =>
  AdvertisementController.findAdvertisement(req, res),
);
// псевдо-удаление объявлений (выставляет флаг isDelete в true)
router.delete('/remove/:id', async (req, res) =>
  AdvertisementController.removeById(req, res),
);

// все объявления
router.get('/', async (req, res) =>
  AdvertisementController.getAllAdvertisements(req, res),
);

module.exports = router;
