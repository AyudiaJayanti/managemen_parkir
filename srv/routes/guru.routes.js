const express = require('express')
const router = express.Router()
const guruController =   require('../controllers/guru.controller');

router.get('/', guruController.findAll);

router.post('/', guruController.create);

router.get('/:nip', guruController.findById);

router.put('/', guruController.update);

router.delete('/:nip', guruController.delete);

module.exports = router