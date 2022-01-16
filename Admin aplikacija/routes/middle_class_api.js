const { Middle_Class} = require('../models');
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

route.get('/middle_class', (req, res) => {

    Middle_Class.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
    
});

route.get('/middle_class/:id', (req, res) => {

    schema = Joi.object({
        id: Joi.number().integer()
    })
    schema.validate({ id: req.params.id }, (err, value) => {
        if (err) {
            return res.status(400).json({ msg: 'Invalid data format!' });
        }
    });
    Middle_Class.findOne({ where: { id: req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.post('/middle_class/create', (req, res) => {
    
    const obj = {
        seat_number: req.body.seat_number,
        internet: req.body.internet,
        pet: req.body.pet,
        transport_from_to_airport: req.body.transport_from_to_airport,
        movie_to_watch: req.body.movie_to_watch,
        userId: req.body.userId,
        flightId: req.body.flightId
    }
    
    schema = Joi.object({
        seat_number: Joi.number().integer(),
        internet: Joi.string().valid('Yes','No'),
        pet: Joi.string().valid('Yes','No'),
        transport_from_to_airport: Joi.string().valid('Yes','No'),
        movie_to_watch: Joi.string(),
        userId: Joi.number().integer(),
        flightId: Joi.number().integer()
    })
    schema.validate(obj, (err, value) => {
        if (err) {
            return res.status(400).json({ msg: 'Invalid data format!' });
        }
    });
    Middle_Class.create(obj)
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.put('/middle_class/:id/update', (req, res) => {
    
    const obj = {
        id: req.params.id,
        seat_number: req.body.seat_number,
        internet: req.body.internet,
        pet: req.body.pet,
        transport_from_to_airport: req.body.transport_from_to_airport,
        movie_to_watch: req.body.movie_to_watch,
        userId: req.body.userId,
        flightId: req.body.flightId
    }
    schema = Joi.object({
        id: Joi.string().integer(),
        seat_number: Joi.number().integer(),
        internet: Joi.string().valid('Yes','No'),
        pet: Joi.string().valid('Yes','No'),
        transport_from_to_airport: Joi.string().valid('Yes','No'),
        movie_to_watch: Joi.string(),
        userId: Joi.number().integer(),
        flightId: Joi.number().integer()
    })
    schema.validate(obj, (err, value) => {
        if (err) {
            return res.status(400).json({ msg: 'Invalid data format!' });
        }
    });
    Middle_Class.findOne({ where: { id: req.params.id } })
        .then( mc => {
            mc.seat_number = req.body.seat_number,
            mc.internet = req.body.internet,
            mc.pet = req.body.pet,
            mc.transport_from_to_airport = req.body.transport_from_to_airport,
            mc.movie_to_watch = req.body.movie_to_watch,
            mc.userId = req.body.userId,
            mc.flightId = req.body.flightId

            mc.save()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );

});

route.delete('/middle_class/:id/delete', (req, res) => {

    schema = Joi.object({
        id: Joi.number().integer()
    })
    schema.validate({ id: req.params.id }, (err, value) => {
        if (err) {
            return res.status(400).json({ msg: 'Invalid data format!' });
        }
    });
    Middle_Class.findOne({ where: { id: req.params.id } })
        .then( usr => {
            usr.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});

module.exports = route;