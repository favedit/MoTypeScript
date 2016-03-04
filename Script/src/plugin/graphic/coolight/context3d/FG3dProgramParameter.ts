import {FObject} from '../../../../runtime/common/lang/FObject';

//==========================================================
// <T>渲染程序参数。</T>
//
// @author maocy
// @history 141230
//==========================================================
export class FG3dProgramParameter extends FObject {
   // @attribute 名称
   //o._name = MO.Class.register(o, new MO.AGetter('_name'));
   // @attribute 关联名称
   //o._linker = MO.Class.register(o, new MO.AGetter('_linker'));
   // @attribute 格式
   //o._formatCd = MO.EG3dParameterFormat.Unknown;
   // @attribute 关联名称
   //o._define = MO.Class.register(o, new MO.AGetter('_define'));
   // @attribute 使用标志
   _statusUsed = false;
   // @attribute 插槽
   _slot = null;
   // @attribute 大小
   _size = 0;
   // @attribute 缓冲
   _buffer = null;
   // @attribute 内存
   _memory = null;

   //==========================================================
   // <T>接收数据，返回是否发生变更。</T>
   //
   // @method
   // @param value:Object 数据
   // @return Boolean 是否变更
   //==========================================================
   public attachData(value) {
      var o = this;
      var result = false;
      // 检查参数类型
      /*var clazz = value.constructor;
      if (clazz == MO.SMatrix3d) {
         // 矩阵数据
         var memory = o._memory;
         if (!memory) {
            memory = o._memory = new Float32Array(16);
         }
         result = MO.Lang.Float.attach(memory, value._data, 16);
      } else if (clazz == Float32Array) {
         // 浮点数据
         var length = value.length;
         var memory = o._memory;
         if (!memory) {
            memory = o._memory = new Float32Array(length);
         }
         result = MO.Lang.Float.attach(memory, value, length);
      } else {
         throw new MO.TError(o, 'Unknown data type.');
      }*/
      return result;
   }

   //==========================================================
   // <T>从配置节点钟加载信息。</T>
   //
   // @method
   // @param xconfig:TNode 配置节点
   //==========================================================
   public loadConfig(xconfig) {
      //this._name = xconfig.get('name');
      //this._linker = xconfig.get('linker');
      //this._formatCd = MO.Lang.Enum.encode(MO.EG3dParameterFormat, xconfig.get('format'));
      //this._define = xconfig.get('define');
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      this._slot = null;
      this._memory = null;
      // 父处理
      super.dispose();
   }
}
