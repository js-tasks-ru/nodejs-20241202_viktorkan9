import { Injectable } from "@nestjs/common";
import { LoggerService } from "./LoggerService";

@Injectable()
export class NotificationService {
  constructor(private readonly logger: LoggerService ) {}

  sendEmail(to: string, subject: string, message: string): void {
    try {
      console.log(`Email sent to ${to}: [${subject}] ${message}`);
      this.logger.log(`Email sent to ${to}: [${subject}] ${message}`);
    } catch (e) {
      this.logger.error(`Failed to send email to ${to}: ${e.message}`);
    }
  }

  sendSMS(to: string, message: string) {
    try {
      console.log(`SMS sent to ${to}: ${message}`);
    } catch (e) {
      this.logger.error(`Failed to send SMS to ${to}: ${e.message}`);
    }
  }
}
