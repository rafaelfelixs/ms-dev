import {UsersRepository} from '../../../Domain/Repositories/UsersRepository';
import {logger} from '../../../Api/Utils/Logger';
import {UserScoreDto} from '../Dto/UserScoreDto';
import AuthHelper from '../../Auth/Helpers/AuthHelper';
import {CODE_ERROR_BAD_SCORE, CODE_ERROR_BAD_TOKEN} from '../../Auth/Exception/CodeErrors/CodeErrors';
import {StorageRedis} from '../../../Api/Storage/StorageRedis';
import {BadRequestException} from '../../../Api/Exception/BadRequestException';
import {isNumeric} from "../Helpers/ScoreHelper";

export class SaveScoreService {
  private usersRepository: UsersRepository;
  private storageRedis: StorageRedis;
  constructor() {
    this.usersRepository = new UsersRepository();
    this.storageRedis = new StorageRedis();
  }

  public async invoke(dto: UserScoreDto): Promise<void> {
    if(!isNumeric(dto.score)) {
      throw new BadRequestException(CODE_ERROR_BAD_SCORE);
    }

    const EXPIRES_TOKEN = Number(process.env.TOKEN_EXPIRES_MINUTES) * 60;

    logger.info('Validating token');
    const userEntity = await AuthHelper.getUserAuth(dto.token);

    if (!userEntity) {
      throw new BadRequestException(CODE_ERROR_BAD_TOKEN);
    }

    logger.info(`User ${userEntity.userName} found!`);

    const score: number = await this.storageRedis.zScoreUser(userEntity.userName);
    if (score && dto.score < score) {
      logger.info('The new score is fewer than the previous score');
      return;
    }

    await this.storageRedis.zAddScore(dto.score, userEntity.userName);
    logger.info(`User ${userEntity.userName} added score ${dto.score} successfully!`);

    await AuthHelper.saveUserAuth(dto.token, userEntity, EXPIRES_TOKEN);
    logger.info('Refreshing user token!');
  }
}
