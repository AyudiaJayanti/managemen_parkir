'use strict';
const model = require('../models/index');

exports.findAll = async function(req, res) {

    await model.guru.findAndCountAll().then((data) => {

        model.guru.findAll({                
      
            include: ['parkirs', 'kendaraans']                     
        }).then((gurus) => {
            res.status(200).json({
                'success': 1,
                'data': gurus, 
                'count': data.count, 
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

    const {        
        nip, 
        nama,
        no_sim,
        no_stnk,
        jenis    
    } = req.body;

    await model.guru.create({
        nip,
        nama,        
    }).then((guru) => {
        model.kendaraan.create({
            owner_id: nip,  
            no_sim: no_sim,
            no_stnk: no_stnk,
            jenis: jenis
        }).then((kendaraan) => {
            res.status(200).json({
                'success' : 1,
                'messages': 'guru & kendaraan berhasil ditambahkan',
                'data': guru,
            })
        }).catch((err) => {
            res.status(400).json({
                'success': 0,
                'messages': 'kendaraan sudah ada',
                'data': {},
            })
            
            model.guru.destroy({
                where: {
                    nip: guru.nip
                }
            })
        })
    }).catch(function(err) {
        res.status(400).json({
            'success': 0,
            'messages': err.message,
            'data': {},
        })
    });
};

exports.findById = async function(req, res) { 
    await model.guru.findOne({
        where: {
            nip: req.params.nip
        },
        include: ['parkirs', 'kendaraans']
    }).then((guru) => {
        res.json({
            'success': 1,
            'messages': 'Guru ditemukan',
            'data': guru.kendaraans,
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
        nip,     
        nama,                       
    } = req.body;
    
    await model.guru.update({        
        nama,            
    }, {
        where: {
            nip: nip
        }
    }).then((guru) => {
        res.json({
            'success': 1,
            'messages': 'Guru berhasil diupdate',
            'data': guru,
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
    const nip = req.params.nip;
    
    await model.guru.destroy({ where: {
        nip: nip
    }}).then((guru) => {
        res.json({
            'success': 1,
            'messages': 'Guru berhasil dihapus',
            'data': guru,
        })        
    }).catch(function(err){
        res.status(400).json({
            'success': 0,
            'messages': err.message,
            'data': {},
        })
    });  
};

