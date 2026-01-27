const express = require('express');
const cors = require('cors');
const fileup = require('express-fileupload');
const session = require('express-session');
const logger = require('morgan');
const colorLogger = require('./utils/colorLogger');
const database = require('./config/database');


const authRouter = require('./routes/auth.routes');
const adminRouter = require('./routes/admin.routes');
const productRouter = require('./routes/products.routes');
const categoryRouter = require('./routes/categories.routes');
const brandRouter = require('./routes/brands.routes');
const cartRouter = require('./routes/cart.routes');


const app = express();

database();

app.use(logger('dev'));

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileup());

app.use('/assets', express.static('public/assets'))

app.use(
  session({
    secret: "dont tell me",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000
    }

  })
);

app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);
app.use('/api/products', productRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/brands', brandRouter);
app.use('/api/cart', cartRouter);


const PORT = 4000;
app.listen(PORT, () => console.info(`Server running at http://localhost:${PORT}`));