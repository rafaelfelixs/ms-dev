import { AppDataSource } from './AppDataSource';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { logger, loggerError } from '../../Api/Utils/Logger';
export class DatabaseConfigure {
  public async initialize(): Promise<void> {
    try {
      if (!AppDataSource.isInitialized) {
        logger.info('Connecting database MySQL...');
        await AppDataSource.initialize();
        const { host } = <MysqlConnectionOptions>AppDataSource.options;
        logger.info(`Connected to the database MySQL. Host: ${host}`);
        return Promise.resolve();
      }
      logger.info('Using existing database connection MySQL...');
      return Promise.resolve();
    } catch (e) {
      loggerError(e);
      throw new Error('Failed connect database MySQL.');
    }
  }
}
