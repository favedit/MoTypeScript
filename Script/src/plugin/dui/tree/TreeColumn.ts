import {Control} from '../Control';

//==========================================================
// <T>树目录列组件。</T>
//
// @component
// @author maocy
// @version 150119
//==========================================================
export class TreeColumn extends Control {
   public _icon: string;
   public _dataName: string;

   public constructor() {
      super();
      // o._display = MO.Class.register(o, new MO.APtyBoolean('_display'), MO.EBoolean.False);
      // o._config = MO.Class.register(o, new MO.APtyConfig('_config'));
      // //..........................................................
      // // @process
      // o.oeBuild = MO.FDuiTreeColumn_oeBuild;
      // //..........................................................
      // // @event
      // o.onBuildPanel = MO.FDuiTreeColumn_onBuildPanel;
      // return o;
   }

   //==========================================================
   // <T>构建处理。</T>
   //
   // @method
   // @param event:event:TEvent 构建事件
   // @return EEventStatus 枚举类型
   //==========================================================
   public oeBuild(event) {
      // this.__base.FDuiControl.oeBuild.call(this, event);
      // // 设置内容
      // var hPanel = this._hPanel;
      // hPanel.innerText = MO.Lang.String.nvl(this.label);
      // hPanel.noWrap = true;
      // if (!this.display) {
      //    hPanel.style.display = 'block';
      // }
      // if (this.width) {
      //    hPanel.width = this.width;
      // }
      // return MO.EEventStatus.Stop;
   }

   //==========================================================
   // <T>建立标签。</T>
   //
   // @method
   // @see MO.Window.Builder.create
   //==========================================================
   public onBuildPanel() {
      //this.hPanel = MO.Window.Builder.create(null, 'TD');
   }
}