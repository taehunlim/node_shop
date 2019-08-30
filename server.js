
const http = require('http');
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');



app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

const db = "mongodb+srv://limtae:asd123@cluster0-nyf5t.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(db, { useNewUrlParser: true})
    .then(() => console.log("MongoDB Connected ..."))
    .catch(err => console.log(err));





app.use('/product', productRoutes);
app.use('/order', orderRoutes);
app.use('/user', userRoutes);



const port = 3000;

const server = http.createServer(app);

server.listen(port, console.log("서버 시작됨"));