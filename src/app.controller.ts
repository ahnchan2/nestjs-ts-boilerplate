import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(
    private readonly appService: AppService
  ) {}

  @Get()
  getHello(): string {
    // logging test
    this.logger.log('log, this is a message in AppController');
    this.logger.error('error, this is a message in AppController');
    this.logger.debug('debug, this is a message in AppController');
    this.logger.warn('warn, this is a message in AppController');
    this.logger.verbose('verbose, this is a message in AppController');

    return this.appService.getHello();
  }
}
