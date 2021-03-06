
const mongoose = require('mongoose');


const productModel = require('../models/product');


//전체 데이터 불러오기
exports.products_get_all =  (req, res) => {

    productModel
        .find()
        .exec()
        .then(docs => {
            const response = {
                count : docs.length,
                products : docs.map(doc => {
                    return{
                        name: doc.name,
                        price: doc.price,
                        id: doc._id,
                        request:{
                            type: "GET",
                            url: "http://localhost:3000/product/" + doc._id
                        }
                    };
                })
            };
            res.status(200).json(response);
            // res.json({
            //     msg: "successful Products Get",
            //     count : docs.length,
            //     products: docs
            // });
        })
        .catch(err =>{
            res.json({
                errInfo: err
            });
        });

};


//제품 등록
exports.products_create_product =  (req, res) => {

    const product = new productModel({
        name: req.body.name,
        price: req.body.price
    });

    product
        .save()
        .then(result =>{
            res.json({
                msg: "successful Product",
                createdProduct: result,
                request: {
                    type : "GET",
                    url : "http://localhost:3000/product/" + result._id
                }
            });
        })
        .catch(err =>{
            res.json({
                errInfo: err
            });
        });



};


//세부 데이터 불러오기
exports.products_get_product = (req, res) => {
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
                return res.status(200).json({
                    product: result,
                    request :{
                        type : "GET",
                        url :"http://localhost:3000/product"
                    }
                })
            }
        })
        .catch(err =>{
            res.json({
                errInfo : err
            });
        });
};

//$ = 다시 셋팅 한다는in mongo db
//[] = ㅂㅐ열
// {} = json
// 수정
exports.products_update_product = (req, res) => {
    const id = req.params.productId;
    const updateOps = {};
    for(const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    productModel
        .update({_id : id}, { $set: updateOps})
        .exec()
        .then(result => {
            res.status(200).json({
                productInfo : result,
                request : {
                    type : "GET",
                    url : "http://localhost:3000/product/" + id
                }
            });
        })
        .catch(err => {
            res.json({
                errInfo : err
            });
        });
};

//제품 삭제
exports.products_delete_product = (req, res) => {
    const id = req.params.productId;

    productModel
        .remove({_id: id})
        .exec()
        .then(result =>{
            res.json({
                msg : "deletedProduct",
                request :{
                    type : "GET",
                    url : "http://localhost:3000/product"
                }
            });
        })
        .catch(err =>{
            res.json({
                errInfo : err
            });
        });
};