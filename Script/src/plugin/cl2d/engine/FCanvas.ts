import {FObject} from '../../../runtime/common/lang/FObject';
import {RObject} from '../../../runtime/common/lang/RObject';
import {RLogger} from '../../../runtime/common/lang/RLogger';
import {SSize2} from '../../../runtime/common/math/SSize2';
import {RClass} from '../../../runtime/common/reflect/RClass';
import {RBuilder} from '../../../runtime/ui/utility/RBuilder';
import {FContent} from '../graphic/FContent';
import {FContext} from '../graphic/FContext';

//==========================================================
// <T>模板画板。</T>
//
// @author maocy
// @history 150130
//==========================================================
export class FCanvas extends FContent {
   // 面板元素
   protected _hPanel = null;
   // 画布元素
   protected _hCanvas = null;
   // 尺寸
   protected _size: SSize2 = null;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this._size = new SSize2(1280, 720);
   }

   //==========================================================
   // <T>获得页面元素。</T>
   //
   // @return 页面元素
   //==========================================================
   public htmlCanvas() {
      return this._hCanvas;
   }

   //==========================================================
   // <T>获得尺寸。</T>
   //
   // @return 尺寸
   //==========================================================
   public get size(): SSize2 {
      return this._size;
   }

   //==========================================================
   // <T>改变大小事件处理。</T>
   //
   // @param event 事件信息
   //==========================================================
   public onResize(p) {
   }

   //==========================================================
   // <T>创建绘制环境。</T>
   //
   // @return FG2dCanvasContext 绘制环境
   //==========================================================
   public createContext() {
      return RClass.create(FContext);
   }

   //==========================================================
   // <T>构建处理。</T>
   //
   // @method
   // @param hDocument:HtmlTag 页面元素
   //==========================================================
   public build(hDocument) {
      // 获得大小
      var size: SSize2 = this._size;
      var width = size.width;
      var height = size.height;
      // 创建画板
      var hCanvas = this._hCanvas = RBuilder.create(hDocument, 'CANVAS');
      hCanvas.__linker = this;
      var hStyle = hCanvas.style;
      hStyle.left = '0px';
      hStyle.top = '0px';
      hStyle.width = '100%';
      hStyle.height = '100%';
      // 创建渲染环境
      var context = this.graphicContext = this.createContext();
      context.linkCanvas(hCanvas);
      // 设置大小
      this.resize(width, height);
   }

   //==========================================================
   // <T>设置面板处理。</T>
   //
   // @method
   // @param hPanel:HtmlTag 网页元素
   //==========================================================
   public setPanel(hPanel) {
      // 放入父容器
      this._hPanel = hPanel;
      hPanel.appendChild(this._hCanvas);
      // 改变大小
      this.onResize(null);
   }

   //==========================================================
   // <T>改变大小。</T>
   //
   // @method
   // @param width:Integer 宽度
   // @param height:Integer 高度
   //==========================================================
   public resize(width, height) {
      // 设置画板
      var hCanvas = this._hCanvas;
      hCanvas.width = width;
      hCanvas.height = height;
      // 设置尺寸
      this._size.set(width, height);
      this.graphicContext.size().set(width, height);
      RLogger.debug(this, 'Canvas2d resize. (size={1}x{2}, html={3})', width, height, hCanvas.outerHTML);
   }

   //==========================================================
   // <T>可见处理。</T>
   //
   // @method
   //==========================================================
   public show() {
      this.setVisible(true);
   }

   //==========================================================
   // <T>隐藏处理。</T>
   //
   // @method
   //==========================================================
   public hide() {
      this.setVisible(false);
   }

   //==========================================================
   // <T>设置可见处理。</T>
   //
   // @method
   // @param visible:Boolean 可见性
   //==========================================================
   public setVisible(visible) {
      //RHtml.visibleSet(this._hCanvas, visible);
   }

   //==========================================================
   // <T>重置处理。</T>
   //
   // @method
   //==========================================================
   public reset() {
      this.graphicContext.clear();
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      // 释放属性
      this._size = RObject.dispose(this._size);
      //this._hPanel = MO.Window.Html.free(this._hPanel);
      //this._hCanvas = MO.Window.Html.free(this._hCanvas);
      // 父处理
      super.dispose();
   }
}