import { UserScoreDto } from './UserScoreDto';
import { CurrentUserScoreDto } from './CurrentUserScoreDto';

export interface LeaderboardDto {
  currentUserRank?: CurrentUserScoreDto;
  rank?: UserScoreDto[];
}
