require('dotenv').config();

const express = require('express');
const cors = require('cors');
const fileup = require('express-fileupload');
const session = require('express-session');
const logger = require('morgan');
const colorLogger = require('./utils/colorLogger');
const database = require('./config/database');


const sellerRouter = require('./routes/seller.routes');
const userRouter = require('./routes/user.routes');
const adminRouter = require('./routes/admin.routes');

const authRouter = require('./routes/auth.routes');
const productRouter = require('./routes/products.routes');
const categoryRouter = require('./routes/categories.routes');
const brandRouter = require('./routes/brands.routes');
const cartRouter = require('./routes/cart.routes');
const orderRouter = require('./routes/orders.routes');


const app = express();

database();

app.use(logger('dev'));

app.use(cors({
  origin: process.env.APPLICATION_URL,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileup());

app.use('/assets', express.static('public/assets'));

if (process.env.NODE_ENV == 'production') {
  app.set('trust proxy', 1);
}

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    proxy: process.env.NODE_ENV == 'production',
    cookie: {
      secure: process.env.NODE_ENV == 'production', 
      sameSite: process.env.NODE_ENV == 'production' ? 'none' : 'lax',
      maxAge: 10 * 60 * 60 * 1000
    }
  })
);

app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/user', userRouter);
app.use('/api/products', productRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/brands', brandRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', orderRouter);


const PORT = process.env.PORT;
app.listen(PORT, '0.0.0.0', () => console.info(`Server running at http://localhost:${PORT}`));