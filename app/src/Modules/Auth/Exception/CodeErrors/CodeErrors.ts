import { ErrorDetailsDto } from '../../../../Api/Dto/ErrorDetailsDto';

export const CODE_ERROR_LOGIN_FAILED: ErrorDetailsDto = {
  code: '500',
  message: 'Login failed',
};

export const CODE_ERROR_BAD_TOKEN: ErrorDetailsDto = {
  code: '500',
  message: 'Bad token',
};

export const CODE_ERROR_USER_NOT_EXIST: ErrorDetailsDto = {
  code: '404',
  message: 'User does not exist',
};

export const CODE_ERROR_LEADERBOARD_FAILED: ErrorDetailsDto = {
  code: '500',
  message: 'Failed to retrieve leaderboard',
};

export const CODE_ERROR_USER_RANK_FAILED: ErrorDetailsDto = {
  code: '500',
  message: 'Failed to retrieve user rank',
};

export const CODE_ERROR_USER_SCORE_FAILED: ErrorDetailsDto = {
  code: '500',
  message: 'Failed to retrieve user score',
};

export const CODE_ERROR_BAD_SCORE: ErrorDetailsDto = {
  code: '500',
  message: 'Bad score',
};
