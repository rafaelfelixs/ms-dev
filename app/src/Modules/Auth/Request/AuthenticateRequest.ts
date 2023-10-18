import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class AuthenticateRequest {
  @IsNotEmpty({ message: 'Username is mandatory!' })
  @Expose()
  userName: string;

  @IsNotEmpty({ message: 'Userpassword is mandatory!' })
  @Expose()
  userPwd: string;
}
