import { IApiTransformer } from '../../../Api/Transformers/IApiTransformer';
import { IDatabaseTransformer } from '../../../Api/Transformers/IDatabaseTransformer';
import { ClassValidator } from '../../../Api/Validation/ClassValidator';
import { AuthenticateRequest } from '../Request/AuthenticateRequest';
import { AuthenticateDto } from '../Dto/AuthenticateDto';
import { AuthenticateResponse } from '../Response/AuthenticateResponse';

export class AuthenticateTransformer implements IApiTransformer<AuthenticateDto, AuthenticateResponse> {
  public async fromApi(object: any, headers?: any): Promise<AuthenticateDto> {
    const requestObject = await ClassValidator.transformerToModel(AuthenticateRequest, object);

    await ClassValidator.validateInput(requestObject);

    return {
      userName: requestObject.userName,
      userPassword: requestObject.userPwd,
    };
  }

  public async toApi(dto: AuthenticateDto): Promise<AuthenticateResponse> {
    return {
      tokenBn: dto.tokenBn,
      tokenExpiresIn: dto.tokenExpiresIn,
    };
  }
}
