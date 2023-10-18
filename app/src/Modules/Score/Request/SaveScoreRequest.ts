import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class SaveScoreRequest {
  @IsNotEmpty({ message: 'Token is mandatory!' })
  @Expose()
  tokenbn: string;

  @IsNotEmpty({ message: 'MyScore is mandatory!' })
  @Expose()
  myScore: string;
}
