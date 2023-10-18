import { IApiTransformer } from '../../../Api/Transformers/IApiTransformer';
import { NextFunction, Request, Response } from 'express';
import { AuthenticateService } from '../Services/AuthenticateService';
import { AuthenticateDto } from '../Dto/AuthenticateDto';
import { AuthenticateResponse } from '../Response/AuthenticateResponse';

export class AuthenticateController {
  constructor(private readonly transformer: IApiTransformer<AuthenticateDto, AuthenticateResponse>, private readonly service: AuthenticateService) {}

  public async handle(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      let dto = <AuthenticateDto>await this.transformer.fromApi(req.body);
      dto = await this.service.invoke(dto);
      const response = await this.transformer.toApi(dto);
      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
}
