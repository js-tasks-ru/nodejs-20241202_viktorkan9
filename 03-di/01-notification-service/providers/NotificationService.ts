import { Injectable } from "@nestjs/common";

@Injectable()
export class NotificationService {
  sendEmail(to: string, subject: string, message: string): void {
    console.log(`Email sent to ${to}: [${subject}] ${message}`);
  }

  sendSMS(to: string, message: string) {
    console.log(`SMS sent to ${to}: ${message}`);
  }
}
