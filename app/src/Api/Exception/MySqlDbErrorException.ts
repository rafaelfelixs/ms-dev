import { ServerInternalErrorException } from './ServerInternalErrorException';

export class MySqlDbErrorException extends ServerInternalErrorException {
  constructor(error: Error) {
    super(error.stack);
  }
}
