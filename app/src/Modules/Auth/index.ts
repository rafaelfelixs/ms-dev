import { AuthenticateController } from './Action/AuthenticateController';
import { AuthenticateTransformer } from './Transformer/AuthenticateTransformer';
import { AuthenticateService } from './Services/AuthenticateService';

export const authenticateController: AuthenticateController = new AuthenticateController(new AuthenticateTransformer(), new AuthenticateService());
