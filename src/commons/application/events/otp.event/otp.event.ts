import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EVENT_TYPES } from 'src/commons/domain/types/event.types';
@Injectable()
export class OtpEvent {
  constructor(private eventEmitter: EventEmitter2) {}

  emitOtpValidated(userId: string) {
    this.eventEmitter.emit(EVENT_TYPES.otpValidated, { userId });
  }
}
