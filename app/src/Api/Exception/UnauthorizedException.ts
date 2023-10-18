import { BaseErrorException } from './BaseErrorException';
import { CODE_ERROR_UNAUTHORIZED } from './CodeErrors/CodeErrors';
import { ErrorDetailsDto } from '../Dto/ErrorDetailsDto';

export class UnauthorizedException extends BaseErrorException {
  constructor(error?: ErrorDetailsDto) {
    super(401, [
      {
        code: error.code || CODE_ERROR_UNAUTHORIZED.code,
        message: error.message || CODE_ERROR_UNAUTHORIZED.message,
      },
    ]);
  }
}
