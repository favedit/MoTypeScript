import { ICache } from '../ICache';
export declare class XMLCache extends ICache {
    /**
     * [_xmlByKey description]
     * @type {Map<string,any>}
     */
    private _xmlByKey;
    /**
     * [_doGet description]
     * @method _doGet
     * @param  {string} key [description]
     * @return {[type]}     [description]
     */
    protected _doGet(key: string): void;
    /**
     * [_doSet description]
     * @method _doSet
     * @param  {string}        key         [description]
     * @param  {SVGSVGElement} XMLDocument [description]
     * @return {[type]}                    [description]
     */
    protected _doSet(key: string, xmlDocument: SVGSVGElement): void;
}
