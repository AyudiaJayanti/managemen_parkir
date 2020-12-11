'use strict';
const model = require('../models/index');

exports.findAll = async function(req, res) {

    await model.kendaraan.findAndCountAll().then((data) => {
            
        model.kendaraan.findAll({                
            include: ['siswa', 'guru', 'tamu']
        }).then((kendaraans) => {
            res.status(200).json({
                'success': 1,
                'data': kendaraans, 
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

    var {
        owner_id, no_sim, no_stnk, jenis
    } = req.body
    
    await model.kendaraan.create({
        owner_id,
        no_sim,
        no_stnk,
        jenis
    }).then((kendaraan) => {
        
        res.status(200).json({
            'success' : 1,
            'messages': 'kendaraan berhasil ditambahkan',
            'data': kendaraan,
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
      
    await model.kendaraan.findOne({
        where: {
            id: req.params.id
        },
        include: ['siswa', 'guru', 'tamu']
    }).then((kendaraan) => {
        res.json({
            'success': 1,
            'messages': 'kendaraan ditemukan',
            'data': kendaraan,
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
        owner_id,  
        no_sim,
        no_stnk,
        jenis,
    } = req.body;
    
    await model.kendaraan.update({        
        owner_id,
        no_sim,
        no_stnk,
        jenis           
    }, {
        where: {
            id: id
        }
    }).then((kendaraan) => {
        res.json({
            'success': 1,
            'messages': 'kendaraan berhasil diupdate',
            'data': kendaraan,
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
    
    await model.kendaraan.destroy({ where: {
        id: id
    }}).then((kendaraan) => {
        res.json({
            'success': 1,
            'messages': 'kendaraan berhasil dihapus',
            'data': kendaraan,
        })        
    }).catch(function(err){
        res.status(400).json({
            'success': 0,
            'messages': err.message,
            'data': {},
        })
    });              
};


