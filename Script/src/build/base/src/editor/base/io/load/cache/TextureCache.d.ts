import { ICache } from '../ICache';
export declare class TextureCache extends ICache {
    /**
     * [_textureByKey description]
     * @type {Map<string,THREE.Texture>}
     */
    private _textureByKey;
    /**
     * [_doGet description]
     * @method _doGet
     * @param  {string} key [description]
     * @return {any}        [description]
     */
    protected _doGet(key: string): any;
    /**
     * [_doSet description]
     * @method _doSet
     * @param  {string}        key   [description]
     * @param  {THREE.Texture} value [description]
     * @return {[type]}              [description]
     */
    protected _doSet(key: string, value: THREE.Texture): void;
}
