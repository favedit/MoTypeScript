import {Linker} from '../../runtime/common/reflect/Linker';
import {Size2} from './../../runtime/common/math/Size2';
import {GraphicObject} from './../../runtime/graphic/core/GraphicObject';
import {PerspectiveCamera} from '../../runtime/graphic/camera/PerspectiveCamera';
import {Scene} from '../../plugin/cl3d/base/Scene';
import {Pipeline} from '../../plugin/cl3d/technique/pipeline/Pipeline';
import {ForwardPipeline} from '../../plugin/cl3d/technique/pipeline/ForwardPipeline';
import {DeferredPipeline} from '../../plugin/cl3d/technique/pipeline/DeferredPipeline';
import {PipelineService} from '../../plugin/cl3d/technique/pipeline/PipelineService';
import {EventEnum} from '../../../runtime/ui/EventEnum';
import {KeyCodeEnum} from '../../runtime/ui/KeyCodeEnum';
import {Control} from './../../runtime/ui/Control';
import {KeyboardService} from '../../runtime/ui/service/KeyboardService';
import {WglContext} from '../graphic/wgl/WglContext';
import {WglContextUtil} from '../graphic/wgl/WglContextUtil';

//==========================================================
// <T>模板画板。</T>
//
// @author maocy
// @history 150130
//==========================================================
export class FCanvas extends Control {
   //    // @attribute
   //    o._optionAlpha        = true;
   //    o._optionAntialias    = true;
   //    o._optionStageProcess = true;
   //    o._optionResize       = true;
   //    o._optionMouseCapture = true;
   //    // @attribute
   //    o._listenerLoad       = MO.Class.register(o, new MO.AListener('_listenerLoad', MO.EEvent.Load));
   protected _hCanvas: HTMLCanvasElement;
   protected _size: Size2;
   protected _graphicContext: any;
   protected _camera: PerspectiveCamera;
   protected _cameraMoveRate = 0.4;
   protected _cameraKeyRotation = 0.03;
   protected _cameraMouseRotation = 0.005;
   public activeDisplay;
   // 渲染管道
   public pipeline: Pipeline;
   // 场景
   public scene: Scene;
   // 按键管理器
   @Linker(KeyboardService)
   public _keyboardService: KeyboardService;
   // 管道管理器
   @Linker(PipelineService)
   public _pipelineConsole: PipelineService;
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
      this._size = new Size2(1280, 720);
      //this._logicSize = new MO.SSize2(1280, 720);
      //this._screenSize = new MO.SSize2(1280, 720);
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
   public get camera(): PerspectiveCamera {
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
      this._graphicContext = WglContextUtil.create(hCanvas);
      // 创建相机
      var camera = this._camera = new PerspectiveCamera();
      camera.projection.size.assign(size);
      camera.projection.update();
      camera.position.set(0, 0, -10);
      camera.lookAt(0, 0, 0);
      camera.update();
      // 设置渲染管道
      var pipeline = this.pipeline = this._pipelineConsole.alloc(this._graphicContext, ForwardPipeline);
      // var pipeline = this.pipeline = this._pipelineConsole.alloc(this._graphicContext, DeferredPipeline);
      pipeline.scene = this.scene;
      pipeline.camera = this.camera;
      pipeline.enterFrameListeners.register(this, this.onProcess);
      // 设置事件
      this.attachEvent(hCanvas, EventEnum.MouseMove, this.onMouseMove);
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
      var keyboardConsole = this._keyboardService;
      // 前后处理
      var distance = this._cameraMoveRate;
      var keyForward = keyboardConsole.isKeyPress(KeyCodeEnum.W)
      var keyBack = keyboardConsole.isKeyPress(KeyCodeEnum.S)
      if (keyForward && !keyBack) {
         camera.doWalk(distance);
      } else if (!keyForward && keyBack) {
         camera.doWalk(-distance);
      }
      // 左右处理
      var rotation = this._cameraKeyRotation;
      var keyLeft = keyboardConsole.isKeyPress(KeyCodeEnum.A)
      var keyRight = keyboardConsole.isKeyPress(KeyCodeEnum.D)
      if (keyLeft && !keyRight) {
         camera.doYaw(rotation);
      } else if (!keyLeft && keyRight) {
         camera.doYaw(-rotation);
      }
      // 上下处理
      var distance = this._cameraMoveRate;
      var keyUp = keyboardConsole.isKeyPress(KeyCodeEnum.Q)
      var keyDown = keyboardConsole.isKeyPress(KeyCodeEnum.E)
      if (keyUp && !keyDown) {
         camera.doFly(distance);
      } else if (!keyUp && keyDown) {
         camera.doFly(-distance);
      }
      // 左右旋转
      var display = this.activeDisplay;
      if (display) {
         var keyL = keyboardConsole.isKeyPress(KeyCodeEnum.Left)
         var keyR = keyboardConsole.isKeyPress(KeyCodeEnum.Right)
         if (keyL && !keyR) {
            display.matrix.addRotationY(0.01);
         } else if (!keyL && keyR) {
            display.matrix.addRotationY(-0.01);
         }
      }
      camera.update();
   }

   //==========================================================
   // <T>配置处理。</T>
   //==========================================================
   public start() {
      // 设置渲染管道
      var pipeline = this.pipeline;
      pipeline.scene = this.scene;
      pipeline.camera = this.camera;
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