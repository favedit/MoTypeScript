import {ObjectBase} from '../../../runtime/common/lang/ObjectBase';
import {EnumUtil} from '../../../runtime/common/lang/EnumUtil';
import {AttributeFormatEnum} from './AttributeFormatEnum';

//==========================================================
// <T>渲染程序属性。</T>
//
// @author maocy
// @history 141230
//==========================================================
export class ProgramAttribute extends ObjectBase {
   //..........................................................
   // @attribute 名称
   public name: string;
   // @attribute 关联名称
   public linker: string;
   // @attribute 使用标志
   public statusUsed: boolean = false;
   // @attribute 插槽
   public slot: any = null;
   // @attribute 索引
   public index: number = -1;
   // @attribute 格式
   public formatCd: AttributeFormatEnum = AttributeFormatEnum.Unknown;

   //==========================================================
   // <T>从配置节点钟加载信息。</T>
   //
   // @method
   // @param xconfig:TNode 配置节点
   //==========================================================
   public loadConfig(xconfig) {
      this.name = xconfig.get('name');
      this.linker = xconfig.get('linker');
      this.formatCd = EnumUtil.encode(AttributeFormatEnum, xconfig.get('format'));
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
