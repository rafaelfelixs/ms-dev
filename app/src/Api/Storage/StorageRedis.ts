import { createClient } from 'redis';
import { loggerError } from '../Utils/Logger';
import { UserScoreDto } from '../../Modules/Score/Dto/UserScoreDto';

export class StorageRedis {
  public async set(key: string, value: string, expireSeconds?: number): Promise<void> {
    try {
      const client = createClient({ url: process.env.REDIS_URL });
      await client.connect();
      await client.set(key, value);
      if (expireSeconds && expireSeconds > 0) {
        await client.expire(key, expireSeconds);
      }
      await client.quit();
    } catch (e) {
      loggerError(e);
    }
  }

  public async get(key: string): Promise<string | null> {
    try {
      const client = createClient({ url: process.env.REDIS_URL });
      await client.connect();
      const jsonString = <string>await client.get(key);
      await client.quit();
      return Promise.resolve(jsonString);
    } catch (e) {
      loggerError(e);
    }
    return Promise.resolve(null);
  }

  public async del(key: string): Promise<void> {
    try {
      const client = createClient({ url: process.env.REDIS_URL });
      await client.connect();
      await client.del(key);
      await client.quit();
    } catch (e) {
      loggerError(e);
    }
  }

  public async zAddScore(score: number, userName: string): Promise<void> {
    const client = createClient({ url: process.env.REDIS_URL });
    await client.connect();
    try {
      await client.zAdd(
        'leaderBoard',
        [
          {
            score: score,
            value: userName,
          },
        ],
        { GT: true }
      );
    } catch (e) {
      loggerError(e);
    } finally {
      await client.quit();
    }
  }

  public async zScanLeaderboard(): Promise<UserScoreDto[]> {
    const client = createClient({ url: process.env.REDIS_URL });
    await client.connect();
    let result: UserScoreDto[] = [];
    try {
      for await (const { score, value } of client.zScanIterator('leaderBoard')) {
        result.push({
          userName: value,
          score: score,
        });
      }
      return result;
    } catch (e) {
      loggerError(e);
    } finally {
      await client.quit();
    }
  }

  public async zRankUser(userName: string): Promise<any> {
    const client = createClient({ url: process.env.REDIS_URL });
    await client.connect();
    try {
      return await client.zRank('leaderBoard', userName);
    } catch (e) {
      loggerError(e);
    } finally {
      await client.quit();
    }
  }

  public async zScoreUser(userName: string): Promise<number> {
    const client = createClient({ url: process.env.REDIS_URL });
    await client.connect();
    try {
      return await client.zScore('leaderBoard', userName);
    } catch (e) {
      loggerError(e);
    } finally {
      await client.quit();
    }
  }
}
