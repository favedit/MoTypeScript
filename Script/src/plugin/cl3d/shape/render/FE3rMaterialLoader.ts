import {FObject} from '../../../runtime/common/lang/FObject';
import {ESamplerFilter} from '../../../runtime/graphic/base/ESamplerFilter';
import {FGraphicObject} from '../../../runtime/graphic/core/FGraphicObject';
import {IProcessLoadable} from '../../../runtime/core/console/IProcessLoadable';
import {FE3rComponent} from './FE3rComponent';

//==========================================================
// <T>材质。</T>
//
// @class
// @author maocy
// @history 150417
//==========================================================
export class FE3rMaterialLoader extends FGraphicObject implements IProcessLoadable {
   public dataReady = false;
   public ready = false;
   public material;
   public resource;
   //_visible       = MO.Class.register(o, new MO.AGetSet('_visible'), true);
   //_guid          = MO.Class.register(o, new MO.AGetSet('_guid'));
   // @method
   //_bitmaps       = MO.Class.register(o, new MO.AGetter('_bitmaps'));
   // @attribute 材质引用
   //_reference     = MO.Class.register(o, new MO.AGetter('_reference'));

   // //==========================================================
   // // <T>根据代码查找位图。</T>
   // //
   // // @method
   // // @param code:String 代码
   // // @return FE3rBitmap 位图
   // //==========================================================
   // MO.FE3rMaterial_findBitmap = function FE3rMaterial_findBitmap(code){
   //    return this._bitmaps.get(code);
   // }

   //==========================================================
   // <T>测试是否准备好。</T>
   //
   // @method
   // @return Boolean 是否准备好
   //==========================================================
   public testReady() {
      // if (!this._ready) {
      //    var bitmaps = this._bitmaps;
      //    if (bitmaps) {
      //       var count = bitmaps.count();
      //       for (var i = 0; i < count; i++) {
      //          var bitmap = bitmaps.at(i);
      //          if (!bitmap.testReady()) {
      //             return false;
      //          }
      //       }
      //    }
      //    this._ready = true;
      // }
      //
      return this.ready;
   }
   // 状态
   statusLoading: boolean;

   //==========================================================
   // <T>处理加载开始。</T>
   //
   // @param 处理结果
   //==========================================================
   public processLoadBegin(): boolean {
      return true;
   }

   //==========================================================
   // <T>处理加载</T>
   //
   // @param 处理结果
   //==========================================================
   public processLoad(): boolean {
      var ready = this.ready;
      if (!this.dataReady) {
         var resource = this.resource;
         if (resource.testReady()) {
            if (resource.className == 'phone') {
               var material = new

            }
            debugger;
            this.dataReady = true;
         }
      }
      return ready;
   }

   //==========================================================
   // <T>处理加载结束。</T>
   //
   // @param 处理结果
   //==========================================================
   public processLoadEnd(): boolean {
      return true;
   }
}