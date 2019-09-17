const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');




const productController = require('../controllers/product');




// total Product 불러오기
router.get('/', productController.products_get_all);

// product 등록하기
router.post('/',checkAuth, productController.products_create_product);


//수정하기
router.patch('/:productId', checkAuth, productController.products_update_product);


router.get('/:productId', productController.products_get_product);


//삭제하기
router.delete('/:productId', checkAuth, productController.products_delete_product);


module.exports = router;