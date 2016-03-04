import {FObject} from '../../../../runtime/common/lang/FObject';

//==========================================================
// <T>渲染程序取样。</T>
//
// @author maocy
// @history 141230
//==========================================================
export class FG3dProgramSampler extends FObject {
   //..........................................................
   // @attribute 名称
   //_name = MO.Class.register(o, new MO.AGetter('_name'));
   // @attribute 关联名称
   //_linker = MO.Class.register(o, new MO.AGetter('_linker'));
   // @attribute 使用标志
   _statusUsed = false;
   // @attribute 插槽
   //_formatCd = MO.Class.register(o, new MO.AGetter('_formatCd'), MO.EG3dTexture.Flat2d);
   // @attribute 插槽
   _bind = true;
   // @attribute 插槽
   _slot = -1;
   // @attribute 索引
   _index = 0;
   // @attribute 来源
   _source = null;

   //==========================================================
   // <T>从配置节点钟加载信息。</T>
   //
   // @method
   // @param xconfig:TNode 配置节点
   //==========================================================
   public loadConfig(xconfig) {
      //this._name = xconfig.get('name');
      //this._linker = xconfig.get('linker');
      //this._bind = MO.Lang.Boolean.parse(xconfig.get('bind', 'Y'));
      //this._formatCd = MO.Lang.Enum.encode(MO.EG3dTexture, xconfig.get('format', 'Flat2d'));
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
