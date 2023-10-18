import { SaveScoreController } from './Action/SaveScoreController';
import { SaveScoreTransformer } from './Transformer/SaveScoreTransformer';
import { SaveScoreService } from './Services/SaveScoreService';
import { LeaderboardController } from './Action/LeaderboardController';
import { LeaderboardTransformer } from './Transformer/LeaderboardTransformer';
import { LeaderboardService } from './Services/LeaderboardService';

export const saveScoreController: SaveScoreController = new SaveScoreController(new SaveScoreTransformer(), new SaveScoreService());
export const leaderboardController: LeaderboardController = new LeaderboardController(new LeaderboardTransformer(), new LeaderboardService());
