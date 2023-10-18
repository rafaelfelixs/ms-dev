import { IApiTransformer } from '../../../Api/Transformers/IApiTransformer';
import { NextFunction, Request, Response } from 'express';
import { CreateUserService } from '../Services/CreateUserService';
import { UserDto } from '../Dto/UserDto';

export class CreateUserController {
  constructor(private readonly transformer: IApiTransformer<UserDto, any>, private readonly service: CreateUserService) {}

  public async handle(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const dto = <UserDto>await this.transformer.fromApi(req.body);
      await this.service.invoke(dto);
      return res.status(200).send('OK');
    } catch (error) {
      next(error);
    }
  }
}
