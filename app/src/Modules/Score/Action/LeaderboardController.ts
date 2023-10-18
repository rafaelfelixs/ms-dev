import { IApiTransformer } from '../../../Api/Transformers/IApiTransformer';
import { NextFunction, Request, Response } from 'express';
import { LeaderboardDto } from '../Dto/LeaderboardDto';
import { LeaderboardResponse } from '../Response/LeaderboardResponse';
import { LeaderboardService } from '../Services/LeaderboardService';

export class LeaderboardController {
  constructor(private readonly transformer: IApiTransformer<LeaderboardDto, LeaderboardResponse>, private readonly service: LeaderboardService) {}

  public async handle(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      let dto = <LeaderboardDto>await this.transformer.fromApi(req.body);
      dto = await this.service.invoke(dto);
      const response = <LeaderboardResponse>await this.transformer.toApi(dto);
      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
}
