import {FObject} from '../../../runtime/common/lang/FObject';
import {FObjects} from '../../../runtime/common/lang/FObjects';
import {RObject} from '../../../runtime/common/lang/RObject';
import {RClass} from '../../../runtime/common/reflect/RClass';
import {FGraphicContext} from '../../runtime/graphic/context/FGraphicContext';
import {EFillMode} from './EFillMode';
import {FContextStatistics} from './FContextStatistics';
import {FVertexBuffer} from './FVertexBuffer';
import {FIndexBuffer} from './FIndexBuffer';

//==========================================================
// <T>渲染环境。</T>
//
// @author maocy
// @history 141230
//==========================================================
export abstract class FContext extends FGraphicContext {
   //..........................................................
   // @attribute
   protected _optionAlpha = true;
   protected _optionAntialias = false;
   //_viewportRectangle = MO.Class.register(o, new MO.AGetter('_viewportRectangle'));
   protected _viewportRectangle = null;
   //o._logicSize          = MO.Class.register(o, new MO.AGetter('_logicSize'));
   //o._ratio              = MO.Class.register(o, new MO.AGetSet('_ratio'));
   //o._sizeRatio          = MO.Class.register(o, new MO.AGetter('_sizeRatio'));
   protected capability = null;
   //_statistics = MO.Class.register(o, new MO.AGetter('_statistics'));
   protected _statistics: FContextStatistics = null;
   // @attribute
   protected _fillModeCd: EFillMode = EFillMode.Face;
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
      //this._logicSize = new MO.SSize2(1280, 720);
      //this._sizeRatio = new MO.SSize2(1, 1);
      this._statistics = RClass.create(FContextStatistics);
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

   //==========================================================
   // <T>创建渲染程序。</T>
   //
   // @method
   // @return FProgram3d 顶点缓冲
   //==========================================================
   public abstract createProgram(clazz?: Function);

   //==========================================================
   // <T>创建布局。</T>
   //
   // @method
   // @return FProgram3d 顶点缓冲
   //==========================================================
   public abstract createLayout(clazz?: Function);

   //==========================================================
   // <T>创建顶点缓冲。</T>
   //
   // @method
   // @param clazz:Function 类对象
   // @return FG3dVertexBuffer 顶点缓冲
   //==========================================================
   public abstract createVertexBuffer(clazz?: Function):FVertexBuffer;

   //==========================================================
   // <T>创建索引缓冲。</T>
   //
   // @method
   // @param clazz:Function 类对象
   // @return FG3dIndexBuffer 索引缓冲
   //==========================================================
   public abstract createIndexBuffer(clazz?: Function):FIndexBuffer;

   //==========================================================
   // <T>创建平面渲染纹理。</T>
   //
   // @method
   // @param clazz:Function 类对象
   // @return FG3dFlatTexture 平面渲染纹理
   //==========================================================
   public abstract createFlatTexture(clazz?: Function);

   //==========================================================
   // <T>创建立方渲染纹理。</T>
   //
   // @method
   // @param clazz:Function 类对象
   // @return FG3dCubeTexture 立方渲染纹理
   //==========================================================
   public abstract createCubeTexture(clazz?: Function);

   //==========================================================
   // <T>创建渲染目标。</T>
   //
   // @method
   // @param clazz:Function 类对象
   // @return FG3dRenderTarget 渲染目标
   //==========================================================
   public abstract createRenderTarget(clazz?: Function);

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
      // 释放程序集合
      var programs = this._storePrograms;
      if (programs) {
         var count = programs.count();
         for (var i = 0; i < count; i++) {
            var program = programs.at(i);
            program.dispose();
         }
         this._storePrograms = RObject.dispose(programs);
      }
      // 释放布局集合
      var layouts = this._storeLayouts;
      if (layouts) {
         var count = layouts.count();
         for (var i = 0; i < count; i++) {
            var layout = layouts.at(i);
            layout.dispose();
         }
         this._storeLayouts = RObject.dispose(layouts);
      }
      // 释放顶点缓冲集合
      var buffers = this._storeBuffers;
      if (buffers) {
         var count = buffers.count();
         for (var i = 0; i < count; i++) {
            var buffer = buffers.at(i);
            buffer.dispose();
         }
         this._storeBuffers = RObject.dispose(buffers);
      }
      // 释放像素缓冲集合
      var textures = this._storeTextures;
      if (textures) {
         var count = textures.count();
         for (var i = 0; i < count; i++) {
            var texture = textures.at(i);
            texture.dispose();
         }
         this._storeTextures = RObject.dispose(textures);
      }
      // 释放目标集合
      var targets = this._storeTargets;
      if (targets) {
         var count = targets.count();
         for (var i = 0; i < count; i++) {
            var target = targets.at(i);
            target.dispose();
         }
         this._storeTargets = RObject.dispose(targets);
      }
      // 释放属性
      this._program = null;
      //o._viewportRectangle = sk.common.lang.RObject.dispose(o._viewportRectangle);
      //o._logicSize = sk.common.lang.RObject.dispose(o._logicSize);
      //o._sizeRatio = sk.common.lang.RObject.dispose(o._sizeRatio);
      this.capability = RObject.dispose(this.capability);
      this._statistics = RObject.dispose(this._statistics);
      // 释放属性
      //o._handleInstance = null;
      //o._handleLayout = null;
      //o._handle = null;
      // 父处理
      super.dispose();
   }
}
