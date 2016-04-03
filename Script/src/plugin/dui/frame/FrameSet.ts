import {Fatal} from './runtime/common/lang/Fatal';
import {DirectionEnum} from './runtime/ui/DirectionEnum';
import {RenderContext} from '../RenderContext';
import {Component} from '../Component';
import {Container} from '../Container';
import {FramePage} from './FramePage';
import {FrameSpliter} from './FrameSpliter';

//==========================================================
// <T>页面集合。</T>
//
// @class
// @author maocy
// @version 150120
//==========================================================
export class FrameSet extends Container {
   // 方向类型
   public directionCd: DirectionEnum;
   public _hLine: HTMLTableRowElement;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this.directionCd = DirectionEnum.Vertical;
   }

   // MO.FDuiFrameSet_construct = function FDuiFrameSet_construct() {
   //    var o = this;
   //    o.__base.FDuiContainer.construct.call(o);
   //    o._frames = new MO.TObjects();
   // }
   // MO.FDuiFrameSet = function FDuiFrameSet(o) {
   //    o = MO.Class.inherits(this, o, MO.FDuiContainer, MO.MDuiDescribeFrame);
   //    //..........................................................
   //    // @property String 提示信息
   //    o._sizeCd = MO.EUiSize.Fill;
   //    //..........................................................
   //    // @style
   //    o._stylePanel = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   //    //..........................................................
   //    // @style
   //    o._frames = null;
   //    //..........................................................
   //    // @html
   //    o._hLine = null;
   //    //..........................................................
   //    // @event
   //    o.onBuildPanel = MO.FDuiFrameSet_onBuildPanel;
   //    //..........................................................
   //    // @method
   //    o.construct = MO.FDuiFrameSet_construct;
   //    // @method
   //    o.appendFrame = MO.FDuiFrameSet_appendFrame;
   //    o.appendSpliter = MO.FDuiFrameSet_appendSpliter;
   //    // @method
   //    o.appendChild = MO.FDuiFrameSet_appendChild;
   //    // @method
   //    o.dispose = MO.FDuiFrameSet_dispose;
   //    return o;
   // }

   //==========================================================
   // <T>创建一个控件容器。</T>
   //
   // @param context 环境信息
   //==========================================================
   public onBuildPanel(context: RenderContext) {
      this._hPanel = context.createTable(this.styleName('Panel'));
   }

   //==========================================================
   // <T>创建一个控件容器。</T>
   //
   // @method
   // @param frame:FDuiFrame 页面
   //==========================================================
   public appendFrame(page: FramePage) {
      var context = this.context;
      if (this.directionCd == DirectionEnum.Horizontal) {
         // 横向排布
         var hLine = this._hLine;
         if (!hLine) {
            hLine = this._hLine = context.appendTableRow(this._hPanel);
         }
         page.setPanel(hLine);
         // 设置宽度
         //var sizeWidth = page._size.width;
         //if (sizeWidth) {
         //   page._hPanel.width = sizeWidth;
         //}
      } else if (this.directionCd == DirectionEnum.Vertical) {
         // 纵向排布
         var hLine = context.appendTableRow(this._hPanel);
         page.setPanel(hLine);
         // 设置高度
         //var sizeHeight = page._size.height;
         //if (sizeHeight) {
         //   page._hPanel.height = sizeHeight;
         //}
      } else {
         throw new Fatal(this, 'Unknown direcion type. (direction_cd={1})', this.directionCd);
      }
      //this._frames.push(frame);
   }

   //==========================================================
   // <T>创建一个分隔符。</T>
   //
   // @method
   //==========================================================
   public appendSpliter(spliter: FrameSpliter) {
      var hSpliterPanel = (spliter as any)._hPanel;
      var context = this.context;
      if (this.directionCd == DirectionEnum.Horizontal) {
         // 横向排布
         this._hLine.appendChild(hSpliterPanel);
         hSpliterPanel.style.width = '4px';
      } else if (this.directionCd == DirectionEnum.Vertical) {
         // 纵向排布
         var hRow = context.appendTableRow(this._hPanel);
         hRow.appendChild(hSpliterPanel);
         hSpliterPanel.style.height = '4px';
      } else {
         throw new Fatal(this, 'Unknown direcion type. (direction_cd={1})', this.directionCd);
      }
      //this._frames.push(sp);
   }

   //==========================================================
   // <T>增加一个子组件。</T>
   //
   // @param child 子组件
   //==========================================================
   public appendChild(child: Component) {
      //control._frameset = this;
      if (child instanceof FramePage) {
         this.appendFrame(child);
         return;
      } else if (child instanceof FrameSpliter) {
         this.appendSpliter(child);
         return;
      }
      super.appendChild(child);
   }

   // //==========================================================
   // // <T>释放处理。</T>
   // //
   // // @method
   // //==========================================================
   // MO.FDuiFrameSet_dispose = function FDuiFrameSet_dispose() {
   //    var o = this;
   //    // 父处理
   //    o.__base.FDuiContainer.dispose.call(o);
   // }
}