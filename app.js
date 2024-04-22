const express = require('express');
const path = require('path');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const { AppError } = require('./utils/notificationModule');
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');
const tournamentRouter = require('./routes/tournamentRoutes');

const app = express();

app.use(
    cors({
        credentials: true,
    })
);

app.options('*', cors());

// Global Middleware
// Serving static files
app.use(express.static(path.join(__dirname, 'client/build')));


// Development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api/user', limiter);
app.use('/api/tournament', limiter);

// Configure Middleware
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());
app.use(mongoSanitize());

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

// router
app.use('/api/user', userRouter);
app.use('/api/tournament', tournamentRouter);

app.all('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});
// In your Express server setup  

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`));
});

app.use(globalErrorHandler);

module.exports = app;
