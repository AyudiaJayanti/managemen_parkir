const express = require('express')
const router = express.Router()
const parkirController =   require('../controllers/parkir.controller');

router.get('/', parkirController.findAll);

router.post('/', parkirController.create);

router.post('/laporan', parkirController.laporan);

router.get('/', parkirController.getAll);

router.get('/:id', parkirController.findById);

router.put('/', parkirController.update);

router.delete('/:id', parkirController.delete);

router.post('/enter', parkirController.enter);

router.post('/exit', parkirController.exit);

module.exports = router