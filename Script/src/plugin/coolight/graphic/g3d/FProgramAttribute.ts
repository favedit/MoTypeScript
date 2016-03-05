import {FObject} from '../../../../runtime/common/lang/FObject';
import {REnum} from '../../../../runtime/common/lang/REnum';
import {EAttributeFormat} from './EAttributeFormat';

//==========================================================
// <T>渲染程序属性。</T>
//
// @author maocy
// @history 141230
//==========================================================
export class FProgramAttribute extends FObject {
   //..........................................................
   // @attribute 名称
   public name = null;
   // @attribute 关联名称
   public linker = null;
   // @attribute 使用标志
   public statusUsed = false;
   // @attribute 插槽
   public slot = null;
   // @attribute 索引
   public index = -1;
   // @attribute 格式
   public formatCd = EAttributeFormat.Unknown;

   //==========================================================
   // <T>从配置节点钟加载信息。</T>
   //
   // @method
   // @param xconfig:TNode 配置节点
   //==========================================================
   public loadConfig(xconfig) {
      this.name = xconfig.get('name');
      this.linker = xconfig.get('linker');
      this.formatCd = REnum.encode(EAttributeFormat, xconfig.get('format'));
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      this.slot = null;
      // 父处理
      super.dispose();
   }
}
