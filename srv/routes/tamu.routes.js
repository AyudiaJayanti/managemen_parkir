const express = require('express')
const router = express.Router()
const tamuController =   require('../controllers/tamu.controller');

router.get('/', tamuController.findAll);

router.post('/', tamuController.create);

router.get('/:id', tamuController.findById);

router.put('/', tamuController.update);

router.delete('/:id', tamuController.delete);

module.exports = router