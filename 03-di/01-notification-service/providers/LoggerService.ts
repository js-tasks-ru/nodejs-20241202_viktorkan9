import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LoggerService {
  private readonly logFilePath: string;

  constructor() {
    this.logFilePath = path.join(__dirname, '..', 'logs', 'notification-service.log');
  }

  log(message: string) {
    const logMessage = `${new Date().toISOString()} - INFO - ${message}`;
    fs.appendFileSync(this.logFilePath, logMessage + '\n');
  }

  error(message: string) {
    const logMessage = `${new Date().toISOString()} - ERROR - ${message}`;
    fs.appendFileSync(this.logFilePath, logMessage + '\n');
  }
}
