import {FObject} from '../../../runtime/common/lang/FObject';
import {RBoolean} from '../../../runtime/common/lang/RBoolean';
import {REnum} from '../../../runtime/common/lang/REnum';
import {ETexture} from './ETexture';

//==========================================================
// <T>渲染程序取样。</T>
//
// @author maocy
// @history 141230
//==========================================================
export class FProgramSampler extends FObject {
   //..........................................................
   // 名称
   public name: string;
   // 关联名称
   public linker: string;
   // 使用标志
   public statusUsed: boolean;
   // 插槽
   public formatCd: ETexture;
   // 插槽
   public bind: boolean;
   // 插槽
   public slot: number;
   // 索引
   public index: number;
   // 来源
   public source: string;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      this.statusUsed = false;
      this.formatCd = ETexture.Flat2d;
      this.bind = true;
      this.slot = -1;
      this.index = 0;
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
