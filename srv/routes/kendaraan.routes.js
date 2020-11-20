const express = require('express')
const router = express.Router()
const kendaraanController = require('../controllers/kendaraan.controller');;

router.get('/page/:page', kendaraanController.findAll);

router.post('/', kendaraanController.create);

router.get('/:id', kendaraanController.findById);

router.put('/', kendaraanController.update);

router.delete('/:id', kendaraanController.delete);

module.exports = router