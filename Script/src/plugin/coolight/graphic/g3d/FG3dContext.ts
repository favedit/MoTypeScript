import {FObject} from '../../../../runtime/common/lang/FObject';
import {FObjects} from '../../../../runtime/common/lang/FObjects';
import {RObject} from '../../../../runtime/common/lang/RObject';
import {RClass} from '../../../../runtime/common/reflect/RClass';
import {FGraphicContext} from '../base/FGraphicContext';
import {EG3dFillMode} from './EG3dFillMode';

//==========================================================
// <T>渲染环境。</T>
//
// @author maocy
// @history 141230
//==========================================================
export class FG3dContext extends FGraphicContext {
   //..........................................................
   // @attribute
   protected _optionAlpha = true;
   protected _optionAntialias = false;
   //_viewportRectangle = MO.Class.register(o, new MO.AGetter('_viewportRectangle'));
   protected_viewportRectangle = null;
   //o._logicSize          = MO.Class.register(o, new MO.AGetter('_logicSize'));
   //o._ratio              = MO.Class.register(o, new MO.AGetSet('_ratio'));
   //o._sizeRatio          = MO.Class.register(o, new MO.AGetter('_sizeRatio'));
   //_capability = MO.Class.register(o, new MO.AGetter('_capability'));
   protected _capability = null;
   //_statistics = MO.Class.register(o, new MO.AGetter('_statistics'));
   protected _statistics = null;
   // @attribute
   protected _fillModeCd: EG3dFillMode = EG3dFillMode.Face;
   protected _optionDepth = false;
   protected _optionCull = false;
   protected _depthModeCd = 0;
   protected _cullModeCd = 0;
   protected _statusBlend = false;
   protected _blendSourceCd = 0;
   protected _blendTargetCd = 0;
   protected _program = null;
   // @attribute
   protected _storePrograms = null;
   protected _storeLayouts = null;
   protected _storeBuffers = null;
   protected _storeTextures = null;
   protected _storeTargets = null;
   //..........................................................
   // @method
   //createObject = MO.FG3dContext_createObject;
   //createProgram = MO.Method.virtual(o, 'createProgram');
   //createLayout = MO.Method.virtual(o, 'createLayout');
   //o.createVertexBuffer = MO.Method.virtual(o, 'createVertexBuffer');
   //o.createIndexBuffer = MO.Method.virtual(o, 'createIndexBuffer');
   //o.createFlatTexture = MO.Method.virtual(o, 'createFlatTexture');
   //o.createCubeTexture = MO.Method.virtual(o, 'createCubeTexture');
   //o.createRenderTarget = MO.Method.virtual(o, 'createRenderTarget');
   // @method
   //o.setViewport = MO.Method.virtual(o, 'setViewport');
   //o.setFillMode = MO.Method.virtual(o, 'setFillMode');
   //o.setDepthMode = MO.Method.virtual(o, 'setDepthMode');
   //o.setCullingMode = MO.Method.virtual(o, 'setCullingMode');
   //o.setBlendFactors = MO.Method.virtual(o, 'setBlendFactors');
   //o.setScissorRectangle = MO.Method.virtual(o, 'setScissorRectangle');
   //o.setRenderTarget = MO.Method.virtual(o, 'setRenderTarget');
   //o.setProgram = MO.Method.virtual(o, 'setProgram');
   // @method
   //o.bindVertexBuffer = MO.Method.virtual(o, 'bindVertexBuffer');
   //o.bindTexture = MO.Method.virtual(o, 'bindTexture');
   // @method
   //o.prepare = MO.FG3dContext_prepare;
   //o.clear = MO.Method.virtual(o, 'clear');
   //o.clearColor = MO.Method.virtual(o, 'clearColor');
   //o.clearDepth = MO.Method.virtual(o, 'clearDepth');
   //o.drawTriangles = MO.Method.virtual(o, 'drawTriangles');
   //o.present = MO.Method.virtual(o, 'present');
   // @method
   //o.dispose = MO.FG3dContext_dispose;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      //this._viewportRectangle = new MO.SRectangle();
      //o._logicSize = new MO.SSize2(1280, 720);
      //o._sizeRatio = new MO.SSize2(1, 1);
      //this._statistics = MO.Class.create(MO.FG3dStatistics);
      //MO.Console.find(MO.FStatisticsConsole).register('graphic3d.context', o._statistics);
      // 设置属性
      this._storePrograms = new FObjects();
      this._storeLayouts = new FObjects();
      this._storeBuffers = new FObjects();
      this._storeTextures = new FObjects();
      this._storeTargets = new FObjects();
   }

   //==========================================================
   // <T>关联页面画布标签。</T>
   //
   // @method
   // @param h:hCanvas:HtmlCanvasTag 页面画布标签
   //==========================================================
   public linkCanvas(h) {
      var o = this;
      o._size.set(h.width, h.height);
   }

   //==========================================================
   // <T>创建环境对象。</T>
   //
   // @method
   // @param clazz:Function 类对象
   // @return MGraphicObject 环境对象
   //==========================================================
   public createObject(clazz) {
      var instance = RClass.create(clazz);
      instance.linkGraphicContext(this);
      instance.setup();
      return instance;
   }

   //============================================================
   // <T>准备处理。</T>
   //
   // @return 处理结果
   //============================================================
   public prepare() {
      this._statistics.resetFrame();
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      var o = this;
      // 释放程序集合
      var programs = o._storePrograms;
      if (programs) {
         var count = programs.count();
         for (var i = 0; i < count; i++) {
            var program = programs.at(i);
            program.dispose();
         }
         o._storePrograms = RObject.dispose(programs);
      }
      // 释放布局集合
      var layouts = o._storeLayouts;
      if (layouts) {
         var count = layouts.count();
         for (var i = 0; i < count; i++) {
            var layout = layouts.at(i);
            layout.dispose();
         }
         o._storeLayouts = RObject.dispose(layouts);
      }
      // 释放顶点缓冲集合
      var buffers = o._storeBuffers;
      if (buffers) {
         var count = buffers.count();
         for (var i = 0; i < count; i++) {
            var buffer = buffers.at(i);
            buffer.dispose();
         }
         o._storeBuffers = RObject.dispose(buffers);
      }
      // 释放像素缓冲集合
      var textures = o._storeTextures;
      if (textures) {
         var count = textures.count();
         for (var i = 0; i < count; i++) {
            var texture = textures.at(i);
            texture.dispose();
         }
         o._storeTextures = RObject.dispose(textures);
      }
      // 释放目标集合
      var targets = o._storeTargets;
      if (targets) {
         var count = targets.count();
         for (var i = 0; i < count; i++) {
            var target = targets.at(i);
            target.dispose();
         }
         o._storeTargets = RObject.dispose(targets);
      }
      // 释放属性
      o._program = null;
      //o._viewportRectangle = sk.common.lang.RObject.dispose(o._viewportRectangle);
      //o._logicSize = sk.common.lang.RObject.dispose(o._logicSize);
      //o._sizeRatio = sk.common.lang.RObject.dispose(o._sizeRatio);
      o._capability = RObject.dispose(o._capability);
      o._statistics = RObject.dispose(o._statistics);
      // 释放属性
      //o._handleInstance = null;
      //o._handleLayout = null;
      //o._handle = null;
      // 父处理
      super.dispose();
   }
}
