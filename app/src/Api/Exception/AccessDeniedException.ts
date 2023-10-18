import { BaseErrorException } from './BaseErrorException';
import { CODE_ERROR_ACCESS_DENIED, CODE_ERROR_BAD_REQUEST } from './CodeErrors/CodeErrors';
import { ErrorDetailsDto } from '../Dto/ErrorDetailsDto';

export class AccessDeniedException extends BaseErrorException {
  constructor(errors?: ErrorDetailsDto) {
    super(403, [
      {
        code: errors.code || CODE_ERROR_ACCESS_DENIED.code,
        message: errors.message || CODE_ERROR_ACCESS_DENIED.message,
      },
    ]);
  }
}
