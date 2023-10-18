import { IApiTransformer } from '../../../Api/Transformers/IApiTransformer';
import { ClassValidator } from '../../../Api/Validation/ClassValidator';
import { SaveScoreRequest } from '../Request/SaveScoreRequest';
import { UserScoreDto } from '../Dto/UserScoreDto';

export class SaveScoreTransformer implements IApiTransformer<UserScoreDto, any> {
  public async fromApi(object: any, headers?: any): Promise<UserScoreDto> {
    const requestObject = await ClassValidator.transformerToModel(SaveScoreRequest, object);

    await ClassValidator.validateInput(requestObject);

    return {
      score: Number(requestObject.myScore),
      token: requestObject.token,
    };
  }

  public async toApi(dto: any): Promise<any> {
    throw new Error('Method implementation');
  }
}
