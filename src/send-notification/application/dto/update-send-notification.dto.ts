import { PartialType } from '@nestjs/swagger';
import { CreateSendNotificationDto } from './create-send-notification.dto';

export class UpdateSendNotificationDto extends PartialType(CreateSendNotificationDto) {}
