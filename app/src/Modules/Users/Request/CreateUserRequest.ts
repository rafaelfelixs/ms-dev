import { Expose } from 'class-transformer';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateUserRequest {
  @IsNotEmpty({ message: 'Username is mandatory!' })
  @MaxLength(24)
  @Expose()
  userName: string;

  @IsNotEmpty({ message: 'Userpassword is mandatory!' })
  @MaxLength(8)
  @Expose()
  userPwd: string;
}
