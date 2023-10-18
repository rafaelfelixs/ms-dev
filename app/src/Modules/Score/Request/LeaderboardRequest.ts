import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class LeaderboardRequest {
  @IsNotEmpty({ message: 'Token is mandatory!' })
  @Expose()
  token: string;
}
