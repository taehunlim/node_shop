const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const productModel = require('../models/product');

// total Product 불러오기
router.get('/', (req, res) => {

    productModel
        .find()
        .exec()
        .then(docs => {
            res.json({
                msg: "successful Products Get",
                count : docs.length,
                products: docs
            });
        })
        .catch(err =>{
            res.json({
                errInfo: err
            });
        });

});

// product 등록하기
router.post('/', (req, res) => {

    const product = new productModel({
        name: req.body.name,
        price: req.body.price
    });

    product
        .save()
        .then(result =>{
            res.json({
                msg: "successful Product",
                createdProduct: result
            });
        })
        .catch(err =>{
            res.json({
                errInfo: err
            });
        });



});

//수정하기
router.patch('/', (req, res) => {
    res.json({
        message : "productModefie"
    });
});


router.get('/:productId', (req, res) => {
    const id = req.params.productId;

    productModel
        .findById(id)
        .exec()
        .then(result => {
            if (!result) {
                return res.status(404).json({
                   msg : "no productId"
                });
            } else {
                res.json({
                    msg: "succesful detail product",
                    productInfo: result
                });
            }
        })
        .catch(err =>{
            res.json({
                errInfo : err
            });
        });
});


//삭제하기
router.delete('/:productId', (req, res) => {
    const id = req.params.productId;

    productModel
        .remove({_id: id})
        .exec()
        .then(result =>{
          res.json({
             msg : "deletedProduct",
             productList : result
          });
        })
        .catch(err =>{
            res.json({
                errInfo : err
            });
        });




});


module.exports = router;