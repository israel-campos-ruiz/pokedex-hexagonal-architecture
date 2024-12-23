import { Inject, Injectable } from '@nestjs/common';
import { ApplicationService } from 'src/commons/domain/application-service';
import { REPOSITORY_TYPES_SEND_NOTIFICATIONS } from '../domain/repository.types';
import { REPOSITORY_TYPES_USER } from 'src/users/domain/types/repository.types';
import { UserDomain } from 'src/users/domain/entities/user.domain';
import { BaseUserRepository } from 'src/users/infrastructure/repositorys/Base-user-respository';
import { BaseSendNotification } from '../infraestructure/repository/Base-send-notification.repository';

@Injectable()
export class SendEmailNotificationService implements ApplicationService<any> {
  constructor(
    @Inject(REPOSITORY_TYPES_SEND_NOTIFICATIONS.BaseRepositorySendNotifications)
    private readonly notificationRepository: BaseSendNotification<any>,
    @Inject(REPOSITORY_TYPES_USER.BaseRepositoryUser)
    private readonly userRepository: BaseUserRepository<UserDomain>,
  ) {}
  async process(data?: any) {
    const user = await this.userRepository.findOne(data.email);
    return this.notificationRepository.sendEmail({
      name: user[0].name,
      email: user[0].email,
      otp: user[0].otp,
      otpExpiresAt: user[0].expiresAt,
    });
  }
}
