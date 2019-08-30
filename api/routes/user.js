const express = require('express');
const router = express.Router();


router.get('/signin', (req, res) => {
   res.json({
    message : "userRoutes"
   }); 
});









module.exports = router;