import { Module } from '@nestjs/common';
import { SendEmailNotificationService } from './application/send-email-notification.service';
import { NotificationsSendProvider } from './infraestructure/providers/Send-notifications.provider';
import { UsersModule } from 'src/users/users.module';
import { CommonsModule } from 'src/commons/commons.module';

@Module({
  imports: [UsersModule, CommonsModule],
  providers: [SendEmailNotificationService, NotificationsSendProvider],
  exports: [SendEmailNotificationService],
})
export class SendNotificationModule {}
