const AdvertisementController = require('../controllers/advertisementController');
const router = require('express').Router();

router.post('/advertisements/create', async (req, res) =>
  AdvertisementController.createAdvertisement(req, res),
);

router.get('/advertisements/find', async (req, res) =>
  AdvertisementController.findAdvertisement(req, res),
);

router.delete('/advertisements/remove/:id', async (req, res) =>
  AdvertisementController.removeById(req, res),
);
