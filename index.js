const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./dbConnect');
const colors = require('colors/safe');
const user = require('./routes/User.route');
const order = require('./routes/Order.route');

// db connect
db.connect();

// express json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// cors
app.use(cors());

// routes
app.use('/users', user);
app.use('/orders', order);

// server
let PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(colors.cyan(`Server running at port: ${PORT}`));
});