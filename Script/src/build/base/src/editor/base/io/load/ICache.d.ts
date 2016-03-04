export interface ICacheHelper {
    wrap: number;
    repeatX: number;
    repeatY: number;
    anisotropy: number;
    cacheKey: string;
}
export declare class ICache {
    /**
     * [get description]
     * @method get
     * @param  {string}      urlPath  [description]
     * @param  {CacheHelper} cacheObj [description]
     * @return {string}               [description]
     */
    get(key: string, cacheObj?: ICacheHelper): string;
    /**
     * [urlPath description]
     * @type {string}
     */
    set<T>(key: string, value: T, cacheObj: ICacheHelper): void;
    /**
     * [urlPath description]
     * @type {string}
     */
    protected _doSet<T>(key: string, value: T): void;
    /**
     * [_doGet description]
     * @method _doGet
     * @param  {string} urlPath [description]
     * @return {any}            [description]
     */
    protected _doGet(key: string): any;
    /**
     * [_getCacheKey description]
     * @method _getCacheKey
     * @param  {string}      urlPath  [description]
     * @param  {CacheHelper} cacheObj [description]
     * @return {string}               [description]
     */
    protected _getCacheKey(key: string, cacheObj?: ICacheHelper): string;
}
