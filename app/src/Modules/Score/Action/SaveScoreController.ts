import { IApiTransformer } from '../../../Api/Transformers/IApiTransformer';
import { NextFunction, Request, Response } from 'express';
import { SaveScoreService } from '../Services/SaveScoreService';
import { UserScoreDto } from '../Dto/UserScoreDto';

export class SaveScoreController {
  constructor(private readonly transformer: IApiTransformer<UserScoreDto, any>, private readonly service: SaveScoreService) {}

  public async handle(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const dto = <UserScoreDto>await this.transformer.fromApi(req.body);
      await this.service.invoke(dto);
      return res.status(200).send('OK');
    } catch (error) {
      next(error);
    }
  }
}
