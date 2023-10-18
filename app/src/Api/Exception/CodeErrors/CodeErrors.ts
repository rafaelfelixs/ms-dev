import { ErrorDetailsDto } from '../../Dto/ErrorDetailsDto';

export const CODE_ERROR_SERVER_INTERNAL_ERROR: ErrorDetailsDto = {
  code: 'SERVER_INTERNAL_ERROR',
  message: 'Internal error in service',
};

export const CODE_ERROR_RESOURCE_NOT_FOUND: ErrorDetailsDto = {
  code: 'RESOURCE_NOT_FOUND',
  message: 'Resource not found',
};

export const CODE_ERROR_ROTE_NOT_FOUND: ErrorDetailsDto = {
  code: 'ROTE_NOT_FOUND',
  message: 'Rote not found',
};

export const CODE_ERROR_RESOURCE_ALREADY_EXISTS: ErrorDetailsDto = {
  code: 'RESOURCE_ALREADY_EXISTS',
  message: 'Resource already exists',
};

export const CODE_ERROR_UNAUTHORIZED: ErrorDetailsDto = {
  code: 'UNAUTHORIZED',
  message: 'Unauthorized',
};

export const CODE_ERROR_ACCESS_DENIED: ErrorDetailsDto = {
  code: 'ACCESS_DENIED',
  message: 'Acess Denied',
};

export const CODE_ERROR_FIELDS_INVALID: ErrorDetailsDto = {
  code: 'INVALID_FIELDS',
  message: 'Fields are mandatory/invalid',
};

export const CODE_ERROR_BAD_REQUEST: ErrorDetailsDto = {
  code: 'BAD_REQUEST',
  message: 'Bad request',
};
