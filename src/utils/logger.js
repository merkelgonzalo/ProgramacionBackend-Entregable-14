import winston from 'winston';
import { config } from "../config/config.js";

const customLevelsOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: 'redBright',
        error: 'red',
        warning: 'yellow',
        info: 'blue',
        http: 'cyan',
        debug: 'white'
    }
}

// Configuration development logger
const developmentLogger = winston.createLogger({
    levels: customLevelsOptions.levels,
    transports: [
        new winston.transports.Console({
            level: 'debug',
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelsOptions.colors }),
                winston.format.simple()
            )
        })
    ]
});
  
// Configuration production logger
const productionLogger = winston.createLogger({
    levels: customLevelsOptions.levels,
    transports: [
        new winston.transports.Console({
            level: 'info'
        }),
        new winston.transports.File({
            filename: '../dao/files/errors.log',
            level: 'error',
            format: winston.format.json() 
        })
    ]
});

//Middleware
export const addLogger = (req, res, next) => {
    if(config.environment.nodeEnvironment === 'production'){
        req.logger = productionLogger;
    }else{
        req.logger = developmentLogger;
    }
    const date = new Date().toLocaleDateString();
    const hour = new Date().toLocaleTimeString();
    req.logger.http(`${req.method} from ${req.url} - Date: ${date} - Hour: ${hour}`),
    next();
};