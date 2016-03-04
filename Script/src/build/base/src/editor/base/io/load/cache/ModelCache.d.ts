/**
 * Created by omni360 on 16-2-22
 */
import { ICache } from '../ICache';
/**
 *
 */
export declare class ModelCache extends ICache {
    private _meshDataByKey;
    /**
     * [_doGet description]
     * @method _doGet
     * @param  {string} key [description]
     * @return {[type]}     [description]
     */
    protected _doGet(key: string): THREE.Object3D;
    /**
     * [_doSet description]
     * @method _doSet
     * @param  {string}     key   [description]
     * @param  {THREE.Mesh} value [description]
     * @return {[type]}           [description]
     */
    protected _doSet(key: string, value: THREE.Mesh): void;
}
