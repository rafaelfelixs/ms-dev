import 'reflect-metadata';
import 'dotenv/config';
import { App } from './App';
import { ConnectServer } from './ConnectServer';
import { DatabaseConfigure } from './Domain/Configure/DatabaseConfigure';

const start = async () => {
  const databaseConfigure = new DatabaseConfigure();
  await databaseConfigure.initialize();
  const connectServer = new ConnectServer(new App());
  connectServer.startServer();
};

start().then();
