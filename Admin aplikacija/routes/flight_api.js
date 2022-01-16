const { Flight } = require('../models');
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

route.get('/flight', (req, res) => {

    Flight.findAll()
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err));

});

route.get('/flight/:id', (req, res) => {

    schema = Joi.object({
        id: Joi.number().integer()
    })
    schema.validate({ id: req.params.id }, (err, value) => {
        if (err) {
            return res.status(400).json({ msg: 'Invalid data format!' });
        }
    });
    Flight.findOne({ where: { id: req.params.id } })
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err));

});

route.post('/flight/create', (req, res) => {

    const obj = {
        take_off_place: req.body.take_off_place,
        landing_place: req.body.landing_place,
        number_of_passengers: req.body.number_of_passengers,
        take_off_time: req.body.take_off_time,
        landing_time: req.body.landing_time
    }
    schema = Joi.object({
        take_off_place: Joi.string(),
        landing_place: Joi.string(),
        number_of_passengers: Joi.number().integer(),
        take_off_time: Joi.string().pattern(new RegExp('[0-2][0-9]:[0-5][0-9]')),
        landing_time: Joi.string().pattern(new RegExp('[0-2][0-9]:[0-5][0-9]'))
    })
    schema.validate(obj, (err, value) => {
        if (err) {
            return res.status(400).json({ msg: 'Invalid data format!' });
        }
    });
    Flight.create(obj)
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err));

});

route.put('/flight/:id/update', (req, res) => {

    const obj = {
        id: req.params.id,
        take_off_place: req.body.take_off_place,
        landing_place: req.body.landing_place,
        number_of_passengers: req.body.number_of_passengers,
        take_off_time: req.body.take_off_time,
        landing_time: req.body.landing_time
    }
    schema = Joi.object({
        id: Joi.number().integer(),
        take_off_place: Joi.string(),
        landing_place: Joi.string(),
        number_of_passengers: Joi.number().integer(),
        take_off_time: Joi.string().pattern(new RegExp('[0-2][0-9]:[0-5][0-9]')),
        landing_time: Joi.string().pattern(new RegExp('[0-2][0-9]:[0-5][0-9]'))
    })
    schema.validate(obj, (err, value) => {
        if (err) {
            return res.status(400).json({ msg: 'Invalid data format!' });
        }
    });
    Flight.findOne({ where: { id: req.params.id } })
        .then(flt => {
            flt.take_off_place = req.body.take_off_place;
            flt.landing_place = req.body.landing_place;
            flt.number_of_passengers = req.body.number_off_passengers;
            flt.take_off_time = req.body.take_off_time;
            flt.landing_time = req.body.landing_time;

            flt.save()
                .then(rows => res.json(rows))
                .catch(err => res.status(500).json(err));
        })
        .catch(err => res.status(500).json(err));

});

route.delete('/flight/:id/delete', (req, res) => {

    schema = Joi.object({
        id: Joi.number().integer()
    })
    schema.validate({ id: req.params.id }, (err, value) => {
        if (err) {
            return res.status(400).json({ msg: 'Invalid data format!' });
        }
    });
    Flight.findOne({ where: { id: req.params.id } })
        .then(usr => {
            usr.destroy()
                .then(rows => res.json(rows))
                .catch(err => res.status(500).json(err));
        })
        .catch(err => res.status(500).json(err));
});

module.exports = route;