'use strict';
const model = require('../models/index');
const kendaraan = require('../models/kendaraan');

exports.findAll = async function(req, res) {

    await model.siswa.findAndCountAll().then((data) => {
            
        model.siswa.findAll({                
            include: ['parkirs', 'kendaraans']                         
        }).then((siswas) => {
            res.status(200).json({
                'success': 1,
                'data': siswas, 
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
        nis, nama, no_sim, no_stnk, jenis
    } = req.body
    
    await model.siswa.create({
        nis,
        nama,        
    }).then((siswa) => {
        
        model.kendaraan.create({
            owner_id: nis,  
            no_sim: no_sim,
            no_stnk: no_stnk,
            jenis: jenis
        }).then((kendaraan) => {
            res.status(200).json({
                'success' : 1,
                'messages': 'siswa & kendaraan berhasil ditambahkan',
                'data': siswa,
            })
        }).catch((err) => {
            res.status(400).json({
                'success': 0,
                'messages': 'kendaraan sudah ada',
                'data': {},
            })

            model.siswa.destroy({
                where: {
                    nis: siswa.nis
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
      
    await model.siswa.findOne({
        where: {
            nis: req.params.nis
        },
        include: ['parkirs', 'kendaraans']
    }).then((siswa) => {
        res.json({
            'success': 1,
            'messages': 'Siswa ditemukan',
            'data': siswa,
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
        nis,     
        nama,                     
    } = req.body;
    
    await model.siswa.update({        
        nama,            
    }, {
        where: {
            nis: nis
        }
    }).then((siswa) => {
        res.json({
            'success': 1,
            'messages': 'Siswa berhasil diupdate',
            'data': siswa,
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
    const nis = req.params.nis;
    
    await model.siswa.destroy({ where: {
        nis: nis
    }}).then((siswa) => {
        res.json({
            'success': 1,
            'messages': 'Siswa berhasil dihapus',
            'data': siswa,
        })        
    }).catch(function(err){
        res.status(400).json({
            'success': 0,
            'messages': err.message,
            'data': {},
        })
    });              
};


