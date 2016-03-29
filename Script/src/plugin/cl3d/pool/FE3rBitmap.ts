import {PoolObject} from './PoolObject';
import {FE3rBitmapPack} from './FE3rBitmapPack';

//==========================================================
// <T>渲染模型网格。</T>
//
// @author maocy
// @history 150106
//==========================================================
export class FE3rBitmap extends PoolObject {
   // @attribute
   protected _pack:FE3rBitmapPack = null;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
   }

   //==========================================================
   // <T>测试是否加载完成。</T>
   //
   // @method
   // @return 是否完成
   //==========================================================
   public testReady() {
      return this._pack.testReady();
   }

   //==========================================================
   // <T>获得纹理。</T>
   //
   // @method
   // @return 纹理
   //==========================================================
   public texture() {
      return this._pack.texture;
   }

   //==========================================================
   // <T>获得大小。</T>
   //
   // @method
   // @return SSize2 大小
   //==========================================================
   public loadResource(resource) {
      // this._resource = resource;
      // this._guid = resource.guid();
      // this._code = resource.code();
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      // 父处理
      super.dispose();
   }
}