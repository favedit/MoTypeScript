/**
 * Created by omni360 on 16-2-22
 */
import {ICache} from '../ICache';
/**
 *
 */
export class ModelCache extends ICache{
  private _meshDataByKey:Map<string,any>;

  /**
   * [_doGet description]
   * @method _doGet
   * @param  {string} key [description]
   * @return {[type]}     [description]
   */
  protected _doGet(key:string):THREE.Object3D {
    let items = this._meshDataByKey.get(key);
    if (!items)
        return items;
    let resault = new THREE.Object3D;
    items.forEach((item)=> {
        item.geometry.xAddRef();
        let mesh = new THREE.Mesh(item.geometry,item.material);
        mesh.name = mesh.name;
        resault.add(mesh)
    });
    return resault;
  };
  /**
   * [_doSet description]
   * @method _doSet
   * @param  {string}     key   [description]
   * @param  {THREE.Mesh} value [description]
   * @return {[type]}           [description]
   */
  protected _doSet(key:string,value:THREE.Mesh){
    let cacheObj = value.children.map((child:THREE.Mesh)=>{
        return {
            name: child.name,
            geometry: child.geometry,
            material: child.material
        }
    });
    this._meshDataByKey.set(key, cacheObj);
    if(cacheObj.length === 0){
      console.log("empty model cached for: " + key)
    }else{
      cacheObj[0].geometry.addEventListener("dispose",()=>{
        this._meshDataByKey.delete(key);
      });
    }
  };
}
