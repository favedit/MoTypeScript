import {ICache} from '../ICache';
export class TextureCache extends ICache{
  /**
   * [_textureByKey description]
   * @type {Map<string,THREE.Texture>}
   */
  private _textureByKey:Map<string,THREE.Texture>;
  /**
   * [_doGet description]
   * @method _doGet
   * @param  {string} key [description]
   * @return {any}        [description]
   */
  protected _doGet(key:string):any{
    let resault:any;
    (resault = this._textureByKey.get(key)) && resault.xAndRef();
    return resault;
  }
  /**
   * [_doSet description]
   * @method _doSet
   * @param  {string}        key   [description]
   * @param  {THREE.Texture} value [description]
   * @return {[type]}              [description]
   */
  protected _doSet(key:string,value:THREE.Texture){
    this._textureByKey.set(key,value);
    value.addEventListener("dispose",()=>{
      this._textureByKey.delete(key);
    });
  }
}
