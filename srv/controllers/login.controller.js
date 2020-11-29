'use strict';
const model = require('../models/index');

var bcryptjs = require('bcryptjs')
var salt = bcryptjs.genSaltSync(10);

exports.login = async function(req, res) {


    await model.user.findOne({
        where: {
            email: req.body.email,
        }
    }).then((user)=> {

        bcryptjs.compare(req.body.password, user.password, function (err, result) {
            if (result == true) {
                res.status(200).json({
                    'success': 1,
                    'data': user,
                    'message': 'Berhasil Login'
                }) 
            } else {
                res.status(400).json({
                    'success': 0,
                    'data': null,
                    'message': 'Password Salah',
                    'error': err
                })
            }
        })

    }).catch((err) => {
        res.status(400).json({
            'success': 0,
            'data': null,
            'message': 'Email Tidak Ditemukan',
        })
    });

};