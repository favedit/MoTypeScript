import {ScopeEnum} from '../../../runtime/common/lang/ScopeEnum';
import {ObjectPools} from '../../../runtime/common/lang/ObjectPools';
import {Linker} from '../../../runtime/common/reflect/Linker';
import {ClassUtil} from '../../../runtime/common/reflect/ClassUtil';
import {Service} from '../../../runtime/core/Service';
import {DeviceService} from '../../../runtime/ui/service/DeviceService';
import {Canvas} from './Canvas';

//==========================================================
// <T>画板控制台。</T>
//
// @console
// @author maocy
// @version 150411
//==========================================================
export class CanvasService extends Service {
   // 缓冲集合
   protected _pools: ObjectPools;
   // 设备管理器
   @Linker(DeviceService)
   protected _deviceService: DeviceService;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this._scopeCd = ScopeEnum.Local;
      this._pools = ClassUtil.create(ObjectPools);
   }

   //==========================================================
   // <T>根据大小收集一个画板。</T>
   //
   // @param width 宽度
   // @param height 高度
   // @return 画板
   //==========================================================
   public allocBySize(width, height, clazz: Function = Canvas): Canvas {
      var pools = this._pools;
      // 查找画板
      var code = width + 'x' + height;
      var canvas: Canvas = pools.alloc(code);
      if (!canvas) {
         // 创建画板
         canvas = ClassUtil.create(clazz);
         canvas.size.set(width, height);
         canvas.build(this._deviceService.htmlContainer);
      }
      // 重置处理
      canvas.reset();
      return canvas;
   }

   //==========================================================
   // <T>释放一个画板。</T>
   //
   // @param canvas 画板
   //==========================================================
   public free(canvas: Canvas) {
      var pools = this._pools;
      // 查找画板
      var size = canvas.size;
      var code = size.width + 'x' + size.height;
      pools.free(code, canvas);
   }
}