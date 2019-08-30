const express = require('express');
const router = express.Router();



router.get('/', (req, res) => {
    res.json({
        message : "productGet"
    });
});


router.post('/', (req, res) => {
    res.json({
        message : "productPost"
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