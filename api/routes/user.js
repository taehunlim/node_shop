const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//mongoose : save, find, update 등등
const bcrypt = require('bcryptjs');
// 자동 암호화 시켜줌
const jwt = require('jsonwebtoken');
//토큰(인증코드)을 발행 해줌

const userModel = require('../models/user');


//전체 user 데이터 불러오기
//user detail 불러오기
//숙제


// user 회원가입
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



//user 로그인
router.post('/login', (req, res) => {

    //email 등록여부 확인
    //Password 맞는지 확인
    //jsonwebtoken 생성
    //화면에 뿌려줌


    userModel
        .find({email : req.body.email})
        .then(user => {
            if(user.length < 1) {
                return res.status(400).json ({
                   msg : "등록되지 않은 email 입니다"
                });
            }
            else{
                //bcrypt.compare(사용자 입력값, 기존 등록된 정보, (err, result))
                bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                    if(err){
                        return res.status(400).json({
                            errInfo : "패스워드가 틀림"
                        });
                    }
                    else{
                        const token = jwt.sign({
                            email : user[0].email,
                            userId : user[0]._id
                            },
                            "secret", {expiresIn : "1h"}
                        //암구호,{유효기간}
                        );
                        res.status(200).json({
                           msg : "successful login",
                            token : "bearer " + token
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


//회원탈퇴
router.delete('/:userId', (req, res) => {
    const id = req.params.userId;

    userModel
        .remove({_id : id})
        .then(user => {
            if(!user) {
                return res.status(400).json({
                    msg : "등록되어있지 않은 ID 입니다."
                });
            }
            else{
              res.status(200).json({
                  msg : "successful deleted ID"
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