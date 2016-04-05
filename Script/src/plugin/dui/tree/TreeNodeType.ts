import {DataTypeEnum} from './runtime/common/lang/DataTypeEnum';
import {Property} from './runtime/common/reflect/Property';
import {Component} from '../Component';

//==========================================================
// <T>树目录节点类型组件。</T>
//
// @component
// @author maocy
// @version 150119
//==========================================================
export class TreeNodeType extends Component {
   // 图标
   @Property('icon', DataTypeEnum.String)
   public icon: string;
   // 存储方式
   @Property('storage', DataTypeEnum.String)
   public storage: string;
   //    o._service = MO.Class.register(o, [new MO.APtyString('_service'), new MO.AGetSet('_service')]);
   //    o._action = MO.Class.register(o, [new MO.APtyString('_action'), new MO.AGetSet('_action')]);

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
   }

   // //==========================================================
   // // 相应点击节点操作的函数
   // //
   // // @method
   // // @param name:String 名称
   // // @return String 内容
   // //==========================================================
   // public get(name) {
   //    var attributes = this._attributes;
   //    return attributes ? attributes.get(name) : null;
   // }

   // //==========================================================
   // // 相应点击节点操作的函数
   // //
   // // @method
   // // @param name:String 名称
   // // @param value:String 内容
   // //==========================================================
   // public set(name, value) {
   //    var attributes = this._attributes;
   //    if (attributes) {
   //       attributes.set(name, value)
   //    }
   // }

   //==========================================================
   // <T>获得运行信息。</T>
   //
   // @method
   // @param info:String 信息
   //==========================================================
   public innerDump(info) {
      // info.append(MO.Class.dump(this));
      // info.append('[code=', this._code);
      // info.append(', icon=', this._icon);
      // info.append(', service=', this._service);
      // info.append(', action=', this._action);
      // info.append(']');
   }
}