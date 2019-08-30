const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const productModel = require('../models/product');


router.get('/', (req, res) => {

    productModel
        .find()
        .exec()
        .then(docs => {
            res.json({
                msg: "successful Products Get",
                products: docs
            });
        })
        .catch(err =>{
            res.json({
                errInfo: err
            });
        });

});


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

router.patch('/', (req, res) => {
    res.json({
        message : "productModefie"
    });
});


router.delete('/', (req, res) => {
    res.json({
        message : "productDelite"
    });
});


module.exports = router;