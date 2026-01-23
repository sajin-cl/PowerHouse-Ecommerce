const express = require('express');
const cors = require('cors');
const fileup = require('express-fileupload');
const session = require('express-session');
const logger = require('morgan');
const colorLogger = require('./utils/colorLogger');
const database = require('./config/database');


const authRouter = require('./routes/auth.routes');
const adminRouter = require('./routes/admin.routes');
const sellerRouter = require('./routes/seller.routes');

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

app.use(
  session({
    secret: "dont tell me",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 30,
      httpOnly: true,
      secure: false
    }
  })
);

app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);
app.use('/api/seller', sellerRouter);


const PORT = 4000;
app.listen(PORT, () => console.info(`Server running at http://localhost:${PORT}`));