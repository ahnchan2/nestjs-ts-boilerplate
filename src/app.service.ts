import { Injectable, Inject, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import AppConfig from './config/app/config';
import DatabaseConfig from './config/database/oracle/config';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  constructor(
    // env test
    @Inject(AppConfig.KEY)
    private readonly appConfig: ConfigType<typeof AppConfig>,

    @Inject(DatabaseConfig.KEY)
    private readonly dbConfig: ConfigType<typeof DatabaseConfig>,
  ) {}

  getHello(): string {
    // logging test
    this.logger.log('log, this is a message in AppService');
    this.logger.error('error, this is a message in AppService');
    this.logger.debug('debug, this is a message in AppService');
    this.logger.warn('warn, this is a message in AppService');
    this.logger.verbose('verbose, this is a message in AppService');

    // env test
    return 'Hello World!, running in....' + this.appConfig.env;
  }
}
