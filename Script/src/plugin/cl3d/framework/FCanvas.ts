import {ALinker} from '../../runtime/common/reflect/ALinker';
import {SSize2} from './../../runtime/common/math/SSize2';
import {FGraphicObject} from './../../runtime/graphic/core/FGraphicObject';
import {FPerspectiveCamera} from '../../runtime/graphic/camera/FPerspectiveCamera';
import {FScene} from '../../plugin/cl3d/base/FScene';
import {FPipeline} from '../../plugin/cl3d/technique/pipeline/FPipeline';
import {FForwardPipeline} from '../../plugin/cl3d/technique/pipeline/FForwardPipeline';
import {FPipelineConsole} from '../../plugin/cl3d/technique/pipeline/FPipelineConsole';
import {EEvent} from '../../../runtime/ui/EEvent';
import {EKeyCode} from '../../runtime/ui/EKeyCode';
import {FControl} from './../../runtime/ui/FControl';
import {FKeyboardConsole} from '../../runtime/ui/console/FKeyboardConsole';
import {FWglContext} from '../graphic/wgl/FWglContext';
import {RWglContext} from '../graphic/wgl/RWglContext';

//==========================================================
// <T>模板画板。</T>
//
// @author maocy
// @history 150130
//==========================================================
export class FCanvas extends FControl {
   //    // @attribute
   //    o._optionAlpha        = true;
   //    o._optionAntialias    = true;
   //    o._optionStageProcess = true;
   //    o._optionResize       = true;
   //    o._optionMouseCapture = true;
   //    // @attribute
   //    o._listenerLoad       = MO.Class.register(o, new MO.AListener('_listenerLoad', MO.EEvent.Load));
   protected _hCanvas: HTMLCanvasElement;
   protected _size: SSize2;
   protected _graphicContext: any;
   protected _camera: FPerspectiveCamera;
   protected _cameraMoveRate = 0.4;
   protected _cameraKeyRotation = 0.03;
   protected _cameraMouseRotation = 0.005;
   protected pipeline: FPipeline;
   // 场景
   public scene: FScene;
   // 按键管理器
   @ALinker(FKeyboardConsole)
   public _keyboardConsole: FKeyboardConsole = null;
   // 管道管理器
   @ALinker(FPipelineConsole)
   public _pipelineConsole: FPipelineConsole = null;
   //    o._logicSize          = MO.Class.register(o, new MO.AGetter('_logicSize'));
   //    o._screenSize         = MO.Class.register(o, new MO.AGetter('_screenSize'));
   //    o._interval           = 10;


   // //==========================================================
   // // <T>改变大小事件处理。</T>
   // //
   // // @method
   // // @param event:SEvent 事件信息
   // //==========================================================
   // public onResize(event) {
   //     this.resize();
   // }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置变量
      this._size = new SSize2(1280, 720);
      //this._logicSize = new MO.SSize2(1280, 720);
      //this._screenSize = new MO.SSize2(1280, 720);
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
   // <T>获得图形环境。</T>
   //
   // @return 图形环境
   //==========================================================
   public get graphicContext(): any {
      return this._graphicContext;
   }

   //==========================================================
   // <T>获得相机。</T>
   //
   // @return 相机
   //==========================================================
   public get camera(): FPerspectiveCamera {
      return this._camera;
   }

   //==========================================================
   // <T>配置处理。</T>
   //==========================================================
   public setup(hPanel) {
      var size = this._size;
      // 创建画板
      var hDocument = hPanel.ownerDocument;
      var hCanvas = this._hCanvas = hDocument.createElement("CANVAS");
      hCanvas.width = size.width;
      hCanvas.height = size.height;
      hPanel.appendChild(hCanvas);
      // 创建环境
      this._graphicContext = RWglContext.create(hCanvas);
      // 创建相机
      var camera = this._camera = new FPerspectiveCamera();
      camera.projection.size.assign(size);
      camera.projection.update();
      camera.position.set(0, 0, -10);
      camera.lookAt(0, 0, 0);
      camera.update();
      // 设置事件
      this.attachEvent(hCanvas, EEvent.MouseMove, this.onMouseMove);
   }

   //==========================================================
   // <T>创建环境。</T>
   //==========================================================
   public onMouseMove(sender, event) {
   }

   //==========================================================
   // <T>逻辑处理。</T>
   //==========================================================
   public onProcess() {
      // 按键处理
      var camera = this.camera;
      var keyboardConsole = this._keyboardConsole;
      // 上下处理
      var distance = this._cameraMoveRate;
      var keyUp = keyboardConsole.isKeyPress(EKeyCode.W)
      var keyDown = keyboardConsole.isKeyPress(EKeyCode.S)
      if (keyUp && !keyDown) {
         camera.doWalk(distance);
      } else if (!keyUp && keyDown) {
         camera.doWalk(-distance);
      }
      // 左右处理
      var rotation = this._cameraKeyRotation;
      var keyLeft = keyboardConsole.isKeyPress(EKeyCode.A)
      var keyRight = keyboardConsole.isKeyPress(EKeyCode.D)
      if (keyLeft && !keyRight) {
         camera.doYaw(rotation);
      } else if (!keyLeft && keyRight) {
         camera.doYaw(-rotation);
      }
      camera.update();
   }

   //==========================================================
   // <T>配置处理。</T>
   //==========================================================
   public start() {
      // 设置渲染管道
      var pipeline = this.pipeline = this._pipelineConsole.alloc(this._graphicContext, FForwardPipeline);
      pipeline.scene = this.scene;
      pipeline.camera = this.camera;
      pipeline.enterFrameListeners.register(this, this.onProcess);
      pipeline.start();
   }

   // //==========================================================
   // // <T>构建处理。</T>
   // //
   // // @method
   // // @param hPanel:HtmlTag 页面元素
   // //==========================================================
   // public build(hPanel) {
   //     var o = this;
   //     // 获得大小
   //     var size = o._size;
   //     var width = size.width;
   //     var height = size.height;
   //     // 创建画板
   //     var hCanvas = o._hCanvas = MO.Window.Builder.create(hPanel, 'CANVAS');
   //     hCanvas.width = width;
   //     hCanvas.height = height;
   //     // 设置样式
   //     var hStyle = hCanvas.style;
   //     hStyle.left = '0px';
   //     hStyle.top = '0px';
   //     hStyle.width = '100%';
   //     hStyle.height = '100%';
   //     // 创建渲染环境
   //     var parameters = new MO.SArguments();
   //     parameters.alpha = o._optionAlpha;
   //     parameters.antialias = o._optionAntialias;
   //     o._graphicContext = MO.Graphic.Context3d.createContext(MO.FWglContext, hCanvas, parameters);
   // }

   // //==========================================================
   // // <T>改变大小处理。</T>
   // //
   // // @method
   // //==========================================================
   // public resize(sourceWidth, sourceHeight) {
   //     var o = this;
   //     // 检查参数
   //     if (!sourceWidth || !sourceHeight) {
   //         throw new MO.TError(o, 'Invalid canvas size.');
   //     }
   //     o._screenSize.set(sourceWidth, sourceHeight);
   //     // 设置尺寸
   //     var width = parseInt(sourceWidth);
   //     var height = parseInt(sourceHeight);
   //     // 设置画板
   //     var hCanvas = o._hCanvas;
   //     hCanvas.width = width;
   //     hCanvas.height = height;
   //     o._size.set(width, height);
   //     // 设置范围
   //     var context = o._graphicContext;
   //     context.setViewport(0, 0, width, height);
   //     MO.Logger.debug(o, 'Canvas3d resize. (size={1}x{2}, buffer={3}x{4}, html={5})', width, height, context._handle.drawingBufferWidth, context._handle.drawingBufferHeight, hCanvas.outerHTML);
   // }

   // //==========================================================
   // // <T>可见处理。</T>
   // //
   // // @method
   // //==========================================================
   // public show() {
   //     this.setVisible(true);
   // }

   // //==========================================================
   // // <T>隐藏处理。</T>
   // //
   // // @method
   // //==========================================================
   // public hide() {
   //     this.setVisible(false);
   // }

   // //==========================================================
   // // <T>设置可见处理。</T>
   // //
   // // @method
   // // @param visible:Boolean 可见性
   // //==========================================================
   // public setVisible(visible) {
   //     MO.Window.Html.visibleSet(this._hCanvas, visible);
   // }

   // //==========================================================
   // // <T>设置面板处理。</T>
   // //
   // // @method
   // // @param hPanel:HtmlTag 页面元素
   // //==========================================================
   // public setPanel(hPanel) {
   //     var o = this;
   //     o._hPanel = hPanel;
   //     // 放入父容器
   //     hPanel.appendChild(o._hCanvas);
   // }

   // //==========================================================
   // // <T>释放处理。</T>
   // //
   // // @method
   // //==========================================================
   // public dispose() {
   //     var o = this;
   //     // 释放属性
   //     o._graphicContext = MO.Lang.Object.dispose(o._graphicContext);
   //     o._size = MO.Lang.Object.dispose(o._size);
   //     o._screenSize = MO.Lang.Object.dispose(o._screenSize);
   //     o._logicSize = MO.Lang.Object.dispose(o._logicSize);
   //     o._hPanel = MO.Window.Html.free(o._hPanel);
   //     o._hCanvas = MO.Window.Html.free(o._hCanvas);
   //     // 父处理
   //     o.__base.FCanvas.dispose.call(o);
   // }
}