'use strict';
const model = require('../models/index');

import bcryptjs from 'bcryptjs'

var salt = 10;

exports.findAll = async function(req, res) {

    await model.user.findAndCountAll().then((data) => {
            
        model.user.findAll().then((users) => {
            res.status(200).json({
                'sucess': 1,
                'data': users, 
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
        name,
        email,
        password
    } = req.body;
    
    await bcryptjs.hash(password, salt, function(err, hash){
        model.user.create({
            name,        
            email,
            password: hash
        }).then((user) => {
            res.status(200).json({
                'success' : 1,
                'messages': 'user berhasil ditambahkan',
                'data': user,
            })
        }).catch(function(err) {
            res.status(400).json({
                'success': 0,
                'messages': err.message,
                'data': {},
            })
        });                 
    })

};

exports.findById = async function(req, res) {
      
    await model.user.findOne({
        where: {
            id: req.params.id
        },
        include: 'parkirs'
    }).then((user) => {
        res.json({
            'success': 1,
            'messages': 'user ditemukan',
            'data': user,
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
    var {   
        id,     
        name,    
        email,
        password                 
    } = req.body;
    
    await bcryptjs.hash(password, salt, function(err, hash){
        model.user.update({        
            name, 
            email,
            password: hash
        }, {
            where: {
                id: id
            }
        }).then((user) => {
            res.json({
                'success': 1,
                'messages': 'user berhasil diupdate',
                'data': user,
            })
        }).catch(function(err) {
            res.status(400).json({
                'success': 0,
                'messages': err.message,
                'data': {},
            })            
        }) 
    })    
};

exports.delete = async function(req, res) {
    const id = req.params.id;
    
    await model.user.destroy({ where: {
        id: id
    }}).then((user) => {
        res.json({
            'success': 1,
            'messages': 'user berhasil dihapus',
            'data': user,
        })        
    }).catch(function(err){
        res.status(400).json({
            'success': 0,
            'messages': err.message,
            'data': {},
        })
    });              
};



