import { ManifestService } from './Services/ManifestService';
import { ManifestController } from './Actions/ManifestController';

const manifestController = new ManifestController(new ManifestService());

export { manifestController };
