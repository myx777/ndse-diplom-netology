const AdvertisementController = require('../controllers/AdvertisementController');
const mustAuthenticatedMw = require("../middleware/mustAuthenticatedmw");
const router = require('express').Router();
const fileMulter = require("../middleware/file");

// создание объявлений, принимает все нелбходимые поля по Sсhema
router.post('/', mustAuthenticatedMw, fileMulter.array('Advertisement_imgs', 10), async (req, res) =>
  AdvertisementController.createAdvertisement(req, res),
);

// псевдо-удаление объявлений (выставляет флаг isDelete в true)
router.delete('/:id', mustAuthenticatedMw, async (req, res) =>
    AdvertisementController.removeById(req, res),
);

// поиск объявлений по id
router.get('/find', async (req, res) =>
  AdvertisementController.findAdvertisement(req, res),
);

// все объявления
router.get('/', async (req, res) =>
  AdvertisementController.getAllAdvertisements(req, res),
);

module.exports = router;
