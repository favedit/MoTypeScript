import {Base} from './Base'
import {ResourceManager} from '../io/ResourceManager'
import {Manager as CatlogManager} from '../catalog/meta/Manager';
import {Manager as MaterialManager} from '../material/Manager';


export class Product extends Base{
  resourceManager = ResourceManager.getInstance();
  catalogManager = CatlogManager.instance();
  materialManager = MaterialManager.instance();

  constructor(){
    super();
  }
}
