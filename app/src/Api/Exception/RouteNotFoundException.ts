import {BaseErrorException} from './BaseErrorException';
import {CODE_ERROR_ROTE_NOT_FOUND} from './CodeErrors/CodeErrors';
import {ErrorDetailsDto} from '../Dto/ErrorDetailsDto';

export class RouteNotFoundException extends BaseErrorException {
  constructor(errors?: ErrorDetailsDto) {
    super(404, [
      {
        code: errors.code || CODE_ERROR_ROTE_NOT_FOUND.code,
        message: errors.message || CODE_ERROR_ROTE_NOT_FOUND.message,
      },
    ]);
  }
}
