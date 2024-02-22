const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const api = process.env.API_URL;

//middlewares
app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());
app.use(morgan('tiny'));

//routes
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

//database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Database Connection is ready...');
  })
  .catch(err => {
    console.log(err);
    console.log('Database Connection is failed');
  });

app.listen(3000, () => {
  console.log('server is running on port 3000');
});
