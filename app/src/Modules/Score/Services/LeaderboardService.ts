import { UsersRepository } from '../../../Domain/Repositories/UsersRepository';
import { logger } from '../../../Api/Utils/Logger';
import { UserScoreDto } from '../Dto/UserScoreDto';
import AuthHelper from '../../Auth/Helpers/AuthHelper';
import { ResourceNotFoundException } from '../../../Api/Exception/ResourceNotFoundException';
import {
  CODE_ERROR_BAD_TOKEN,
  CODE_ERROR_LEADERBOARD_FAILED,
  CODE_ERROR_USER_RANK_FAILED,
  CODE_ERROR_USER_SCORE_FAILED
} from '../../Auth/Exception/CodeErrors/CodeErrors';
import { StorageRedis } from '../../../Api/Storage/StorageRedis';
import { BadRequestException } from '../../../Api/Exception/BadRequestException';
import { LeaderboardDto } from '../Dto/LeaderboardDto';

export class LeaderboardService {
  private usersRepository: UsersRepository;
  private storageRedis: StorageRedis;
  constructor() {
    this.usersRepository = new UsersRepository();
    this.storageRedis = new StorageRedis();
  }

  public async invoke(dto: LeaderboardDto): Promise<LeaderboardDto> {
    const EXPIRES_TOKEN = Number(process.env.TOKEN_EXPIRES_MINUTES) * 60;

    logger.info('Validating token');
    const userEntity = await AuthHelper.getUserAuth(dto.currentUserRank.token);

    if (!userEntity) {
      throw new BadRequestException(CODE_ERROR_BAD_TOKEN);
    }
    logger.info(`User ${userEntity.userName} found!`);

    const leaderBoardArray: UserScoreDto[] = await this.storageRedis.zScanLeaderboard();
    if (!leaderBoardArray || leaderBoardArray.length === 0) {
      throw new ResourceNotFoundException(CODE_ERROR_LEADERBOARD_FAILED);
    }
    logger.info('Leaderboard found successfully!');

    const myRank: number = leaderBoardArray.reverse().findIndex(item => item.userName === userEntity.userName) + 1;
    if (!myRank) {
      throw new ResourceNotFoundException(CODE_ERROR_USER_RANK_FAILED);
    }
    logger.info('UserRank found successfully!');

    const score: number = await this.storageRedis.zScoreUser(userEntity.userName);
    if (!score) {
      throw new ResourceNotFoundException(CODE_ERROR_USER_SCORE_FAILED);
    }
    logger.info('UserScore found successfully!');

    await AuthHelper.saveUserAuth(dto.currentUserRank.token, userEntity, EXPIRES_TOKEN);
    logger.info('Refreshing user token!');

    return { ...dto, rank: leaderBoardArray.slice(0, 3), currentUserRank: { myRank: myRank, score: score, userName: userEntity.userName } };
  }
}
