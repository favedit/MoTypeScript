import {ScopeEnum} from '../../../runtime/common/lang/ScopeEnum';
import {ObjectPools} from '../../../runtime/common/lang/ObjectPools';
import {ClassUtil} from '../../../runtime/common/reflect/ClassUtil';
import {FConsole} from '../../../runtime/core/FConsole';
import {FCanvas} from './FCanvas';

//==========================================================
// <T>画板控制台。</T>
//
// @console
// @author maocy
// @version 150411
//==========================================================
export class FCanvasConsole extends FConsole {
   // 缓冲集合
   protected _pools: ObjectPools = null;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this.scopeCd = ScopeEnum.Local;
      this._pools = ClassUtil.create(ObjectPools);
   }

   //==========================================================
   // <T>根据大小收集一个画板。</T>
   //
   // @method
   // @param width:Integer 宽度
   // @param height:Integer 高度
   // @return FE2dCanvas 画板
   //==========================================================
   public allocBySize(width, height, clazz:Function = FCanvas) {
      var o = this;
      var pools = o._pools;
      // 查找画板
      var code = width + 'x' + height;
      var canvas = pools.alloc(code);
      if (!canvas) {
          // 创建画板
          canvas = ClassUtil.create(clazz);
          canvas.size().set(width, height);
          // canvas.build(RWindow._hDocument);
      }
      // 重置处理
      canvas.reset();
      return canvas;
   }

   //==========================================================
   // <T>释放一个画板。</T>
   //
   // @method
   // @param canvas:FE2dCanvas 画板
   //==========================================================
   public free(canvas) {
      var o = this;
      var pools = o._pools;
      // 查找画板
      var size = canvas.size();
      var code = size.width + 'x' + size.height;
      pools.free(code, canvas);
   }
}