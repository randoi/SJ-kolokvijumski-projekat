const { User } = require('../models');
const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');
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

route.get('/user', (req, res) => {

    obj = jwt_decode(req.headers['authorization']);

    if (obj.role == 'Admin') {
        User.findAll()
            .then(rows => res.json(rows))
            .catch(err => res.status(500).json(err));
    } else {
        return res.status(401).json({ msg: 'You are not authorized to perform this action!' });
    }

});

route.get('/user/:id', (req, res) => {

    obj = jwt_decode(req.headers['authorization']);

    if (obj.role == 'Admin') {

        schema = Joi.object({
            id: Joi.number().integer()
        })
        schema.validate({ id: req.params.id }, (err, value) => {
            if(err) {
                return res.status(400).json({ msg: 'Invalid data format!' });
            }
        });
        User.findOne({ where: { id: req.params.id } })
            .then(rows => res.json(rows))
            .catch(err => res.status(500).json(err));
    } else {
        return res.status(401).json({ msg: 'You are not authorized to perform this action!' });
    }

});

route.post('/user/create', (req, res) => {

    obj = jwt_decode(req.headers['authorization']);

    if (obj.role == 'Admin') {
        const obj2 = {
            first_name: req.body.name,
            last_name: req.body.surname,
            age: req.body.age,
            gender: req.body.gender,
            address: req.body.address,
            phone_number: req.body.phone,
            username: req.body.username,
            role: req.body.role,
            password: req.body.password
        }
        schema = Joi.object({
            first_name: Joi.string(),
            last_name: Joi.string(),
            age: Joi.number().integer(),
            gender: Joi.string().valid('Male', 'Female'),
            address: Joi.string(),
            phone_number: Joi.string().pattern(new RegExp('[0-9][0-9][0-9]-[0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]?')),
            username: Joi.string(),
            password: Joi.string().min(8),
            role: Joi.string().valid('Admin', 'Moderator')
        })
        schema.validate(obj2, (err, value) => {
            if(err) {
                return res.status(400).json({ msg: 'Invalid data format!' });
            }
        });
        obj2.password = bcrypt.hashSync(req.body.password, 8);
        User.create(obj2)
            .then(rows => res.json(rows))
            .catch(err => res.status(500).json(err));
    } else {
        return res.status(401).json({ msg: 'You are not authorized to perform this action!' });
    }

});

route.put('/user/:id/update', (req, res) => {

    obj = jwt_decode(req.headers['authorization']);

    if (obj.role == 'Admin') {
        const obj2 = {
            id: req.params.id,
            first_name: req.body.name,
            last_name: req.body.surname,
            age: req.body.age,
            gender: req.body.gender,
            address: req.body.address,
            phone_number: req.body.phone,
            username: req.body.username,
            role: req.body.role,
            password: req.body.password
        }
        schema = Joi.object({
            id: Joi.number().integer(),
            first_name: Joi.string(),
            last_name: Joi.string(),
            age: Joi.number().integer(),
            gender: Joi.string().valid('Male', 'Female'),
            address: Joi.string(),
            phone_number: Joi.string().pattern(new RegExp('[0-9][0-9][0-9]-[0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]?')),
            username: Joi.string(),
            password: Joi.string().min(8),
            role: Joi.string().valid('Admin', 'Moderator')
        })
        schema.validate(obj2, (err, value) => {
            if(err) {
                return res.status(400).json({ msg: 'Invalid data format!' });
            }
        });
        User.findOne({ where: { id: req.params.id } })
            .then(usr => {
                usr.first_name = req.body.name;
                usr.last_name = req.body.surname;
                usr.age = req.body.age;
                usr.gender = req.body.gender;
                usr.address = req.body.address;
                usr.phone_number = req.body.phone;
                usr.username = req.body.username;
                usr.password = bcrypt.hashSync(req.body.password, 8);

                usr.save()
                    .then(rows => res.json(rows))
                    .catch(err => res.status(500).json(err));
            })
            .catch(err => res.status(500).json(err));
    } else {
        return res.status(401).json({ msg: 'You are not authorized to perform this action!' });
    }

});

route.delete('/user/:id/delete', (req, res) => {

    obj = jwt_decode(req.headers['authorization']);

    if (obj.role == 'Admin') {
        schema = Joi.object({
            id: Joi.number().integer()
        })
        schema.validate({ id: req.params.id }, (err, value) => {
            if(err) {
                return res.status(400).json({ msg: 'Invalid data format!' });
            }
        });
        User.findOne({ where: { id: req.params.id } })
            .then(usr => {
                usr.destroy()
                    .then(rows => res.json(rows))
                    .catch(err => res.status(500).json(err));
            })
            .catch(err => res.status(500).json(err));
    } else {
        return res.status(401).json({ msg: 'You are not authorized to perform this action!' });
    }
});

module.exports = route;