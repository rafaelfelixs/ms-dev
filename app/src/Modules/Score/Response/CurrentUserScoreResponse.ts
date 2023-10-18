import { UserScoreResponse } from './UserScoreResponse';

export interface CurrentUserScoreResponse extends UserScoreResponse {
  myRank: number;
}
