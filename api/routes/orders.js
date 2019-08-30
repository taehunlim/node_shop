const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.json({
        message : "orderGet"
    });
});

router.post('/', (req, res) => {
 
    const order = {
        productId: req.body.productId,
        quentity: req.body.quentity
    };
 
    res.json({
        message: "created Order",
        orderInfo: order
    });
 
 
    // res.json({
    //     message : "orderPost"
    // });
});

router.patch('/', (req, res) => {
    res.json({
        message : "orderModefie"
    });
});

router.delete('/', (req, res) => {
    res.json({
        message : "orderDelite"
    });
});





module.exports = router;