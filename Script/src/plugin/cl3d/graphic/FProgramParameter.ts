import {FObject} from '../../../runtime/common/lang/FObject';
import {FError} from '../../../runtime/common/lang/FError';
import {RFloat} from '../../../runtime/common/lang/RFloat';
import {REnum} from '../../../runtime/common/lang/REnum';
import {SMatrix3d} from '../../../runtime/graphic/math/SMatrix3d';
import {EParameterFormat} from './EParameterFormat';

//==========================================================
// <T>渲染程序参数。</T>
//
// @author maocy
// @history 141230
//==========================================================
export class FProgramParameter extends FObject {
   // 名称
   public name: string;
   // 关联名称
   public linker: string;
   // 格式
   public formatCd: EParameterFormat;
   // 关联名称
   public define: string;
   // 使用标志
   public statusUsed: boolean;
   // 插槽
   public slot;
   // 大小
   public size;
   // 缓冲
   public buffer;
   // 内存
   public memory;

   //==========================================================
   // <T>构造处理</T>
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this.formatCd = EParameterFormat.Unknown;
      this.statusUsed = false;
      this.size = 0;
   }

   //==========================================================
   // <T>接收数据，返回是否发生变更。</T>
   //
   // @method
   // @param value:Object 数据
   // @return Boolean 是否变更
   //==========================================================
   public attachData(value) {
      // var result = false;
      // // 检查参数类型
      // var clazz = value.constructor;
      // if (clazz == SMatrix3d) {
      //    // 矩阵数据
      //    var memory = this.memory;
      //    if (!memory) {
      //       memory = this.memory = new Float32Array(16);
      //    }
      //    result = RFloat.attach(memory, value._data, 16);
      // } else if (clazz == Float32Array) {
      //    // 浮点数据
      //    var length = value.length;
      //    var memory = this.memory;
      //    if (!memory) {
      //       memory = this.memory = new Float32Array(length);
      //    }
      //    result = RFloat.attach(memory, value, length);
      // } else {
      //    throw new FError(this, 'Unknown data type.');
      // }
      // return result;
      return true;
   }

   //==========================================================
   // <T>从配置节点钟加载信息。</T>
   //
   // @method
   // @param xconfig:TNode 配置节点
   //==========================================================
   public loadConfig(xconfig) {
      this.name = xconfig.get('name');
      this.linker = xconfig.get('linker');
      this.formatCd = REnum.encode(EParameterFormat, xconfig.get('format'));
      this.define = xconfig.get('define');
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      this.slot = null;
      this.memory = null;
      // 父处理
      super.dispose();
   }
}
