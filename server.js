
const http = require('http');
const express = require('express');
const app = express();




app.use((req, res, next) => {
    res.json({
        message: 'It works!'
    })
});




const port = 3000;

const server = http.createServer(app);

server.listen(port, console.log("서버 시작됨"));