import {DataTypeEnum} from './runtime/common/lang/DataTypeEnum';
import {Fatal} from './runtime/common/lang/Fatal';
import {Property} from './runtime/common/reflect/Property';
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
   @Property('direction_cd', DataTypeEnum.Enum, DirectionEnum.Vertical, DirectionEnum)
   public directionCd: DirectionEnum;
   // 页面元素
   protected _hPanel: HTMLTableElement;
   protected _hLine: HTMLTableRowElement;

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
   // <T>建立当前控件的显示框架。</T>
   //
   // @param context 环境信息
   //==========================================================
   public onBuild(context: RenderContext) {
      super.onBuild(context);
      // 建立面板
      if (this.directionCd == DirectionEnum.Horizontal) {
         this._hLine = context.appendTableRow(this._hPanel);
      }
   }

   //==========================================================
   // <T>创建一个控件容器。</T>
   //
   // @method
   // @param frame:FDuiFrame 页面
   //==========================================================
   public appendFrame(page: FramePage) {
      var context = this.renderContext;
      if (this.directionCd == DirectionEnum.Horizontal) {
         // 横向排布
         page.setParentPanel(this._hLine);
         // 设置宽度
         var sizeWidth = page.size.width;
         if (sizeWidth) {
            page.setWidth(sizeWidth);
         }
      } else if (this.directionCd == DirectionEnum.Vertical) {
         // 纵向排布
         var hLine = context.appendTableRow(this._hPanel);
         page.setParentPanel(hLine);
         // 设置高度
         var sizeHeight = page.size.height;
         if (sizeHeight) {
            page.setHeight(sizeHeight);
         }
      } else {
         throw new Fatal(this, 'Unknown direcion type. (direction_cd={1})', this.directionCd);
      }
   }

   //==========================================================
   // <T>创建一个分隔符。</T>
   //
   // @method
   //==========================================================
   public appendSpliter(spliter: FrameSpliter) {
      var hSpliterPanel = (spliter as any)._hPanel;
      var context = this.renderContext;
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
   // <T>追加一个显示控件。</T>
   //
   // @param control 控件
   //==========================================================
   public appendDisplay(child: Component) {
      //control._frameset = this;
      if (child instanceof FramePage) {
         return this.appendFrame(child);
      } else if (child instanceof FrameSpliter) {
         return this.appendSpliter(child);
      }
      return super.appendChild(child);
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