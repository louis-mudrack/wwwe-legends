class AppError extends Error {
    constructor(message, statusCode) {
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

class Notification {
    constructor(res, statusCode = 200, message = 'I think whatever you wanted to do worked :)', redirect = false) {
        this.response = res;
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('2') ? 'success' : 'warning';
        this.message = message;
        this.redirect = redirect;

        this.send();
    }

    send() {
        this.response.status(this.statusCode).json({
            status: this.status,
            message: this.message,
            redirect: this.redirect,
        });
    }
}

module.exports = {AppError, Notification};
