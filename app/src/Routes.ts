import express, { NextFunction, Request, Response } from 'express';
import { createUserController } from './Modules/Users';
import { authenticateController } from './Modules/Auth';
import { leaderboardController, saveScoreController } from './Modules/Score';

const router = express.Router();

/* User routes */
router.post('/newAccount', (req: Request, res: Response, next: NextFunction) => {
  return createUserController.handle(req, res, next);
});

/* Auth routes */
router.post('/login', (req: Request, res: Response, next: NextFunction) => {
  return authenticateController.handle(req, res, next);
});

/* Scores & Leaderboard routes */
router.post('/saveScore', (req: Request, res: Response, next: NextFunction) => {
  return saveScoreController.handle(req, res, next);
});

router.post('/leaderBoard', (req: Request, res: Response, next: NextFunction) => {
  return leaderboardController.handle(req, res, next);
});

export { router };
