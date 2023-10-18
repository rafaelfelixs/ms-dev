import { CreateUserTransformer } from '../Transformer/CreateUserTransformer';
import { UsersRepository } from '../../../Domain/Repositories/UsersRepository';
import { ResourceAlreadyExistsException } from '../../../Api/Exception/ResourceAlreadyExistsException';

import { CODE_ERROR_ACCOUNT_ALREADY_EXISTS } from '../Exception/CodeErrors/CodeErrors';
import { logger } from '../../../Api/Utils/Logger';
import { UserDto } from '../Dto/UserDto';

export class CreateUserService {
  private usersRepository: UsersRepository;
  constructor(private readonly transformer: CreateUserTransformer) {
    this.usersRepository = new UsersRepository();
  }

  public async invoke(dto: UserDto): Promise<void> {
    if (await this.usersRepository.findOneByUsername(dto.userName)) {
      throw new ResourceAlreadyExistsException(CODE_ERROR_ACCOUNT_ALREADY_EXISTS);
    }

    const userEntity = await this.transformer.toEntity(dto);

    await this.usersRepository.save(userEntity);
    logger.info(`User ${userEntity.userName} created successfully!`);
  }
}
