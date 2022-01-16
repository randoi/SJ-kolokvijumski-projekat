const { Business_Class} = require('../models');
const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwt_decode = require('jwt-decode');
const Joi = require('joi');

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

function authToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.status(401).json({ msg: err });
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
        if (err) return res.status(403).json({ msg: err });
    
        req.user = user;
    
        next();
    });
}

route.use(authToken);

route.get('/business_class', (req, res) => {

    Business_Class.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
    
});

route.get('/business_class/:id', (req, res) => {

    schema = Joi.object({
        id: Joi.number().integer()
    })
    schema.validate({ id: req.params.id }, (err, value) => {
        if (err) {
            return res.status(400).json({ msg: 'Invalid data format!' });
        }
    });
    Business_Class.findOne({ where: { id: req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.post('/business_class/create', (req, res) => {
    
    const obj = {
        seat_number: req.body.seat_number,
        tv: req.body.tv,
        bed: req.body.bed,
        massage: req.body.massage,
        console_for_games: req.body.console_for_games,
        userId: req.body.userId,
        flightId: req.body.flightId
    }
    schema = Joi.object({
        seat_number: Joi.number().integer(),
        tv: Joi.string().valid('Yes','No'),
        bed: Joi.string().valid('Yes','No'),
        massage: Joi.string().valid('Yes','No'),
        console_for_games: Joi.string(),
        userId: Joi.number().integer(),
        flightId: Joi.number().integer()
    })
    schema.validate(obj, (err, value) => {
        if (err) {
            return res.status(400).json({ msg: 'Invalid data format!' });
        }
    });
    Business_Class.create(obj)
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.put('/business_class/:id/update', (req, res) => {
    
    const obj = {
        id: req.params.id,
        seat_number: req.body.seat_number,
        tv: req.body.tv,
        bed: req.body.bed,
        massage: req.body.massage,
        console_for_games: req.body.console_for_games,
        userId: req.body.userId,
        flightId: req.body.flightId
    }
    schema = Joi.object({
        id: Joi.number().integer(),
        seat_number: Joi.number().integer(),
        tv: Joi.string().valid('Yes','No'),
        bed: Joi.string().valid('Yes','No'),
        massage: Joi.string().valid('Yes','No'),
        console_for_games: Joi.string(),
        userId: Joi.number().integer(),
        flightId: Joi.number().integer()
    })
    schema.validate(obj, (err, value) => {
        if (err) {
            return res.status(400).json({ msg: 'Invalid data format!' });
        }
    });
    Business_Class.findOne({ where: { id: req.params.id } })
        .then( bc => {
            bc.seat_number = req.body.seat_number,
            bc.tv = req.body.tv,
            bc.bed = req.body.bed,
            bc.massage = req.body.massage,
            bc.console_for_games = req.body.console_for_games,
            bc.userId = req.body.userId,
            bc.flightId = req.body.flightId

            bc.save()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );

});

route.delete('/business_class/:id/delete', (req, res) => {
    
    schema = Joi.object({
        id: Joi.number().integer()
    })
    schema.validate({ id: req.params.id }, (err, value) => {
        if (err) {
            return res.status(400).json({ msg: 'Invalid data format!' });
        }
    });
    Business_Class.findOne({ where: { id: req.params.id } })
        .then( usr => {
            usr.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});

module.exports = route;