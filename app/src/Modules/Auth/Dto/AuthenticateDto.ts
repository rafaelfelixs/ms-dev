import { UserDto } from '../../Users/Dto/UserDto';

export interface AuthenticateDto extends UserDto {
  tokenbn?: string;
  tokenExpiresIn?: number;
}
