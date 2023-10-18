import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';
import { elapsedTime } from '../Utils/ElapsedTime';
import { logger } from '../Utils/Logger';
import { v4 as uuidv4 } from 'uuid';
import { LoggerInternalDto } from '../Dto/LoggerInternalDto';

const IGNORE_ROUTES = ['GET ', 'POST ', 'PUT ', 'GET /', 'GET /favicon.ico', 'GET /is-alive', 'GET /api/is-alive'];

const getMethod = async (req: Request) => {
  const { query, route } = req;
  let routePath = route && route.path ? '/api' + route.path : req.path;
  const queryObjectList = query ? Object.keys(query) : [];
  if (queryObjectList.length > 0) {
    routePath = routePath + '?' + queryObjectList.map((key: string) => key + '=').join('&');
  }
  return {
    method: req.method + ' ' + routePath,
    originalMethod: req.method + ' ' + req.originalUrl,
  };
};

const ignoreRoute = (url: string) => {
  return IGNORE_ROUTES.indexOf(url) !== -1;
};

const registerLoggerMiddleware = async (startTime: [number, number], req: Request, res: Response, responseBody: any, isCloseRequest: boolean) => {
  const { method, originalMethod } = await getMethod(req);
  if (ignoreRoute(originalMethod)) {
    return;
  }

  const requestBody = req.body ? JSON.stringify(req.body) : 'null';

  const host = req.headers['host'];
  const requestId = req.headers['x-request-id'];

  const loggerInternal = new LoggerInternalDto(startTime, String(requestId), method, originalMethod, requestBody);
  loggerInternal.remoteIp = host;
  loggerInternal.clientIp = host;
  loggerInternal.elapsedTime = elapsedTime(loggerInternal.startTime);
  loggerInternal.startTime = undefined;

  loggerInternal.statusCode = isCloseRequest ? res.statusCode : 499;

  if (process.env.NODE_ENV === 'test' && loggerInternal.statusCode <= 400) {
    return;
  }

  if (loggerInternal.statusCode <= 204 || loggerInternal.statusCode === 304) {
    loggerInternal.responseBody = req.method !== 'GET' && responseBody ? JSON.stringify(responseBody) : 'null';
    const message = JSON.stringify(loggerInternal);
    logger.info(message);
  } else {
    loggerInternal.error = responseBody ? JSON.stringify(responseBody) : 'null';
    const message = JSON.stringify(loggerInternal);
    logger.error(message);
  }
};

export const logMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const startTime: [number, number] = process.hrtime();

  req.headers['x-request-id'] = uuidv4();

  let responseBody = null;

  const oldSend = res.send;
  res.send = (data: any) => {
    responseBody = data;
    res.send = oldSend;
    return res.send(data);
  };

  let isCloseRequest = false;
  res.on('finish', () => {
    isCloseRequest = true;
    registerLoggerMiddleware(startTime, req, res, responseBody, isCloseRequest).then();
  });

  res.on('close', () => {
    if (!isCloseRequest) {
      responseBody = 'Client closed request';
      registerLoggerMiddleware(startTime, req, res, responseBody, isCloseRequest).then();
    }
  });

  next();
};
