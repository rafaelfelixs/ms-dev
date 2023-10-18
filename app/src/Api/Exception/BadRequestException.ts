import { BaseErrorException } from './BaseErrorException';
import { ErrorDetailsDto } from '../Dto/ErrorDetailsDto';
import { CODE_ERROR_BAD_REQUEST, CODE_ERROR_RESOURCE_NOT_FOUND } from './CodeErrors/CodeErrors';

export class BadRequestException extends BaseErrorException {
  constructor(errors?: ErrorDetailsDto) {
    super(400, [
      {
        code: errors.code || CODE_ERROR_BAD_REQUEST.code,
        message: errors.message || CODE_ERROR_BAD_REQUEST.message,
      },
    ]);
  }
}
