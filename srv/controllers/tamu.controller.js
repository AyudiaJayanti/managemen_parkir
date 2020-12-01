'use strict';
const model = require('../models/index');
const kendaraan = require('../models/kendaraan');

exports.findAll = async function(req, res) {
    let limit = 10;   
    let offset = 0;

    await model.tamu.findAndCountAll().then((data) => {

        let page = req.params.page;
        let pages = Math.ceil(data.count / limit);
            offset = limit * (page - 1);
            
        model.tamu.findAll({                
            limit: limit,
            offset: offset, 
            include: ['parkirs']                           
        }).then((tamus) => {
            res.status(200).json({
                'success': 1,
                'data': tamus, 
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

    var {
        nama, instansi, jenis
    } = req.body
    
    await model.tamu.create({
        nama,
        instansi,        
    }).then((tamu) => {
        
        model.parkir.create({
            'visitor_id': tamu.id,
            'role': jenis,
            'masuk': new Date(),
            'keluar': null
        }).then((parkir) => {
            res.status(200).json({
                'success': 1,
                'messages': 'Berhasil Ditambahkan',
                'data': parkir,
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
      
    await model.tamu.findOne({
        where: {
            id: req.params.id
        },
        include: ['parkirs']
    }).then((tamu) => {
        res.json({
            'success': 1,
            'messages': 'Tamu ditemukan',
            'data': tamu,
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
        nama, 
        instansi,                    
    } = req.body;
    
    await model.tamu.update({        
        nama,
        instansi         
    }, {
        where: {
            id: id
        }
    }).then((tamu) => {
        res.json({
            'success': 1,
            'messages': 'tamu berhasil diupdate',
            'data': tamu,
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
    
    await model.tamu.destroy({ where: {
        id: id
    }}).then((tamu) => {
        res.json({
            'success': 1,
            'messages': 'tamu berhasil dihapus',
            'data': tamu,
        })        
    }).catch(function(err){
        res.status(400).json({
            'success': 0,
            'messages': err.message,
            'data': {},
        })
    });              
};


