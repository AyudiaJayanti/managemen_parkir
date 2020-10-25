'use strict';
const model = require('../models/index');

exports.findAll = async function(req, res) {
    let limit = 10;   
    let offset = 0;

    await model.guru.findAndCountAll().then((data) => {

        let page = req.params.page;
        let pages = Math.ceil(data.count / limit);
            offset = limit * (page - 1);
            
        model.guru.findAll({                
            limit: limit,
            offset: offset,                            
        }).then((gurus) => {
            res.status(200).json({
                'sucess': 1,
                'data': gurus, 
                'count': data.count, 
                'pages': pages
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
        nama       
    } = req.body;

    await model.guru.create({
        nip,
        nama,        
    }).then((guru) => {
        res.status(200).json({
            'success' : 1,
            'messages': 'Guru berhasil ditambahkan',
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

exports.findById = async function(req, res) { 
    await model.guru.findOne({
        where: {
            nip: req.params.nip
        },
        include: 'parkirs'
    }).then((guru) => {
        res.json({
            'success': 1,
            'messages': 'Guru ditemukan',
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

