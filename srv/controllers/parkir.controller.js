'use strict';
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

};

exports.exit = async function(req, res) {

};
