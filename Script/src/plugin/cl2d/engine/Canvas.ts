import {ObjectBase} from '../../../runtime/common/lang/ObjectBase';
import {ObjectUtil} from '../../../runtime/common/lang/ObjectUtil';
import {LoggerUtil} from '../../../runtime/common/lang/LoggerUtil';
import {ClassUtil} from '../../../runtime/common/reflect/ClassUtil';
import {Size2} from '../../../runtime/common/math/Size2';
import {BuilderUtil} from '../../../runtime/ui/utility/BuilderUtil';
import {HtmlUtil} from '../../../runtime/ui/utility/HtmlUtil';
import {Content} from '../graphic/Content';
import {Context} from '../graphic/Context';

//==========================================================
// <T>模板画板。</T>
//
// @author maocy
// @history 150130
//==========================================================
export class Canvas extends Content {
   // 面板元素
   protected _hPanel;
   // 画布元素
   protected _hCanvas;
   // 尺寸
   protected _size: Size2;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this._size = new Size2(1280, 720);
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
   public get size(): Size2 {
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
      return ClassUtil.create(Context);
   }

   //==========================================================
   // <T>构建处理。</T>
   //
   // @method
   // @param hDocument:HtmlTag 页面元素
   //==========================================================
   public build(hDocument) {
      // 获得大小
      var size: Size2 = this._size;
      var width = size.width;
      var height = size.height;
      // 创建画板
      var hCanvas = this._hCanvas = BuilderUtil.create(hDocument, 'CANVAS');
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
   // @param width 宽度
   // @param height 高度
   //==========================================================
   public resize(width: number, height: number) {
      // 设置画板
      var hCanvas = this._hCanvas;
      hCanvas.width = width;
      hCanvas.height = height;
      // 设置尺寸
      this._size.set(width, height);
      this.graphicContext.size.set(width, height);
      LoggerUtil.debug(this, 'Canvas2d resize. (size={1}x{2}, html={3})', width, height, hCanvas.outerHTML);
   }

   //==========================================================
   // <T>可见处理。</T>
   //==========================================================
   public show() {
      this.setVisible(true);
   }

   //==========================================================
   // <T>隐藏处理。</T>
   //==========================================================
   public hide() {
      this.setVisible(false);
   }

   //==========================================================
   // <T>设置可见处理。</T>
   //
   // @param visible 可见性
   //==========================================================
   public setVisible(visible: boolean) {
      HtmlUtil.visibleSet(this._hCanvas, visible);
   }

   //==========================================================
   // <T>重置处理。</T>
   //==========================================================
   public reset() {
      this.graphicContext.clear();
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      // 释放属性
      this._size = ObjectUtil.dispose(this._size);
      //this._hPanel = MO.Window.Html.free(this._hPanel);
      //this._hCanvas = MO.Window.Html.free(this._hCanvas);
      // 父处理
      super.dispose();
   }
}