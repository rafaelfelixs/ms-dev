import { Repository } from 'typeorm/repository/Repository';
import { AppDataSource } from '../Configure/AppDataSource';
import { Users } from '../Entities/Users';
import { MySqlDbErrorException } from '../../Api/Exception/MySqlDbErrorException';
import moment from 'moment';
import { loggerError } from '../../Api/Utils/Logger';

export class UsersRepository extends Repository<Users> {
  constructor() {
    super(Users, AppDataSource.manager);
  }
  public async findOneByUsername(userName: string): Promise<Users> {
    try {
      return await this.findOne({
        where: { userName },
        cache: false,
      });
    } catch (e) {
      throw new MySqlDbErrorException(e);
    }
    return null;
  }

  public async updateLastAccess(userId: string): Promise<void> {
    try {
      await this.createQueryBuilder().update(Users).set({ lastAccess: new Date() }).where({ id: userId }).execute();
    } catch (e) {
      loggerError(e);
    }
  }
}
