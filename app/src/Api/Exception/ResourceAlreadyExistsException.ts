import { BaseErrorException } from './BaseErrorException';
import { ErrorDetailsDto } from '../Dto/ErrorDetailsDto';
import { CODE_ERROR_BAD_REQUEST, CODE_ERROR_RESOURCE_ALREADY_EXISTS } from './CodeErrors/CodeErrors';

export class ResourceAlreadyExistsException extends BaseErrorException {
  constructor(errors?: ErrorDetailsDto) {
    super(409, [
      {
        code: errors.code || CODE_ERROR_RESOURCE_ALREADY_EXISTS.code,
        message: errors.message || CODE_ERROR_RESOURCE_ALREADY_EXISTS.message,
      },
    ]);
  }
}
