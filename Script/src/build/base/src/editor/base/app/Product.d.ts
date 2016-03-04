import { Base } from './Base';
import { ResourceManager } from '../io/ResourceManager';
import { Manager as CatlogManager } from '../catalog/meta/Manager';
import { Manager as MaterialManager } from '../material/Manager';
export declare class Product extends Base {
    resourceManager: ResourceManager;
    catalogManager: CatlogManager;
    materialManager: MaterialManager;
    constructor();
}
