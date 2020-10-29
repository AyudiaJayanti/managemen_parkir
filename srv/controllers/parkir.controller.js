'use strict';

const { stat } = require('fs');
const model = require('../models/index');

exports.findAll = async function(req, res) {
    let limit = 10;   
    let offset = 0;

    await model.parkir.findAndCountAll().then((data) => {

        let page = req.params.page;
        let pages = Math.ceil(data.count / limit);

        offset = limit * (page - 1);
            
        model.parkir.findAll({
            limit: limit,
            offset: offset,                          
            include: ['siswa', 'guru']
        }).then((parkirs) => {
            res.status(200).json({
                'sucess': 1,
                'data': parkirs,             
            });
        });    
           

    }).catch(function (err) {
        res.status(400).json({
            'success': 0,
            'messages': err.message,
            'data': {},
        });
    }); 

};

exports.create = async function(req, res) {    
              
};

exports.findById = async function(req, res) { 
    await model.parkir.findOne({
        where: {
            id: req.params.id
        },
        include: ['siswa', 'guru']
    }).then((parkir) => {
        res.json({
            'success': 1,
            'messages': 'Parkir ditemukan',
            'data': parkir,
        })
    }).catch(function(err) {
        res.status(400).json({
            'success': 0,
            'messages': err.message,
            'data': {},
        })
    });
};

exports.update = async function(req, res) {
    const {   
        id,     
        visitor_id,
        role,
        masuk,
        keluar
    } = req.body;
    
    await model.parkir.update({                    
        visitor_id,
        role,
        masuk,
        keluar,            
    }, {
        where: {
            id: id
        }
    }).then((parkir) => {
        res.json({
            'success': 1,
            'messages': 'Parkir berhasil diupdate',
            'data': parkir,
        })
    }).catch(function(err) {
        res.status(400).json({
            'success': 0,
            'messages': err.message,
            'data': {},
        })            
    });
};

exports.delete = async function(req, res) {
    const id = req.params.id;
    
    await model.parkir.destroy({ where: {
        id: id
    }}).then((parkir) => {
        res.json({
            'success': 1,
            'messages': 'Parkir berhasil dihapus',
            'data': parkir,
        })        
    }).catch(function(err){
        res.status(400).json({
            'success': 0,
            'messages': err.message,
            'data': {},
        })
    });
};

exports.enter = async function(req, res) {
    const visitor_id = req.body.visitor_id;    

    if (visitor_id.length > 9) {  // masuk guru
        const guru = await model.guru.findOne({
            where: {
                nip: visitor_id
            }, 
            include: 'parkirs'
        })
                
        if (guru) { 
            var parkir = false
            guru.parkirs.forEach(function(element){                
                parkir = element.keluar == null
            });

            if (!parkir) { 
                await model.parkir.create({
                    id: "",
                    visitor_id: guru.nip,
                    role: 2,
                    masuk: new Date(),
                    keluar: null
                }).then((parkir) => {
                    res.status(200).json({
                        'success' : 1,
                        'messages': 'Parkir Berhasil',
                        'data': parkir,
                    })
                })
            } else {
                res.status(400).json({
                    'success': 0,
                    'messages': 'Anda sudah parkir',
                    'data': {},
                }) 
            }
        } else {
            res.status(400).json({
                'success': 0,
                'messages': 'Anda belum terdaftar',
                'data': {},
            })
        }

    } else if (visitor_id) {  // masuk siswa 
        const siswa = await model.siswa.findOne({
            where: {
                nis: visitor_id
            }, 
            include: 'parkirs'
        })
                
        if (siswa) { 
            var parkir = false
            
            siswa.parkirs.forEach(function(element){                
                parkir = element.keluar == null
            });

            if (!parkir) {  
                await model.parkir.create({
                    id: '',
                    visitor_id: siswa.nis,
                    role: 1,
                    masuk: new Date(),
                    keluar: null
                }).then((parkir) => {
                    res.status(200).json({
                        'success' : 1,
                        'messages': 'Parkir Berhasil',
                        'data': parkir,
                    })
                })
            } else { 
                res.status(400).json({
                    'success': 0,
                    'messages': 'Anda sudah parkir',
                    'data': {},
                }) 
            }
        } else {
            res.status(400).json({
                'success': 0,
                'messages': 'Anda belum terdaftar',
                'data': {},
            })
        }
    }
        
};

exports.exit = async function(req, res) {
    
    await model.parkir.findOne({
        where: {
            visitor_id: req.body.visitor_id,
            keluar: null
        }, 
        include: ['siswa', 'guru']
    }).then((parkir) => {

        model.parkir.update({
            keluar: new Date(),
        }, {
            where: { id: parkir.id },
            returning: true,
            plain: true
        }).then((parkir) => {            
            res.status(200).json({
                'success': 1,
                'message': 'Berhasil Keluar',
                'data': parkir
            })
        }).catch(function(err) {
            res.status(400).json({
                'success': 0,
                'message': 'error',
                'error': err.message,
                'data': {}
            })
        })                    

    }).catch(function(err) {
        res.status(400).json({
            'success': 0,
            'message': 'Anda Belum Parkir',
            'data': {}
        })
    })
};