import winston from 'winston';
import moment from 'moment';

winston.emitErrs = true;

const logger = (env) => {
    let ret;

    switch (env) {
            case 'production':
                ret = new winston.Logger({
                    transports: [
                        new winston.transports.Console({
                            level: 'error',
                            handleExceptions: true,
                            json: false,
                            colorize: true
                        }),
                        new winston.transports.File({
                            level: 'info',
                            filename: './server.log',
                            handleExceptions: true,
                            json: true,
                            maxsize: 5242880,
                            maxFiles: 100,
                            colorize: true
                        })
                    ],
                    exitOnError: false
                });
            case 'development':
                ret = new winston.Logger({
                    transports: [
                        new winston.transports.Console({
                            level: 'debug',
                            handleExceptions: true,
                            json: false,
                            colorize: true
                        }),
                        new winston.transports.File({
                            level: 'info',
                            filename: './server.log',
                            handleExceptions: true,
                            json: true,
                            maxsize: 5242880,
                            maxFiles: 5,
                            colorize: false
                        })
                    ],
                    exitOnError: false
                });
            case 'staging':
                ret = new winston.Logger({
                    transports: [
                        new winston.transports.File({
                            level: 'info',
                            filename: './server.log',
                            handleExceptions: true,
                            json: false,
                            maxsize: 5242880,
                            maxFiles: 50,
                            colorize: false,
                            timestamp: () => moment().format()
                        })
                    ],
                    exitOnError: false
                });
            case 'test':
                ret = new winston.Logger({
                    transports: [
                        new winston.transports.File({
                            level: 'info',
                            filename: './test.log',
                            handleExceptions: true,
                            json: true,
                            maxsize: 5242880,
                            maxFiles: 50,
                            colorize: false
                        })
                    ],
                    exitOnError: false
                });
            default:
                ret = new winston.Logger({
                    transports: [
                        new winston.transports.Console({
                            level: 'debug',
                            handleExceptions: true,
                            json: false,
                            colorize: true
                        })
                    ],
                    exitOnError: false
                });
    }

    ret.stream = {
        write: (message, encoding) => {
            logger.info(message);
        }
    };

    return ret;
};

export default logger;
