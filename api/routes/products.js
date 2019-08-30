const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const productModel = require('../models/product');


router.get('/', (req, res) => {
    res.json({
        message : "productGet"
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