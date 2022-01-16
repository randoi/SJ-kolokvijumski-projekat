const exp = require('express');
const { sequelize, User } = require('./models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = exp();

var corsOptions = {
    origin: 'http://localhost:8000',
    optionsSuccessStatus: 200
}

app.use(exp.json());
app.use(cors(corsOptions));

app.post('/admin/register', (req, res) => {
    
    const user_obj = {
        first_name: req.body.name,
        last_name: req.body.surname,
        age: req.body.age,
        gender: req.body.gender,
        address: req.body.address,
        phone_number: req.body.phone,
        username: req.body.username,
        role: req.body.role,
        password: bcrypt.hashSync(req.body.password, 8)
    };

    User.create(user_obj).then( rows => {

    }).catch( err => res.status(500).json(err) );
});

app.post('/admin/login', (req, res) => {

    User.findOne({ where: { username: req.body.username } })
        .then( usr => {
            if (bcrypt.compareSync(req.body.password, usr.password)) {
                const obj = {
                    userId: usr.id,
                    user: usr.username,
                    role: usr.role
                };
        
                const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);
                
                res.json({ token: token });
            } else {
                res.status(400).json({ msg: "Invalid credentials"});
            }
        })
        .catch( err => res.status(500).json(err) );
});

app.listen({ port: 9000 }, async () => {
    await sequelize.authenticate();
    console.log("Authentification service started");
});