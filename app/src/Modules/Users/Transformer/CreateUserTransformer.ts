import { IApiTransformer } from '../../../Api/Transformers/IApiTransformer';
import { IDatabaseTransformer } from '../../../Api/Transformers/IDatabaseTransformer';
import { ClassValidator } from '../../../Api/Validation/ClassValidator';
import { CreateUserRequest } from '../Request/CreateUserRequest';
import { UserDto } from '../Dto/UserDto';
import { Users } from '../../../Domain/Entities/Users';
import BCryptoHelper from '../../../Api/Helpers/BCryptoHelper';
import { v4 as uuidv4 } from 'uuid';

export class CreateUserTransformer implements IApiTransformer<UserDto, any>, IDatabaseTransformer<UserDto, Users> {
  public async fromApi(object: any, headers?: any): Promise<UserDto> {
    const requestObject = await ClassValidator.transformerToModel(CreateUserRequest, object);

    await ClassValidator.validateInput(requestObject);

    return {
      userName: requestObject.userName,
      userPassword: requestObject.userPwd,
    };
  }

  public async toApi(dto: any): Promise<any> {
    throw new Error('Method implementation');
  }

  public async toDto(entity: any, dto: any): Promise<any> {
    throw new Error('Method implementation');
  }

  public async toEntity(dto: UserDto): Promise<Users> {
    const user: Users = new Users();
    user.id = uuidv4();
    user.userName = dto.userName;
    user.userPassword = await BCryptoHelper.generateHash(dto.userPassword);
    return user;
  }
}
