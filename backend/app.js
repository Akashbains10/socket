const cors = require('cors');
const express = require('express');
const morgan = require('./config/morgan');
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth.route');
const userRoutes = require('./routes/user.route');
const { errorConverter, errorHandler } = require('./middlewares/error');

const app = express();
const FRONTEND_URL = process.env.FRONTEND_URL

console.log(FRONTEND_URL, 'FRONTEND_URL')

const corsOptions = {
    origin: FRONTEND_URL,
    credentials: true,
}

app.use(morgan.successHandler); // Log all successful HTTP requests (status codes < 400)
app.use(morgan.errorHandler); // Log all failed HTTP requests (status codes >= 400), including error messages
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json())
app.use('/v1/auth', authRoutes);
app.use('/v1/users', userRoutes);
app.use(errorConverter);
app.use(errorHandler);

module.exports = app;