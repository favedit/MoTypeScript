import {FObject} from '../../../../runtime/common/lang/FObject';
import {RBoolean} from '../../../../runtime/common/lang/RBoolean';
import {REnum} from '../../../../runtime/common/lang/REnum';
import {ETexture} from './ETexture';

//==========================================================
// <T>渲染程序取样。</T>
//
// @author maocy
// @history 141230
//==========================================================
export class FProgramSampler extends FObject {
   //..........................................................
   // @attribute 名称
   public name = null;
   // @attribute 关联名称
   public linker = null;
   // @attribute 使用标志
   public statusUsed = false;
   // @attribute 插槽
   public formatCd = ETexture.Flat2d;
   // @attribute 插槽
   public bind = true;
   // @attribute 插槽
   public slot = -1;
   // @attribute 索引
   public index = 0;
   // @attribute 来源
   public source = null;

   //==========================================================
   // <T>从配置节点钟加载信息。</T>
   //
   // @method
   // @param xconfig:TNode 配置节点
   //==========================================================
   public loadConfig(xconfig) {
      this.name = xconfig.get('name');
      this.linker = xconfig.get('linker');
      this.bind = RBoolean.parse(xconfig.get('bind', 'Y'));
      this.formatCd = REnum.encode(ETexture, xconfig.get('format', 'Flat2d'));
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
