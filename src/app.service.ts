import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  constructor(
    // env test
    private readonly config: ConfigService,
  ) {}

  getHello(): string {
    // logging test
    this.logger.log('log, this is a message in AppService');
    this.logger.error('error, this is a message in AppService');
    this.logger.debug('debug, this is a message in AppService');
    this.logger.warn('warn, this is a message in AppService');
    this.logger.verbose('verbose, this is a message in AppService');

    // env test
    const env = this.config.get("env.name");
    return 'Hello World!, running in....' + env;
  }
}
