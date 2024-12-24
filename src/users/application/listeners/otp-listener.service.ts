import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EVENT_TYPES } from 'src/commons/domain/types/event.types';
import { REPOSITORY_TYPES_USER } from 'src/users/domain/types/repository.types';
import { BaseUserRepository } from 'src/users/infrastructure/repositorys/Base-user-respository';

@Injectable()
export default class OtpListenerService {
  constructor(
    @Inject(REPOSITORY_TYPES_USER.BaseRepositoryUser)
    private readonly userRepository: BaseUserRepository<{ userId: string }>,
  ) {}

  @OnEvent(EVENT_TYPES.otpValidated)
  async handleOtpValidated(payload: { userId: string }) {
    const updatePayload = {
      userId: payload.userId,
      otp: null,
      expiresAt: null,
    };

    await this.userRepository.updateOne(updatePayload);
    console.log(`OTP limpio para el usuario: ${payload.userId}`);
  }
}
