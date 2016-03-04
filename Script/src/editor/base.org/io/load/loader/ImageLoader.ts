import {ILoader} from '../ILoader';
import {ILoaderHelper} from '../ILoader';
// TODO: 移除ILoaderHelper
// FIXME: 替换ILoaderHelper
export class ImageLoader extends ILoader{
  public load(url:string,object?:ILoaderHelper){
    let loadObject = object || {};
  }

}
