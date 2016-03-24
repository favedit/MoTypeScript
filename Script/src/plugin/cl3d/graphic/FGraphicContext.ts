import {ObjectBase} from '../../../runtime/common/lang/ObjectBase';
import {Objects} from '../../../runtime/common/lang/Objects';
import {ObjectUtil} from '../../../runtime/common/lang/ObjectUtil';
import {ClassUtil} from '../../../runtime/common/reflect/ClassUtil';
import {FGraphicContext as FBaseGraphicContext} from '../../runtime/graphic/core/FGraphicContext';
import {EFillMode} from './EFillMode';
import {SContextCapability} from './SContextCapability';
import {FContextStatistics} from './FContextStatistics';
import {FVertexBuffer} from './FVertexBuffer';
import {FIndexBuffer} from './FIndexBuffer';

//==========================================================
// <T>渲染环境。</T>
//
// @author maocy
// @history 141230
//==========================================================
export abstract class FGraphicContext extends FBaseGraphicContext {
   //..........................................................
   // @attribute
   public hCanvas: HTMLCanvasElement;
   // @attribute
   protected _optionAlpha = true;
   protected _optionAntialias = false;
   protected _viewportRectangle;
   //o._logicSize          = MO.Class.register(o, new MO.AGetter('_logicSize'));
   //o._ratio              = MO.Class.register(o, new MO.AGetSet('_ratio'));
   //o._sizeRatio          = MO.Class.register(o, new MO.AGetter('_sizeRatio'));
   protected capability: SContextCapability;
   protected _statistics: FContextStatistics;
   // @attribute
   protected _fillModeCd: EFillMode = EFillMode.Face;
   protected _optionDepth = false;
   protected _optionCull = false;
   protected _depthModeCd = 0;
   protected _cullModeCd = 0;
   protected _statusBlend = false;
   protected _blendSourceCd = 0;
   protected _blendTargetCd = 0;
   protected _program;
   // @attribute
   protected _storePrograms;
   protected _storeLayouts;
   protected _storeBuffers;
   protected _storeTextures;
   protected _storeTargets;

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
      this._statistics = ClassUtil.create(FContextStatistics);
      //MO.Console.find(MO.FStatisticsConsole).register('graphic3d.context', o._statistics);
      // 设置属性
      this._storePrograms = new Objects();
      this._storeLayouts = new Objects();
      this._storeBuffers = new Objects();
      this._storeTextures = new Objects();
      this._storeTargets = new Objects();
   }

   //==========================================================
   // <T>关联页面画布标签。</T>
   //
   // @method
   // @param h:hCanvas:HtmlCanvasTag 页面画布标签
   //==========================================================
   public linkCanvas(hCanvas) {
      this.hCanvas = hCanvas;
      this._size.set(hCanvas.width, hCanvas.height);
   }

   //==========================================================
   // <T>创建环境对象。</T>
   //
   // @method
   // @param clazz:Function 类对象
   // @return MGraphicObject 环境对象
   //==========================================================
   public createObject(clazz) {
      var instance = ClassUtil.create(clazz);
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
   public abstract createVertexBuffer(clazz?: Function): FVertexBuffer;

   //==========================================================
   // <T>创建索引缓冲。</T>
   //
   // @method
   // @param clazz:Function 类对象
   // @return FG3dIndexBuffer 索引缓冲
   //==========================================================
   public abstract createIndexBuffer(clazz?: Function): FIndexBuffer;

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
         this._storePrograms = ObjectUtil.dispose(programs);
      }
      // 释放布局集合
      var layouts = this._storeLayouts;
      if (layouts) {
         var count = layouts.count();
         for (var i = 0; i < count; i++) {
            var layout = layouts.at(i);
            layout.dispose();
         }
         this._storeLayouts = ObjectUtil.dispose(layouts);
      }
      // 释放顶点缓冲集合
      var buffers = this._storeBuffers;
      if (buffers) {
         var count = buffers.count();
         for (var i = 0; i < count; i++) {
            var buffer = buffers.at(i);
            buffer.dispose();
         }
         this._storeBuffers = ObjectUtil.dispose(buffers);
      }
      // 释放像素缓冲集合
      var textures = this._storeTextures;
      if (textures) {
         var count = textures.count();
         for (var i = 0; i < count; i++) {
            var texture = textures.at(i);
            texture.dispose();
         }
         this._storeTextures = ObjectUtil.dispose(textures);
      }
      // 释放目标集合
      var targets = this._storeTargets;
      if (targets) {
         var count = targets.count();
         for (var i = 0; i < count; i++) {
            var target = targets.at(i);
            target.dispose();
         }
         this._storeTargets = ObjectUtil.dispose(targets);
      }
      // 释放属性
      this._program = null;
      //o._viewportRectangle = sk.common.lang.RObject.dispose(o._viewportRectangle);
      //o._logicSize = sk.common.lang.RObject.dispose(o._logicSize);
      //o._sizeRatio = sk.common.lang.RObject.dispose(o._sizeRatio);
      this.capability = ObjectUtil.dispose(this.capability);
      this._statistics = ObjectUtil.dispose(this._statistics);
      // 释放属性
      //o._handleInstance = null;
      //o._handleLayout = null;
      //o._handle = null;
      // 父处理
      super.dispose();
   }
}
