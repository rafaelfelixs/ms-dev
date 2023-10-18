import { CreateUserController } from './Action/CreateUserController';
import { CreateUserTransformer } from './Transformer/CreateUserTransformer';
import { CreateUserService } from './Services/CreateUserService';

const createUserTransformer: CreateUserTransformer = new CreateUserTransformer();
export const createUserController: CreateUserController = new CreateUserController(createUserTransformer, new CreateUserService(createUserTransformer));
