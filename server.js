
const http = require('http');
const express = require('express');
const app = express();

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');




app.use('/product', productRoutes);
app.use('/order', orderRoutes);
app.use('/user', userRoutes);


const port = 3000;

const server = http.createServer(app);

server.listen(port, console.log("서버 시작됨"));