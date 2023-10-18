import { UserDto } from '../../Users/Dto/UserDto';

export interface AuthenticateDto extends UserDto {
  tokenBn?: string;
  tokenExpiresIn?: number;
}
