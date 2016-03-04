import {ICache} from '../ICache';
export class XMLCache extends ICache{
  /**
   * [_xmlByKey description]
   * @type {Map<string,any>}
   */
  private _xmlByKey: Map<string,any>;
  /**
   * [_doGet description]
   * @method _doGet
   * @param  {string} key [description]
   * @return {[type]}     [description]
   */
  protected _doGet(key:string){
    this._xmlByKey.get(key);
  }
  /**
   * [_doSet description]
   * @method _doSet
   * @param  {string}        key         [description]
   * @param  {SVGSVGElement} XMLDocument [description]
   * @return {[type]}                    [description]
   */
  protected _doSet(key:string,xmlDocument:SVGSVGElement){
    this._xmlByKey.set(key,xmlDocument);
  }
}
