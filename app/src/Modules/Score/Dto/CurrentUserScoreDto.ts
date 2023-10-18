import { UserScoreDto } from './UserScoreDto';

export interface CurrentUserScoreDto extends UserScoreDto {
  myRank?: number;
}
