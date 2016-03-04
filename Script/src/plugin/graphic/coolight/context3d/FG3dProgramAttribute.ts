import {FObject} from '../../../../runtime/common/lang/FObject';
import {EG3dAttributeFormat} from './EG3dAttributeFormat';

//==========================================================
// <T>渲染程序属性。</T>
//
// @author maocy
// @history 141230
//==========================================================
export class FG3dProgramAttribute extends FObject {
   //..........................................................
   // @attribute 名称
   //o._name = MO.Class.register(o, new MO.AGetter('_name'));
   protected _name = null;
   // @attribute 关联名称
   //o._linker = MO.Class.register(o, new MO.AGetter('_linker'));
   protected _linker = null;
   // @attribute 使用标志
   //o._statusUsed = MO.Class.register(o, new MO.AGetter('_statusUsed'), false);
   protected _statusUsed = null;
   // @attribute 插槽
   protected _slot = null;
   // @attribute 索引
   protected _index = -1;
   // @attribute 格式
   //o._formatCd = MO.Class.register(o, new MO.AGetter('_formatCd'), MO.EG3dAttributeFormat.Unknown);
   protected _formatCd = EG3dAttributeFormat.Unknown;

   //==========================================================
   // <T>从配置节点钟加载信息。</T>
   //
   // @method
   // @param xconfig:TNode 配置节点
   //==========================================================
   public loadConfig(xconfig) {
      this._name = xconfig.get('name');
      this._linker = xconfig.get('linker');
      //this._formatCd = MO.Lang.Enum.encode(MO.EG3dAttributeFormat, xconfig.get('format'));
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      this._slot = null;
      // 父处理
      super.dispose();
   }
}
