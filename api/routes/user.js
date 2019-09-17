const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//mongoose : save, find, update 등등
const bcrypt = require('bcryptjs');
// 자동 암호화 시켜줌

const userModel = require('../models/user');





router.post('/signup', (req, res) => {
    //bycrpt.hash(req.body.password, 자릿수, (실패했을떄 err, 성공했을떄 hash 에 담긴다)
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err) {
            res.status(500).json({
               errInfo : err
            });
        }
        else{
            const user = new userModel({
                _id : new mongoose.Types.ObjectId(),
                email : req.body.email,
                password : hash

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
        }
    });

});








module.exports = router;