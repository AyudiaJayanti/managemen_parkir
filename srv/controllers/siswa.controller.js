'use strict';
const model = require('../models/index');

exports.findAll = async function(req, res) {
    let limit = 10;   
    let offset = 0;

    await model.siswa.findAndCountAll().then((data) => {

        let page = req.params.page;
        let pages = Math.ceil(data.count / limit);
            offset = limit * (page - 1);
            
        model.siswa.findAll({                
            limit: limit,
            offset: offset,                            
        }).then((siswas) => {
            res.status(200).json({
                'sucess': 1,
                'data': siswas, 
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
    var nis = req.body.nis
    var nama = req.body.nama
    
    await model.siswa.create({
        nis,
        nama,        
    }).then((siswa) => {
        res.status(200).json({
            'success' : 1,
            'messages': 'Siswa berhasil ditambahkan',
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

exports.findById = async function(req, res) {
      
    await model.siswa.findOne({
        where: {
            nis: req.params.nis
        },
        include: 'parkirs'
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
