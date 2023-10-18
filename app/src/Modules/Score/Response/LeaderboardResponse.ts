import { CurrentUserScoreResponse } from './CurrentUserScoreResponse';
import { UserScoreResponse } from './UserScoreResponse';

export interface LeaderboardResponse {
  data: {
    mine: CurrentUserScoreResponse;
    rank: UserScoreResponse[];
  };
}
