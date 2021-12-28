const { Router } = require('express');
const router = Router();

//controller calls
const controllerGame = require('../controllers/controllerGame');

router.get('/', controllerGame.getNumbers);


module.exports = router