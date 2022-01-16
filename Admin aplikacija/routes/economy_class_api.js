const { Economy_Class} = require('../models');
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

route.get('/economy_class', (req, res) => {

    Economy_Class.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
    
});

route.get('/economy_class/:id', (req, res) => {

    schema = Joi.object({
        id: Joi.number().integer()
    })
    schema.validate({ id: req.params.id }, (err, value) => {
        if (err) {
            return res.status(400).json({ msg: 'Invalid data format!' });
        }
    });
    Economy_Class.findOne({ where: { id: req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.post('/economy_class/create', (req, res) => {
    
    const obj = {
        seat_number: req.body.seat_number,
        meal: req.body.meal,
        drink: req.body.drink,
        handbag: req.body.handbag,
        special_needs: req.body.special_needs,
        userId: req.body.userId,
        flightId: req.body.flightId
    }
    schema = Joi.object({
        seat_number: Joi.number().integer(),
        meal: Joi.string().valid('Yes','No'),
        drink: Joi.string().valid('Yes','No'),
        handbag: Joi.string().valid('Yes','No'),
        special_needs: Joi.string(),
        userId: Joi.number().integer(),
        flightId: Joi.number().integer()
    })
    schema.validate(obj, (err, value) => {
        if (err) {
            return res.status(400).json({ msg: 'Invalid data format!' });
        }
    });
    Economy_Class.create(obj)
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.put('/economy_class/:id/update', (req, res) => {
    
    const obj = {
        id: req.params.id,
        seat_number: req.body.seat_number,
        meal: req.body.meal,
        drink: req.body.drink,
        handbag: req.body.handbag,
        special_needs: req.body.special_needs,
        userId: req.body.userId,
        flightId: req.body.flightId
    }
    schema = Joi.object({
        id: Joi.number().integer(),
        seat_number: Joi.number().integer(),
        meal: Joi.string().valid('Yes','No'),
        drink: Joi.string().valid('Yes','No'),
        handbag: Joi.string().valid('Yes','No'),
        special_needs: Joi.string(),
        userId: Joi.number().integer(),
        flightId: Joi.number().integer()
    })
    schema.validate(obj, (err, value) => {
        if (err) {
            return res.status(400).json({ msg: 'Invalid data format!' });
        }
    });
    Economy_Class.findOne({ where: { id: req.params.id } })
        .then( ec => {
            ec.seat_number = req.body.seat_number,
            ec.meal = req.body.meal,
            ec.drink = req.body.drink,
            ec.handbag = req.body.handbag,
            ec.special_needs = req.body.special_needs,
            ec.userId = req.body.userId,
            ec.flightId = req.body.flightId

            ec.save()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );

});

route.delete('/economy_class/:id/delete', (req, res) => {

    schema = Joi.object({
        id: Joi.number().integer()
    })
    schema.validate({ id: req.params.id }, (err, value) => {
        if (err) {
            return res.status(400).json({ msg: 'Invalid data format!' });
        }
    });
    Economy_Class.findOne({ where: { id: req.params.id } })
        .then( usr => {
            usr.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});

module.exports = route;