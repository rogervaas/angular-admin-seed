'use strict';
var express = require('express'), 
    router = express.Router(), 
    db = require('../models');

// list meta
router.get('/list/:page/:limit', function(req, res){
    var limit = (req.params.limit)? req.params.limit: 10;
    var offset = (req.params.page)? limit * (req.params.page - 1): 0;
    db.Usermeta.findAndCountAll({
        include: [],
        limit: limit,
        offset: offset

    }).then(function(usermeta) {
        res.send(JSON.stringify(usermeta));
    });
});

// new meta 
router.post('/create', function(req, res){
    if (req.body.id) {
        db.Usermeta.find({ 
            where: {
                id: req.body.id
            } 
        }).then(function(usermeta) {
            if (usermeta) {
                usermeta.updateAttributes({
                    metaKey: req.body.metaKey,
                    metaValue: req.body.metaValue
                }).then(function() {
                    res.send(JSON.stringify(usermeta));
                });
            }
        }).catch(function(e){
            res.status(500).send(JSON.stringify(e));
        });
    } else {
        db.Usermeta.create({
            UserId: req.body.UserId,
            metaKey: req.body.metaKey,
            metaValue: req.body.metaValue
        }).then(function(usermeta){
            res.send(JSON.stringify(usermeta));
        }).catch(function(e){
            res.status(500).send(JSON.stringify(e));
        });
    }
});

// delete meta
router.delete('/delete/:id', function(req, res){
    res.send(JSON.stringify({}));
});

// user detail
router.get('/view/:id', function(req, res){
    db.Usermeta.findOne({
        where: {
            id: req.params.id
        }
    }).then(function(usermeta){
        res.send(JSON.stringify(usermeta));
    }).catch(function(e){
        res.status(500).send(JSON.stringify(e));
    });
});

// user detail by userId
router.get('/getDataByUserId/:userId', function(req, res){
    db.Usermeta.findAll({
        where: {
            UserId: req.params.userId
        }
    }).then(function(usermeta){
        res.send(JSON.stringify(usermeta));
    }).catch(function(e){
        res.status(500).send(JSON.stringify(e));
    });
});

// update user
router.put('/update/:id', function(req, res){
    db.Usermeta.find({ 
        where: {
            id: req.params.id
        } 
    }).then(function(usermeta) {
        if (usermeta) {
            usermeta.updateAttributes({
                metaKey: req.body.metaKey,
                metaValue: req.body.metaValue
            }).then(function() {
                res.send(JSON.stringify(usermeta));
            });
        }
    }).catch(function(e){
        res.status(500).send(JSON.stringify(e));
    });
});

module.exports = router;
