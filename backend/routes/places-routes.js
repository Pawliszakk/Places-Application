const express = require('express');
const router = express.Router();
const placesControllers = require('../controllers/places-controller');

router.get('/user/:uid', placesControllers.getUserPlacesByUserId);

router.get('/:pid', placesControllers.getPlaceById);

router.post('/', placesControllers.createPlace);

router.patch('/:pid', placesControllers.patchPlaceById);

router.delete('/:pid', placesControllers.deletePlaceById);


module.exports = router;
