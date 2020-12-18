const express = require('express')
const router = express.Router()
const express_io = require('express.io')
const router_io = express_io().http().io()

const parkirController =   require('../controllers/parkir.controller');

router_io.io.route('getall', function(req) {
    req.io.response({
        success: 'here is your acknowledegment for the ready event'
    })
})

router.get('/', parkirController.findAll);

router.post('/', parkirController.create);

router.post('/laporan', parkirController.laporan);

router.get('/', parkirController.getAll);

router.get('/parkingOfTheWeek', parkirController.parkingOfTheWeek);

router.get('/:id', parkirController.findById);

router.put('/', parkirController.update);

router.delete('/:id', parkirController.delete);

router.post('/enter', parkirController.enter);

router.post('/exit', parkirController.exit);

module.exports = router