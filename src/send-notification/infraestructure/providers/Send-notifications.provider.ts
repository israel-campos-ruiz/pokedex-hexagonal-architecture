import { Provider } from '@nestjs/common';
import { REPOSITORY_TYPES_SEND_NOTIFICATIONS } from 'src/send-notification/domain/repository.types';
import { SendNotificationsRepository } from '../repository/Send-notifications.repository';

export const NotificationsSendProvider: Provider = {
  provide: REPOSITORY_TYPES_SEND_NOTIFICATIONS.BaseRepositorySendNotifications,
  useClass: SendNotificationsRepository,
};
