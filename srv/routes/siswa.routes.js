const express = require('express')
const router = express.Router()
const siswaController = require('../controllers/siswa.controller');
const { route } = require('./user.routes');

router.get('/page/:page', siswaController.findAll);

router.post('/', siswaController.create);

router.get('/:nis', siswaController.findById);

router.put('/', siswaController.update);

router.delete('/:nis', siswaController.delete);

module.exports = router