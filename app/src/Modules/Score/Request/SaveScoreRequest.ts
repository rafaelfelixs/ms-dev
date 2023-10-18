import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumberString, MaxLength } from 'class-validator';

export class SaveScoreRequest {
  @IsNotEmpty({ message: 'Token is mandatory!' })
  @Expose()
  token: string;

  @IsNotEmpty({ message: 'MyScore is mandatory!' })
  @Expose()
  myScore: string;
}
