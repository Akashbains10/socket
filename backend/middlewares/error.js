const ApiError = require("../utils/ApiError");

const errorHandler = (err, req, res, next) => {
    let { statusCode, message } = err;
    res.locals.errorMessage = err.message;

    const response = {
        code: statusCode,
        message,
        stack: err.stack,
    };

    console.error(err);


    res.status(statusCode).send(response);
};

const errorConverter = (err, req, res, next) => {
    let error = err;
    console.log(error?.message, 'error message')
    if (!(error instanceof ApiError)) {
        const statusCode = error.statusCode ?? 500;
        const message = error.message || 'Server Error';
        error = new ApiError(statusCode, message, false, err.stack);
    }
    next(error);
};

module.exports = {
    errorHandler,
    errorConverter
}