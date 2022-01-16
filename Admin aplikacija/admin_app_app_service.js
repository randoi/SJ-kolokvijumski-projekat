const express = require('express');
const { sequelize } = require('./models');
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

function getCookies(req) {
    if (req.headers.cookie == null) return {};

    const rawCookies = req.headers.cookie.split('; ');
    const parsedCookies = {};

    rawCookies.forEach( rawCookie => {
        const parsedCookie = rawCookie.split('=');
        parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });

    return parsedCookies;
};

function authToken(req, res, next) {
    const cookies = getCookies(req);
    const token = cookies['token'];
  
    if (token == null) return res.redirect(302, '/admin/login');
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
        if (err) return res.redirect(302, '/admin/login');
    
        req.user = user;
    
        next();
    });
}


app.use(express.static(path.join(__dirname, 'static')));

app.get('/admin/login', (req, res) => {
    res.clearCookie('token', { path: '/admin' });
    res.sendFile('login.html', { root: './static/html' });
});

app.get('/admin',authToken, (req, res) => {
    res.sendFile('index.html', { root: './static/html' });
});

app.get('/admin/index.html',authToken, (req, res) => {
    res.sendFile('index.html', { root: './static/html' });
});

app.get('/admin/flightGUI.html',authToken, (req, res) => {
    res.sendFile('flightGUI.html', { root: './static/html' });
});

app.get('/admin/userGUI.html',authToken, (req, res) => {
    res.sendFile('userGUI.html', { root: './static/html' });
});

app.get('/admin/businessClassGUI.html',authToken, (req, res) => {
    res.sendFile('businessClassGUI.html', { root: './static/html' });
});

app.get('/admin/middleClassGUI.html',authToken, (req, res) => {
    res.sendFile('middleClassGUI.html', { root: './static/html' });
});

app.get('/admin/economyClassGUI.html',authToken, (req, res) => {
    res.sendFile('economyClassGUI.html', { root: './static/html' });
});

app.get('/admin/updateUserGUI.html',authToken, (req, res) => {
    res.sendFile('updateUserGUI.html', { root: './static/html' });
});

app.get('/admin/updateFlightGUI.html',authToken, (req, res) => {
    res.sendFile('updateFlightGUI.html', { root: './static/html' });
});

app.get('/admin/updateEconomyClassGUI.html',authToken, (req, res) => {
    res.sendFile('updateEconomyClassGUI.html', { root: './static/html' });
});

app.get('/admin/updateMiddleClassGUI.html',authToken, (req, res) => {
    res.sendFile('updateMiddleClassGUI.html', { root: './static/html' });
});

app.get('/admin/updateBusinessClassGUI.html',authToken, (req, res) => {
    res.sendFile('updateBusinessClassGUI.html', { root: './static/html' });
});

app.get('/', authToken, (req, res) => {
    res.sendFile('index.html', { root: './static/html' });
});

app.listen({ port: 8000 }, async () => {
    await sequelize.authenticate();
    console.log('Application Service Started');
});