import { LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import * as moment from 'moment';

export class MyLogger implements LoggerService {
    private logger: winston.Logger;

    constructor(service) {
        this.logger = winston.createLogger({
            defaultMeta: { service },
            transports: [
                //file: error
                new winston.transports.DailyRotateFile({
                    level: 'error',
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        nestWinstonModuleUtilities.format.nestLike('nestjs-ts-boilerplate', { prettyPrint: true }),
                    ),
                    datePattern: 'YYYY-MM-DD',
                    filename:'error-%DATE%.log',
                    dirname: 'logs',
                    maxSize: '20m',
                    maxFiles: '30d',
                    zippedArchive: true,
                }),
            ],
        });

        if (process.env.NODE_ENV !== 'prd') {
            this.logger.add(
                //console
                new winston.transports.Console({
                    level: 'silly',
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        nestWinstonModuleUtilities.format.nestLike('nestjs-ts-boilerplate', { prettyPrint: true }),
                    ),
                })
            );
            this.logger.add(
                //file: info
                new winston.transports.DailyRotateFile({
                    level: 'info',
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        nestWinstonModuleUtilities.format.nestLike('nestjs-ts-boilerplate', { prettyPrint: true }),
                    ),
                    datePattern: 'YYYY-MM-DD',
                    filename: 'application-%DATE%.log',
                    dirname: 'logs',
                    maxSize: '20m',
                    maxFiles: '30d',
                    zippedArchive: true,
                })
            );
        }
    }

    log(message: string) {
        this.logger.info(message);
    }
    error(message: string, trace: string) {
        this.logger.error(message, trace);
    }
    warn(message: string) {
        this.logger.warn(message);
    }
    debug(message: string) {
        this.logger.debug(message);
    }
    verbose(message: string) {
        this.logger.verbose(message);
    }

}