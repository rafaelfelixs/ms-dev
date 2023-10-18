import { UsersRepository } from '../../../Domain/Repositories/UsersRepository';
import { CODE_ERROR_LOGIN_FAILED, CODE_ERROR_USER_NOT_EXIST } from '../Exception/CodeErrors/CodeErrors';
import { logger } from '../../../Api/Utils/Logger';
import { AuthenticateDto } from '../Dto/AuthenticateDto';
import { ResourceNotFoundException } from '../../../Api/Exception/ResourceNotFoundException';
import BCryptoHelper from '../../../Api/Helpers/BCryptoHelper';
import { UnauthorizedException } from '../../../Api/Exception/UnauthorizedException';
import AuthHelper from '../Helpers/AuthHelper';
import moment from 'moment';
import { StorageRedis } from '../../../Api/Storage/StorageRedis';
import TokenStringHelper from '../../../Api/Helpers/TokenStringHelper';

export class AuthenticateService {
  private usersRepository: UsersRepository;
  private storageRedis: StorageRedis;
  constructor() {
    this.usersRepository = new UsersRepository();
    this.storageRedis = new StorageRedis();
  }

  public async invoke(dto: AuthenticateDto): Promise<AuthenticateDto> {
    const EXPIRES_TOKEN = Number(process.env.TOKEN_EXPIRES_MINUTES) * 60;

    const userEntity = await this.usersRepository.findOneByUsername(dto.userName);

    if (!userEntity) {
      throw new ResourceNotFoundException(CODE_ERROR_USER_NOT_EXIST);
    }

    if (!(await BCryptoHelper.compareValueWithHash(dto.userPassword, userEntity.userPassword))) {
      throw new UnauthorizedException(CODE_ERROR_LOGIN_FAILED);
    }

    logger.info('Storing token in redis');
    const token: string = await TokenStringHelper.generateString(8);
    await AuthHelper.saveUserAuth(token, userEntity, EXPIRES_TOKEN);

    logger.info(`Updating last access of user ${userEntity.userName} | ${moment().utc().toDate()}`);
    await this.usersRepository.updateLastAccess(userEntity.id);

    return { ...dto, tokenBn: token, tokenExpiresIn: EXPIRES_TOKEN };
  }
}
