import 'reflect-metadata';
import 'dotenv/config';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  database: process.env.MYSQL_DATABASE,
  host: process.env.MYSQL_HOST,
  port: 3306,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  synchronize: false,
  logging: false,
  migrationsRun: false,
  entities: [`${__dirname}/../Entities/**/*.{js,ts}`],
  migrations: [`${__dirname}/../Migrations/**/*.{js,ts}`],
  subscribers: [],
});
