const jwt = require('jsonwebtoken');



//try, catch : try 구문 우선
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "secret");
        //const decoded = jwt.verify(token, "암구호");
        req.userData = decoded;
        next();
    } catch(error){
        return res.status(401).json({
           msg : "auth failed"
        });
    }
};