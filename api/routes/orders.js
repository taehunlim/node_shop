const express = require('express');
const router = express.Router();



const checkAuth = require('../middleware/check-auth');


const orderController = require('../controllers/order');




//장바구니 전체
router.get('/', checkAuth, orderController.order_get);

//detail
router.get('/:orderId', checkAuth, orderController.order_get_detail);

// 장바구니 등록

router.post('/', checkAuth, orderController.order_post);







router.patch('/:orderId', checkAuth, orderController.order_modify);





//삭제(숙제)
router.delete('/:orderId', checkAuth, orderController.order_delete);





module.exports = router;