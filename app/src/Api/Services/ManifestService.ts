import { ManifestDto } from '../Dto/ManifestDto';
import packageJson from '../../../package.json';
import moment from 'moment';

export class ManifestService {
  public async invoke(): Promise<ManifestDto> {
    return {
      timestamp: moment.now().toString(),
      version: packageJson.version,
    };
  }
}
