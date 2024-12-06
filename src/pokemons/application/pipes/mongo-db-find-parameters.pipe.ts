import {
  ArgumentMetadata,
  BadRequestException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ObjectId } from 'mongoDb';

@Injectable()
export class MongoDbFindParametersPipe implements PipeTransform {
  private throwException(metadata: ArgumentMetadata) {
    throw new BadRequestException({
      statusCode: HttpStatus.BAD_REQUEST,
      code: HttpStatus.BAD_REQUEST,
      message: ` the value ${metadata.type} must be a valid argument`,
    });
  }
  transform(value: any, metadata: ArgumentMetadata) {
    const EMPTY_STRING = '';
    const validPattern = /^[a-zA-Z0-9\s]*$/;
    if (ObjectId.isValid(value)) {
      return value;
    }
    const asNumber = Number(value);
    if (!isNaN(asNumber) && +value > 0) {
      return asNumber;
    }
    if (
      typeof value === 'string' &&
      value.trim() !== EMPTY_STRING &&
      validPattern.test(value)
    ) {
      return value;
    }
    return this.throwException(metadata);
  }
}
