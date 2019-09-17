const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const orderModel = require('../models/order');
const productModel = require('../models/product');

const checkAuth = require('../middleware/check-auth');





//장바구니 전체

// 왜 product/doc.product가 아닌 doc. id인지
router.get('/', checkAuth, (req, res) => {
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
//else를 사용할순 없는지 then then 대신
//주소는 그냥 order링크만 하는게 아닌
router.post('/', checkAuth, (req, res) => {

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
                createdOrder : result,
                request : {
                    type : "GET",
                    url : "http://localhost:3000/order/" + result._id
                }
            });
        })
        .catch(err => {
           res.status(500).json({
               errInfo : err
           })
        });
});


//detail
router.get('/:orderId', checkAuth, (req, res) => {
   const id = req.params.orderId;

   orderModel
       .findById(id)
       .then(order => {
           if(!order) {
               return res.json({
                   msg : "order Id not found"
               });
           }
           res.status(200).json({
              orderInfo : order,
              request : {
                  type : "GET",
                  url : "http://localhost:3000/order"
              }
           });
       })
       .catch(err => {
           res.status(500).json({
               errInfo : err
           })
       });



});




router.patch('/:orderId', checkAuth, (req, res) => {
    const id = req.params.orderId;
    const updateOps = {};
    for(const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    orderModel
        .update({_id: id}, {$set: updateOps})
        .exec()
        .then(result => {
            res.status(200).json({
                orderInfo : result,
                request : {
                    type : "get",
                    url : "http://localhost:3000/order/" + result._id
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                errInfo : err
            });
        });
});





//삭제(숙제)
router.delete('/:orderId', checkAuth, (req, res) => {

    const id = req.params.orderId;

    orderModel
        .remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
               msg : "deleted order",
                request : {
                    type : "get",
                    url : "http://localhost:3000/order"
                }
            });
        })
        .catch(err => {
           res.status(500).json({
              errInfo : err
           });
        });
});





module.exports = router;