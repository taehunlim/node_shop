const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//mongoose : save, find, update 등등
const bcrypt = require('bcryptjs');
// 자동 암호화 시켜줌

const userModel = require('../models/user');





router.post('/signup', (req, res) => {

    // 회원정보 검색
    // password 암호화
    // userModel에 저장
    // 화면에 뿌려줌

    //email, password 등록
    //password  암호화
    //email 중복 방지

    userModel
        .find({email : req.body.email})
        .then(user => {
            // user 정보가 있다면 처리내역(핸들링)
            if(user.length >= 1) {
                return res.status(400).json({
                   msg : "이메일이 이미 가입되어있습니다"
                });
            }
            else{
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
            }
        })
        .catch(err => {
           res.status(500).json({
              errInfo : err
           });
        });




});








module.exports = router;