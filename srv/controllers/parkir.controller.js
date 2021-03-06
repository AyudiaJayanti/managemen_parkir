'use strict';

const model = require('../models/index');

var server = require('../index');

exports.findAll = async function(req, res) {

    await model.parkir.findAndCountAll().then((data) => {
            
        model.parkir.findAll({                        
            include: ['siswa', 'guru', 'tamu']
        }).then((parkirs) => {
            res.status(200).json({
                'success': 1,
                'data': parkirs,             
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
    server.io.sockets.emit('newChange')
};

exports.findById = async function(req, res) { 
    await model.parkir.findOne({
        where: {
            id: req.params.id
        },
        include: ['siswa', 'guru', 'tamu']
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

    if (req.body.jenis == 1) { // motor
        if (visitor_id.length > 9) {  // masuk guru
            const guru = await model.guru.findOne({
                where: {
                    nip: visitor_id
                }, 
                include: ['parkirs', 'kendaraans']
            }).catch(function(err) {
    
            })
            
            if (guru){

                var kendaraans = []
                guru.kendaraans.forEach(function(element){
                    kendaraans.push(element.jenis)
                })

                if (kendaraans.includes(1)) {
                    var parkir = false
                    guru.parkirs.forEach(function(element){                
                        parkir = element.keluar == null
                    });
        
                    if (!parkir) {
                        await model.parkir.create({
                            id: "",
                            visitor_id: guru.nip,
                            role: 1,
                            masuk: new Date(),
                            keluar: null
                        }).then((parkir) => {
                            server.io.sockets.emit('newParkir', parkir)
                            res.status(200).json({
                                'success' : 1,
                                'messages': 'Parkir Berhasil',
                                'data': parkir,
                            })
                        }).catch((err) => {
                            
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
                        'messages': 'Anda tidak memiliki akses untuk motor',
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
    
        } else {  // masuk siswa 
            const siswa = await model.siswa.findOne({
                where: {
                    nis: visitor_id
                }, 
                include: ['parkirs', 'kendaraans']
            }).catch((err) => {
    
            })
                    
            if (siswa) { 

                var kendaraans = []
                siswa.kendaraans.forEach(function(element){
                    kendaraans.push(element.jenis)
                })

                if (kendaraans.includes(1)) {
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
                            server.io.sockets.emit('newParkir', parkir)
                            res.status(200).json({
                                'success' : 1,
                                'messages': 'Parkir Berhasil',
                                'data': parkir,
                            })
                        }).catch((err) => {
        
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
                        'messages': 'Anda Tidak Memiliki Akses Untuk Motor',
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

    } else { // mobil
        if (visitor_id.length > 9) {  // masuk guru
            const guru = await model.guru.findOne({
                where: {
                    nip: visitor_id
                }, 
                include: ['parkirs', 'kendaraans']
            }).catch(function(err) {
    
            })
            
            if (guru){

                var kendaraans = []
                guru.kendaraans.forEach(function(element){
                    kendaraans.push(element.jenis)
                })

                if (kendaraans.includes(2)) {
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
                            server.io.sockets.emit('newParkir', parkir)
                            res.status(200).json({
                                'success' : 1,
                                'messages': 'Parkir Berhasil',
                                'data': parkir,
                            })
                        }).catch((err) => {
                            
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
                        'messages': 'Anda tidak memiliki akses untuk Mobil',
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
    
        } else {  // masuk siswa 
            const siswa = await model.siswa.findOne({
                where: {
                    nis: visitor_id
                }, 
                include: ['parkirs', 'kendaraans']
            }).catch((err) => {
    
            })
                    
            if (siswa) { 

                var kendaraans = []
                siswa.kendaraans.forEach(function(element){
                    kendaraans.push(element.jenis)
                })

                if (kendaraans.includes(2)) {
                    var parkir = false
                    
                    siswa.parkirs.forEach(function(element){                
                        parkir = element.keluar == null
                    });
        
                    if (!parkir) {  
                        await model.parkir.create({
                            id: '',
                            visitor_id: siswa.nis,
                            role: 2,
                            masuk: new Date(),
                            keluar: null
                        }).then((parkir) => {
                            server.io.sockets.emit('newParkir', parkir)
                            res.status(200).json({
                                'success' : 1,
                                'messages': 'Parkir Berhasil',
                                'data': parkir,
                            })
                        }).catch((err) => {
        
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
                        'messages': 'Anda tidak memiliki akses untuk Mobil',
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
    }
        
};

exports.exit = async function(req, res) {
    
    var updated_parkir;

    await model.parkir.findOne({
        where: {
            visitor_id: req.body.visitor_id,
            keluar: null
        }, 
        include: ['siswa', 'guru']
    }).then((parkir) => {
        updated_parkir = parkir

        model.parkir.update({
            keluar: new Date(),
        }, {
            where: { id: parkir.id },
            returning: true,
            plain: true
        }).then((parkir) => {   
            server.io.sockets.emit('exitParkir', parkir)
            res.status(200).json({
                'success': 1,
                'messages': 'Berhasil Keluar',
                'data': updated_parkir
            })
            
        }).catch(function(err) {
            res.status(400).json({
                'success': 0,
                'messages': 'error',
                'error': err.message,
                'data': {}
            })
        })                    

    }).catch(function(err) {
        res.status(400).json({
            'success': 0,
            'messages': 'Anda Belum Parkir',
            'data': {}
        })
    })
};

const { Op, DATE } = require('sequelize')

exports.laporan = async function(req, res) {
    
    await model.parkir.findAndCountAll().then((data) => {

        model.parkir.findAll({                     
            where: {
                masuk: {
                    [Op.gt]: req.body.from,
                    [Op.lte]: req.body.to
                }
            },
            include: ['siswa', 'guru', 'tamu']
        }).then((parkirs) => {
            res.status(200).json({
                'success': 1,
                'data': parkirs,   
                'count': data.count, 
            });
        }).catch((err) => {
            res.status(400).json({
                'success': 0,
                'data': null,      
                'message': err.message, 
            });
        })
    })
};

import moment from 'moment'

exports.parkingOfTheWeek = async function(req, res) {

    var parkir = {
        siswa: [],
        guru: [],
        tamu: []
    }

    var siswa=0, guru=0, tamu=0

    for (let i = 1; i <= 7; i++) {
        
        siswa=0 
        guru=0 
        tamu=0

        await model.parkir.findAll({
            include: ['siswa', 'guru', 'tamu'],
            where: {
                masuk: {
                    [Op.gte]: moment().startOf('isoWeek').weekday(i).hour(6).minute(59),
                    [Op.lte]: moment().startOf('isoWeek').weekday(i+1).hour(6).minute(59),
                }, 
            },
        }).then((parkirs) => {
            parkirs.forEach(element => {
                if(element.siswa != null) {
                    siswa++
                } else if(element.guru != null) {
                    guru++
                } else {
                    tamu++
                }
            });

            parkir.guru.push(guru)
            parkir.siswa.push(siswa)
            parkir.tamu.push(tamu)
        }).catch(function(err) {
            res.status(400).json({
                'success': 0,
                'messages': err.message,
                'data': {},
            })
        });
    }

    // rudiaditya2009@gmail.com

    res.json(parkir)
    
};
