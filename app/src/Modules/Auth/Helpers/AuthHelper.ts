import { StorageRedis } from '../../../Api/Storage/StorageRedis';
import { loggerError } from '../../../Api/Utils/Logger';
import { Users } from '../../../Domain/Entities/Users';

export default class AuthHelper {
  private static prefixKey = 'AUTH_';
  private static storageRedis = new StorageRedis();

  public static async saveUserAuth(token: string, entity: Users, expiresInSeconds: number): Promise<void> {
    await this.storageRedis.set(this.prefixKey + token, JSON.stringify(entity), expiresInSeconds);
  }

  public static async getUserAuth(token: string): Promise<Users> {
    try {
      const data = await this.storageRedis.get(this.prefixKey + token);
      if (!data) {
        return null;
      }
      return <Users>JSON.parse(data);
    } catch (e) {
      loggerError(e);
    }
    return null;
  }
}
