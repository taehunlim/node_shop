const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//mongoose : save, find, update 등등

const userModel = require('../models/user');





router.post('/signup', (req, res) => {
    const user = new userModel({
        _id : new mongoose.Types.ObjectId(),
       email : req.body.email,
       password : req.body.password

    });
    user.save()
        .then(user => {
            res.status(200).json({
                msg : "created sign up",
                createdUser : user
            });
        })
        .catch(err => {
            res.status(500).json({
                errInfo : err
            });
        });
});








module.exports = router;