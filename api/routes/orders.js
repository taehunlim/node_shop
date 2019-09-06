const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const orderModel = require('../models/order');
const productModel = require('../models/product');







//장바구니 전체
router.get('/', (req, res) => {
    orderModel
        .find()
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                orderInfo : docs.map(doc =>{
                    return{
                        _id : doc._id,
                        product :doc.product,
                        quantity : doc.quantity,
                        request : {
                            type : "GET",
                            url : "http://localhost:3000/order/" + doc._id
                        }
                    };
                })
            });
        })
        .catch(err =>{
           res.status(500).json({
               errInfo : err
           })
        });
});











// 장바구니 등록
router.post('/', (req, res) => {

    productModel
        .findById(req.body.productId)
        .then(product =>{
            if(!product) {
                return res.status(404).json({
                   msg : "product not found"
                });
            }
            const order = new orderModel({
                product : req.body.productId,
                quantity : req.body.quantity
            });
            return order.save();
        })
        .then(result =>{
            res.status(200).json({
                msg : "order stored",
                createdOrder : {
                    _id : result._id,
                    product : result.product,
                    quantity : result.quantity
                },
                request : {
                    type : "GET",
                    url : "http://localhost:3000/product/" + result._id
                }
            });
        })
        .catch(err => {
           res.status(500).json({
               errInfo : err
           })
        });
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