const express = require('express');
const router = express.Router();


const userController = require('../controllers/user');

//전체 user 데이터 불러오기
//user detail 불러오기
//숙제

// user 회원가입
router.post('/signup', userController.user_resister);

//user 로그인
router.post('/login', userController.user_login);

//회원탈퇴
router.delete('/:userId', userController.user_delete);




module.exports = router;