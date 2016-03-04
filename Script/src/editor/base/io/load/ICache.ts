/**
 * Created by omni360 on 16-2-22.
 */
import * as Url from "../../util/Url";
// TODO: 移除ICacheHelper
// FIXME: 替换ICacheHelper
export interface ICacheHelper {
  wrap:number;
  repeatX:number;
  repeatY:number;
  anisotropy:number;
  cacheKey:string;

}
export class ICache{
  /**
   * [get description]
   * @method get
   * @param  {string}      urlPath  [description]
   * @param  {CacheHelper} cacheObj [description]
   * @return {string}               [description]
   */
  public get(key:string,cacheObj?:ICacheHelper):string{
    let cacheKey:string = this._getCacheKey(key,cacheObj);
    return cacheKey ? this._doGet(cacheKey) : null;
  };

  /**
   * [urlPath description]
   * @type {string}
   */
  public set<T>(key:string,value:T,cacheObj:ICacheHelper){
    (key = this._getCacheKey(key,cacheObj)) && this._doSet(key,value);
  };

  /**
   * [urlPath description]
   * @type {string}
   */
  protected _doSet<T>(key:string,value:T){
    console.log("not implemented");
  };
  /**
   * [_doGet description]
   * @method _doGet
   * @param  {string} urlPath [description]
   * @return {any}            [description]
   */
  protected _doGet(key:string):any{
    console.log("not implemented");
  };
  /**
   * [_getCacheKey description]
   * @method _getCacheKey
   * @param  {string}      urlPath  [description]
   * @param  {CacheHelper} cacheObj [description]
   * @return {string}               [description]
   */
  protected _getCacheKey(key:string, cacheObj?:ICacheHelper ):string{
    return cacheObj.cacheKey ? cacheObj.cacheKey : key && Url.isDataUrl(key) ? null : key;

  }
}
