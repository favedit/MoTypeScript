import {SEvent} from '../../../../../runtime/common/lang/SEvent';
import {FObjects} from '../../../../../runtime/common/lang/FObjects';
import {RLogger} from '../../../../../runtime/common/lang/RLogger';
import {RObject} from '../../../../../runtime/common/lang/RObject';
import {FError} from '../../../../../runtime/common/lang/FError';
import {RClass} from '../../../../../runtime/common/reflect/RClass';
import {RXml} from '../../../../../runtime/common/xml/RXml';
import {FG3dContext} from '../FG3dContext';
import {SG3dContextCapability} from '../SG3dContextCapability';
import {EG3dParameterFormat} from '../EG3dParameterFormat';
import {EG3dAttributeFormat} from '../EG3dAttributeFormat';
import {EG3dIndexStride} from '../EG3dIndexStride';
import {EG3dFillMode} from '../EG3dFillMode';
import {EG3dTexture} from '../EG3dTexture';
import {EG3dDepthMode} from '../EG3dDepthMode';
import {EG3dCullMode} from '../EG3dCullMode';
import {EG3dDrawMode} from '../EG3dDrawMode';
import {FWglProgram} from './FWglProgram';
import {FWglLayout} from './FWglLayout';
import {RWglUtility} from './RWglUtility';

//==========================================================
// <T>WebGL渲染环境。</T>
//
// @author maocy
// @refer https://www.khronos.org/registry/webgl
// @history 141230
//==========================================================
export class FWglContext extends FG3dContext {
   // @attribute
   //_handle = MO.Class.register(o, new MO.AGetter('_handle'));
   protected _handle = null;
   protected _handleInstance = null;
   protected _handleLayout = null;
   //_handleDrawBuffers = MO.Class.register(o, new MO.AGetter('_handleDrawBuffers'));
   protected _handleDrawBuffers = null;
   //_handleSamplerS3tc = MO.Class.register(o, new MO.AGetter('_handleSamplerS3tc'));
   protected _handleSamplerS3tc = null;
   protected _handleDebugShader = null;
   // @attribute
   protected _activeRenderTarget = null;
   protected _activeTextureSlot = null;
   // @attribute
   protected _parameters = null;
   protected _extensions = null;
   // @attribute
   protected _statusRecord = false;
   //_recordBuffers = MO.Class.register(o, new MO.AGetter('_recordBuffers'));
   protected _recordBuffers: FObjects<any> = new FObjects<any>();
   //_recordSamplers = MO.Class.register(o, new MO.AGetter('_recordSamplers'));
   protected _recordSamplers: FObjects<any> = new FObjects<any>();
   // @attribute
   //_statusDepthMask = MO.Class.register(o, new MO.AGetter('_statusDepthMask'), false);
   _statusDepthMask = false;
   //_statusFloatTexture = MO.Class.register(o, new MO.AGetter('_statusFloatTexture'), false);
   _statusFloatTexture = false;
   //_statusDrawBuffers = MO.Class.register(o, new MO.AGetter('_statusDrawBuffers'), false);
   _statusDrawBuffers = false;
   //_statusScissor = MO.Class.register(o, new MO.AGetter('_statusScissor'), false);
   _statusScissor = false;
   _data9 = new Float32Array(9);
   _data16 = new Float32Array(16);

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      this._capability = new SG3dContextCapability();
   }

   //==========================================================
   // <T>获得是否有效。</T>
   //
   // @method
   // @return Boolean 是否有效
   //==========================================================
   public isValid() {
      return this._handle;
   }

   //==========================================================
   // <T>关联页面画布标签。</T>
   //
   // @method
   // @param hCanvas:HtmlCanvasTag 页面画布标签
   //==========================================================
   public linkCanvas(hCanvas) {
      var o = this;
      super.linkCanvas(hCanvas)
      // 获得环境
      o._hCanvas = hCanvas;
      if (hCanvas.getContext) {
         // 设置参数
         var parameters: any = new Object();
         parameters.alpha = o._optionAlpha;
         parameters.antialias = o._optionAntialias;
         parameters.depth = true;
         parameters.stencil = false;
         parameters.premultipliedAlpha = false;
         // 初始化对象
         var handle = null;
         var codes = ['experimental-webgl2', 'experimental-webgl', 'webgl', 'webkit-3d', 'moz-webgl']
         var count = codes.length;
         for (var i = 0; i < count; i++) {
            var code = codes[i];
            handle = hCanvas.getContext(code, parameters);
            if (handle) {
               RLogger.debug(o, 'Create context3d. (code={1}, handle={2})', code, handle);
               break;
            }
         }
         if (!handle) {
            RLogger.error(o, 'Create context3d failure.');
            var event = new SEvent(o);
            //event.code = MO.EGraphicError.UnsupportWebGL;
            //event.message = "Current browser can't support WebGL technique.";
            //MO.Window.processDeviceError(event);
            event.dispose();
            return false;
         }
         o._handle = handle;
         //o._contextAttributes = handle.getContextAttributes();
      } else {
         var event = new SEvent(o);
         //event.code = MO.EGraphicError.UnsupportWebGL;
         //event.message = "Canvas can't support WebGL technique.";
         //MO.Window.processDeviceError(event);
         event.dispose();
         return false;
      }
      var handle = o._handle;
      // 设置状态
      o.setDepthMode(true, EG3dDepthMode.LessEqual);
      o.setCullingMode(true, EG3dCullMode.Front);
      // 获得渲染信息
      var capability = o._capability;
      capability.vendor = handle.getParameter(handle.VENDOR);
      capability.version = handle.getParameter(handle.VERSION);
      capability.shaderVersion = handle.getParameter(handle.SHADING_LANGUAGE_VERSION);
      capability.attributeCount = handle.getParameter(handle.MAX_VERTEX_ATTRIBS);
      capability.vertexConst = handle.getParameter(handle.MAX_VERTEX_UNIFORM_VECTORS);
      capability.varyingCount = handle.getParameter(handle.MAX_VARYING_VECTORS);
      capability.fragmentConst = handle.getParameter(handle.MAX_FRAGMENT_UNIFORM_VECTORS);
      capability.samplerCount = handle.getParameter(handle.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
      capability.samplerSize = handle.getParameter(handle.MAX_TEXTURE_SIZE);
      // 测试实例绘制支持
      var extension = o._handleInstance = handle.getExtension('ANGLE_instanced_arrays');
      if (extension) {
         capability.optionInstance = true;
      }
      capability.mergeCount = parseInt(((capability.vertexConst - 32) / 4) as any);
      // 测试顶点布局支持
      var extension = o._handleLayout = handle.getExtension('OES_vertex_array_object');
      if (extension) {
         capability.optionLayout = true;
      }
      // 测试32位索引支持
      var extension = handle.getExtension('OES_element_index_uint');
      if (extension) {
         capability.optionIndex32 = true;
      }
      // 测试多渲染支持
      var extension = o._handleDrawBuffers = handle.getExtension('WEBGL_draw_buffers');
      if (extension) {
         capability.optionDrawBuffers = true;
      }
      // 测试纹理压缩支持
      var extension = o._handleSamplerS3tc = handle.getExtension('WEBGL_compressed_texture_s3tc');
      if (extension) {
         capability.samplerCompressRgb = extension.COMPRESSED_RGB_S3TC_DXT1_EXT;
         capability.samplerCompressRgba = extension.COMPRESSED_RGBA_S3TC_DXT5_EXT;
      }
      // 测定渲染精度
      var shader: any = capability.shader = new Object();
      var vertexPrecision: any = shader.vertexPrecision = new Object();
      if (handle.getShaderPrecisionFormat) {
         vertexPrecision.floatLow = handle.getShaderPrecisionFormat(handle.VERTEX_SHADER, handle.LOW_FLOAT);
         vertexPrecision.floatMedium = handle.getShaderPrecisionFormat(handle.VERTEX_SHADER, handle.MEDIUM_FLOAT);
         vertexPrecision.floatHigh = handle.getShaderPrecisionFormat(handle.VERTEX_SHADER, handle.HIGH_FLOAT);
         vertexPrecision.intLow = handle.getShaderPrecisionFormat(handle.VERTEX_SHADER, handle.LOW_INT);
         vertexPrecision.intMedium = handle.getShaderPrecisionFormat(handle.VERTEX_SHADER, handle.MEDIUM_INT);
         vertexPrecision.intHigh = handle.getShaderPrecisionFormat(handle.VERTEX_SHADER, handle.HIGH_INT);
      }
      var fragmentPrecision: any = shader.fragmentPrecision = new Object();
      if (handle.getShaderPrecisionFormat) {
         fragmentPrecision.floatLow = handle.getShaderPrecisionFormat(handle.FRAGMENT_SHADER, handle.LOW_FLOAT);
         fragmentPrecision.floatMedium = handle.getShaderPrecisionFormat(handle.FRAGMENT_SHADER, handle.MEDIUM_FLOAT);
         fragmentPrecision.floatHigh = handle.getShaderPrecisionFormat(handle.FRAGMENT_SHADER, handle.HIGH_FLOAT);
         fragmentPrecision.intLow = handle.getShaderPrecisionFormat(handle.FRAGMENT_SHADER, handle.LOW_INT);
         fragmentPrecision.intMedium = handle.getShaderPrecisionFormat(handle.FRAGMENT_SHADER, handle.MEDIUM_INT);
         fragmentPrecision.intHigh = handle.getShaderPrecisionFormat(handle.FRAGMENT_SHADER, handle.HIGH_INT);
      }
      // 测试调试渲染器支持
      var extension = o._handleDebugShader = handle.getExtension('WEBGL_debug_shaders');
      if (extension) {
         capability.optionShaderSource = true;
      }
      return true;
   }

   //==========================================================
   // <T>获得参数。</T>
   //
   // @method
   // @param name:String 名称
   // @return Object 参数
   //==========================================================
   public parameter(name) {
      var parameters = this.parameters();
      return parameters[name];
   }

   //==========================================================
   // <T>获得参数集合。</T>
   //
   // @method
   // @return Object 参数集合
   //==========================================================
   public parameters() {
      var o = this;
      // 获得属性
      var parameters = o._parameters;
      if (parameters) {
         return parameters;
      }
      // 获得参数
      var names = ['ACTIVE_TEXTURE',
         'ALIASED_LINE_WIDTH_RANGE',
         'ALIASED_POINT_SIZE_RANGE',
         'ALPHA_BITS',
         'ARRAY_BUFFER_BINDING',
         'BLEND',
         'BLEND_COLOR',
         'BLEND_DST_ALPHA',
         'BLEND_DST_RGB',
         'BLEND_EQUATION_ALPHA',
         'BLEND_EQUATION_RGB',
         'BLEND_SRC_ALPHA',
         'BLEND_SRC_RGB',
         'BLUE_BITS',
         'COLOR_CLEAR_VALUE',
         'COLOR_WRITEMASK',
         'COMPRESSED_TEXTURE_FORMATS',
         'CULL_FACE',
         'CULL_FACE_MODE',
         'CURRENT_PROGRAM',
         'DEPTH_BITS',
         'DEPTH_CLEAR_VALUE',
         'DEPTH_FUNC',
         'DEPTH_RANGE',
         'DEPTH_TEST',
         'DEPTH_WRITEMASK',
         'DITHER',
         'ELEMENT_ARRAY_BUFFER_BINDING',
         'FRAMEBUFFER_BINDING',
         'FRONT_FACE',
         'GENERATE_MIPMAP_HINT',
         'GREEN_BITS',
         'IMPLEMENTATION_COLOR_READ_FORMAT',
         'IMPLEMENTATION_COLOR_READ_TYPE',
         'LINE_WIDTH',
         'MAX_COMBINED_TEXTURE_IMAGE_UNITS',
         'MAX_CUBE_MAP_TEXTURE_SIZE',
         'MAX_FRAGMENT_UNIFORM_VECTORS',
         'MAX_RENDERBUFFER_SIZE',
         'MAX_TEXTURE_IMAGE_UNITS',
         'MAX_TEXTURE_SIZE',
         'MAX_VARYING_VECTORS',
         'MAX_VERTEX_ATTRIBS',
         'MAX_VERTEX_TEXTURE_IMAGE_UNITS',
         'MAX_VERTEX_UNIFORM_VECTORS',
         'MAX_VIEWPORT_DIMS',
         'PACK_ALIGNMENT',
         'POLYGON_OFFSET_FACTOR',
         'POLYGON_OFFSET_FILL',
         'POLYGON_OFFSET_UNITS',
         'RED_BITS',
         'RENDERBUFFER_BINDING',
         'RENDERER',
         'SAMPLE_BUFFERS',
         'SAMPLE_COVERAGE_INVERT',
         'SAMPLE_COVERAGE_VALUE',
         'SAMPLES',
         'SCISSOR_BOX',
         'SCISSOR_TEST',
         'SHADING_LANGUAGE_VERSION',
         'STENCIL_BACK_FAIL',
         'STENCIL_BACK_FUNC',
         'STENCIL_BACK_PASS_DEPTH_FAIL',
         'STENCIL_BACK_PASS_DEPTH_PASS',
         'STENCIL_BACK_REF',
         'STENCIL_BACK_VALUE_MASK',
         'STENCIL_BACK_WRITEMASK',
         'STENCIL_BITS',
         'STENCIL_CLEAR_VALUE',
         'STENCIL_FAIL',
         'STENCIL_FUNC',
         'STENCIL_PASS_DEPTH_FAIL',
         'STENCIL_PASS_DEPTH_PASS',
         'STENCIL_REF',
         'STENCIL_TEST',
         'STENCIL_VALUE_MASK',
         'STENCIL_WRITEMASK',
         'SUBPIXEL_BITS',
         'TEXTURE_BINDING_2D',
         'TEXTURE_BINDING_CUBE_MAP',
         'UNPACK_ALIGNMENT',
         'UNPACK_COLORSPACE_CONVERSION_WEBGL',
         'UNPACK_FLIP_Y_WEBGL',
         'UNPACK_PREMULTIPLY_ALPHA_WEBGL',
         'VENDOR',
         'VERSION',
         'VIEWPORT'];
      var handle = o._handle;
      var count = names.length;
      parameters = new Object();
      for (var i = 0; i < count; i++) {
         var name = names[i];
         parameters[name] = handle.getParameter(handle[name]);
      }
      // 获得调试信息
      var extension = handle.getExtension('WEBGL_debug_renderer_info');
      if (extension) {
         parameters['UNMASKED_RENDERER_WEBGL'] = handle.getParameter(extension.UNMASKED_RENDERER_WEBGL);
         parameters['UNMASKED_VENDOR_WEBGL'] = handle.getParameter(extension.UNMASKED_VENDOR_WEBGL);
      }
      // 设置参数
      o._parameters = parameters;
      return parameters;
   }

   //==========================================================
   // <T>获得扩展。</T>
   //
   // @method
   // @param name:String 名称
   // @return Object 扩展
   //==========================================================
   public extension(name) {
      var extensions = this.extensions();
      return extensions[name];
   }

   //==========================================================
   // <T>获得扩展集合。</T>
   //
   // @method
   // @return Object 扩展集合
   //==========================================================
   public extensions() {
      var o = this;
      // 获得属性
      var extensions = o._extensions;
      if (!extensions) {
         extensions = o._extensions = new Object();
         // 获得参数
         var handle = o._handle;
         var names = handle.getSupportedExtensions();
         var count = names.length;
         for (var i = 0; i < count; i++) {
            var name = names[i];
            extensions[name] = handle.getExtension(name);
         }
      }
      return extensions;
   }

   //==========================================================
   // <T>允许浮点纹理。</T>
   //
   // @method
   // @return Boolean 是否允许
   //==========================================================
   public enableFloatTexture() {
      var o = this;
      if (!o._statusFloatTexture) {
         var handle = o._handle;
         // 检查浮点纹理
         var extension = handle.getExtension('OES_texture_float');
         if (!extension) {
            return false;
         }
         // 检查浮点纹理采样
         var extension = handle.getExtension('OES_texture_float_linear');
         if (!extension) {
            return false;
         }
         // 设置状态
         o._statusFloatTexture = true;
      }
      return o._statusFloatTexture;
   }

   //==========================================================
   // <T>允许多纹理。</T>
   //
   // @method
   // @return Boolean 是否允许
   //==========================================================
   public enableDrawBuffers() {
      var o = this;
      if (!o._statusDrawBuffers) {
         var handle = o._handle;
         // 检查句柄
         var extension = o._handleDrawBuffers;
         if (!extension) {
            return false;
         }
         // 检查浮点纹理采样
         extension.drawBuffersWEBGL([
            extension.COLOR_ATTACHMENT0_WEBGL
         ]);
         // 设置状态
         o._statusDrawBuffers = true;
      }
   }

   //==========================================================
   // <T>开始记录操作。</T>
   //
   // @method
   //==========================================================
   public recordBegin() {
      var o = this;
      o._recordBuffers.clear();
      o._recordSamplers.clear();
      o._statusRecord = true;
   }

   //==========================================================
   // <T>解除记录操作。</T>
   //
   // @method
   //==========================================================
   public recordEnd() {
      this._statusRecord = false;
   }

   //==========================================================
   // <T>创建渲染程序。</T>
   //
   // @method
   // @return FProgram3d 顶点缓冲
   //==========================================================
   public createProgram() {
      var o = this;
      var program = o.createObject(FWglProgram);
      o._storePrograms.push(program);
      o._statistics._programTotal++;
      return program;
   }

   //==========================================================
   // <T>创建布局。</T>
   //
   // @method
   // @return FProgram3d 顶点缓冲
   //==========================================================
   public createLayout() {
      var o = this;
      var layout = RClass.create(FWglLayout);
      layout.linkGraphicContext(o);
      if (o._capability.optionLayout) {
         layout.setup();
      }
      o._storeLayouts.push(layout);
      o._statistics._layoutTotal++;
      return layout;
   }

   //==========================================================
   // <T>创建顶点缓冲。</T>
   //
   // @method
   // @param clazz:Function 类对象
   // @return FG3dVertexBuffer 顶点缓冲
   //==========================================================
   public createVertexBuffer(clazz) {
      var o = this;
      //var buffer = o.createObject(MO.Runtime.nvl(clazz, MO.FWglVertexBuffer));
      //buffer.linkGraphicContext(o);
      //buffer.setup();
      //o._storeBuffers.push(buffer);
      //o._statistics._vertexBufferTotal++;
      //return buffer;
   }

   //==========================================================
   // <T>创建索引缓冲。</T>
   //
   // @method
   // @param clazz:Function 类对象
   // @return FG3dIndexBuffer 索引缓冲
   //==========================================================
   public createIndexBuffer(clazz) {
      var o = this;
      //var buffer = o.createObject(MO.Runtime.nvl(clazz, MO.FWglIndexBuffer));
      //o._storeBuffers.push(buffer);
      //o._statistics._indexBufferTotal++;
      //return buffer;
   }

   //==========================================================
   // <T>创建平面渲染纹理。</T>
   //
   // @method
   // @param clazz:Function 类对象
   // @return FG3dFlatTexture 平面渲染纹理
   //==========================================================
   public createFlatTexture(clazz) {
      var o = this;
      //var texture = o.createObject(MO.Runtime.nvl(clazz, MO.FWglFlatTexture));
      //o._storeTextures.push(texture);
      //o._statistics._flatTextureTotal++;
      //return texture;
   }

   //==========================================================
   // <T>创建立方渲染纹理。</T>
   //
   // @method
   // @param clazz:Function 类对象
   // @return FG3dCubeTexture 立方渲染纹理
   //==========================================================
   public createCubeTexture(clazz) {
      var o = this;
      //var texture = o.createObject(MO.Runtime.nvl(clazz, MO.FWglCubeTexture));
      //o._storeTextures.push(texture);
      //o._statistics._cubeTextureTotal++;
      //return texture;
   }

   //==========================================================
   // <T>创建渲染目标。</T>
   //
   // @method
   // @param clazz:Function 类对象
   // @return FG3dRenderTarget 渲染目标
   //==========================================================
   public createRenderTarget(clazz) {
      var o = this;
      //var texture = o.createObject(MO.Runtime.nvl(clazz, MO.FWglRenderTarget));
      //o._storeTargets.push(texture);
      //o._statistics._targetTotal++;
      //return texture;
   }

   //==========================================================
   // <T>设置视角大小。</T>
   //
   // @param left:Integer 左位置
   // @param top:Integer 上位置
   // @param width:Integer 宽度
   // @param height:Integer 高度
   //==========================================================
   public setViewport(left, top, width, height) {
      var o = this;
      //o._size.set(width, height);
      //o._viewportRectangle.set(left, top, width, height);
      o._handle.viewport(left, top, width, height);
      RLogger.debug(o, 'Context3d viewport. (location={1},{2}, size={3}x{4})', left, top, width, height);
   }

   //==========================================================
   // <T>设置填充模式。</T>
   //
   // @param fillModeCd:EG3dFillMode 填充模式
   //==========================================================
   public setFillMode(fillModeCd) {
      var o = this;
      var graphic = o._handle;
      // 检查状态
      if (o._fillModeCd == fillModeCd) {
         return false;
      }
      o._statistics._frameFillModeCount++;
      //..........................................................
      // 设置开关
      switch (fillModeCd) {
         case EG3dFillMode.Point:
            graphic.polygonMode(graphic.FRONT_AND_BACK, graphic.POINT);
            break;
         case EG3dFillMode.Line:
            graphic.polygonMode(graphic.FRONT_AND_BACK, graphic.LINE);
            break;
         case EG3dFillMode.Face:
            graphic.polygonMode(graphic.FRONT, graphic.FILL);
            break;
         default:
            throw new FError('Invalid parameter. (fill_mode={1})', fillModeCd);
      }
      o._fillModeCd = fillModeCd;
      return true;
   }

   //==========================================================
   // <T>设置深度模式。</T>
   //
   // @param depthFlag:Boolean 深度开关
   // @param depthCd:EG3dDepthMode 深度模式
   // @return 处理结果
   //==========================================================
   public setDepthMode(depthFlag, depthCd) {
      var o = this;
      var graphic = o._handle;
      // 检查状态
      if ((o._optionDepth == depthFlag) && (o._depthModeCd == depthCd)) {
         return false;
      }
      o._statistics._frameDepthModeCount++;
      //..........................................................
      // 设置开关
      if (o._optionDepth != depthFlag) {
         if (depthFlag) {
            graphic.enable(graphic.DEPTH_TEST);
         } else {
            graphic.disable(graphic.DEPTH_TEST);
         }
         o._optionDepth = depthFlag;
      }
      // 设置内容
      if (depthFlag && (o._depthModeCd != depthCd)) {
         var depthCode = RWglUtility.convertDepthMode(graphic, depthCd);
         graphic.depthFunc(depthCode);
         o._depthModeCd = depthCd;
      }
      return true;
   }

   //==========================================================
   // <T>设置深度输出模式。</T>
   //
   // @param depthMask:Boolean 深度输出
   // @return 处理结果
   //==========================================================
   public setDepthMask(depthMask) {
      var o = this;
      if (o._statusDepthMask != depthMask) {
         o._statistics._frameDepthMaskCount++;
         o._handle.depthMask(depthMask);
         o._statusDepthMask = depthMask;
         return true;
      }
      return false;
   }

   //==========================================================
   // <T>设置剪裁模式。</T>
   //
   // @param cullFlag:Boolean 剪裁开关
   // @param cullCd:EG3dCullMode 剪裁模式
   // @return 处理结果
   //==========================================================
   public setCullingMode(cullFlag, cullCd) {
      var o = this;
      var graphic = o._handle;
      // 检查状态
      if ((o._optionCull == cullFlag) && (o._cullModeCd == cullCd)) {
         return false;
      }
      o._statistics._frameCullModeCount++;
      //..........................................................
      // 设置开关
      if (o._optionCull != cullFlag) {
         if (cullFlag) {
            graphic.enable(graphic.CULL_FACE);
         } else {
            graphic.disable(graphic.CULL_FACE);
         }
         o._optionCull = cullFlag;
      }
      // 设置内容
      if (cullFlag && (o._cullModeCd != cullCd)) {
         var cullValue = RWglUtility.convertCullMode(graphic, cullCd);
         graphic.cullFace(cullValue);
         o._cullModeCd = cullCd;
      }
      return true;
   }

   //==========================================================
   // <T>设置融合方式。</T>
   //
   // @param blendFlag:Boolean 剪裁开关
   // @param sourceCd:EG3dBlendMode 来源融合模式
   // @param tagetCd:EG3dBlendMode 目标融合模式
   // @return 处理结果
   //==========================================================
   public setBlendFactors(blendFlag, sourceCd, tagetCd) {
      var o = this;
      var graphic = o._handle;
      // 检查状态
      if ((o._statusBlend == blendFlag) && (o._blendSourceCd == sourceCd) && (o._blendTargetCd == tagetCd)) {
         return false;
      }
      o._statistics._frameBlendModeCount++;
      //..........................................................
      // 设置开关
      if (o._statusBlend != blendFlag) {
         if (blendFlag) {
            graphic.enable(graphic.BLEND);
         } else {
            graphic.disable(graphic.BLEND);
            o._blendSourceCd = 0;
            o._blendTargetCd = 0;
         }
         o._statusBlend = blendFlag;
      }
      // 设置效果
      if (blendFlag && ((o._blendSourceCd != sourceCd) || (o._blendTargetCd != tagetCd))) {
         var sourceValue = RWglUtility.convertBlendFactors(graphic, sourceCd);
         var tagetValue = RWglUtility.convertBlendFactors(graphic, tagetCd);
         graphic.blendFunc(sourceValue, tagetValue);
         o._blendSourceCd = sourceCd;
         o._blendTargetCd = tagetCd;
      }
      return true;
   }

   //==========================================================
   // <T>设置有效区域。</T>
   // <P>剪裁区域的原点坐标是屏幕的左下角。</P>
   //
   // @param left:Integer 左位置
   // @param top:Integer 上位置
   // @param width:Integer 宽度
   // @param height:Integer 高度
   //==========================================================
   public setScissorRectangle(left, top, width, height) {
      var o = this;
      var handle = o._handle;
      // 设置标志
      var scissorFlag = (width > 0) && (height > 0);
      if (o._statusScissor != scissorFlag) {
         if (scissorFlag) {
            handle.enable(handle.SCISSOR_TEST);
         } else {
            handle.disable(handle.SCISSOR_TEST);
         }
         o._statusScissor = scissorFlag;
      }
      // 设置范围
      if (scissorFlag) {
         handle.scissor(left, top, width, height);
      }
   }

   //==========================================================
   // <T>设置渲染目标。</T>
   //
   // @method
   // @param renderTarget:FG3dRenderTarget 渲染目标
   //==========================================================
   public setRenderTarget(renderTarget) {
      var o = this;
      var graphic = o._handle;
      // 检查是否需要切换
      if (o._activeRenderTarget == renderTarget) {
         return;
      }
      o._statistics._frameTargetCount++;
      //............................................................
      // 设置程序
      var result = true;
      if (renderTarget == null) {
         // 解除渲染目标
         graphic.bindFramebuffer(graphic.FRAMEBUFFER, null);
         result = o.checkError("bindFramebuffer", "Bind frame buffer. (frame_buffer={1})", null);
         if (!result) {
            return result;
         }
         // 修改视角
         // var size = o._size;
         // graphic.viewport(0, 0, size.width, size.height);
         //var rectangle = o._viewportRectangle;
         //graphic.viewport(0, 0, rectangle.width, rectangle.height);
      } else {
         // 绑定渲染目标
         graphic.bindFramebuffer(graphic.FRAMEBUFFER, renderTarget._handle);
         result = o.checkError("bindFramebuffer", "Bind frame buffer. (frame_buffer={1})", renderTarget._handle);
         if (!result) {
            return result;
         }
         // 修改视角
         var size = renderTarget.size();
         graphic.viewport(0, 0, size.width, size.height);
      }
      o._activeRenderTarget = renderTarget;
      return result;
   }

   //==========================================================
   // <T>设置渲染程序。</T>
   //
   // @param program:FG3dProgram 渲染程序
   //==========================================================
   public setProgram(program) {
      var o = this;
      var graphic = o._handle;
      // 检查参数
      if (o._program == program) {
         return;
      }
      o._statistics._frameProgramCount++;
      //............................................................
      // 设置程序
      if (program) {
         graphic.useProgram(program._handle);
      } else {
         graphic.useProgram(null);
      }
      o._program = program;
      // 检查错误
      return o.checkError("useProgram", "Set program failure. (program={1}, program_native={2})", program, program._handle);
   }

   //==========================================================
   // <T>绑定常量数据。</T>
   //
   // @param shaderCd:EG3dShader 渲染器类型
   // @param slot:Integer 插槽
   // @param formatCd:EG3dParameterFormat 数据类型
   // @param data:Float32Array 数据
   // @param count:Integer 数据个数
   // @return Boolean 处理结果
   //==========================================================
   public bindConst(shaderCd, slot, formatCd, data, count) {
      var o = this;
      var graphic = o._handle;
      var result = true;
      o._statistics._frameConstCount++;
      //............................................................
      // 修改数据
      switch (formatCd) {
         case EG3dParameterFormat.Float1: {
            // 修改数据
            graphic.uniform1fv(slot, data);
            o._statistics._frameConstLength += data.byteLength;
            // 检查错误
            result = o.checkError("uniform1fv", "Bind const data failure. (shader_cd={1}, slot={2}, data={3}, count={4})", shaderCd, slot, data, count);
            break;
         }
         case EG3dParameterFormat.Float2: {
            // 修改数据
            graphic.uniform2fv(slot, data);
            o._statistics._frameConstLength += data.byteLength;
            // 检查错误
            result = o.checkError("uniform2fv", "Bind const data failure. (shader_cd={1}, slot={2}, data={3}, count={4})", shaderCd, slot, data, count);
            break;
         }
         case EG3dParameterFormat.Float3: {
            // 修改数据
            graphic.uniform3fv(slot, data);
            o._statistics._frameConstLength += data.byteLength;
            // 检查错误
            result = o.checkError("uniform3fv", "Bind const data failure. (shader_cd={1}, slot={2}, data={3}, count={4})", shaderCd, slot, data, count);
            break;
         }
         case EG3dParameterFormat.Float4: {
            // 修改数据
            graphic.uniform4fv(slot, data);
            o._statistics._frameConstLength += data.byteLength;
            // 检查错误
            result = o.checkError("uniform4fv", "Bind const data failure. (shader_cd={1}, slot={2}, data={3}, count={4})", shaderCd, slot, data, count);
            break;
         }
         case EG3dParameterFormat.Float3x3: {
            // 修改数据
            let bytes = o._data9;
            bytes[0] = data[0];
            bytes[1] = data[4];
            bytes[2] = data[8];
            bytes[3] = data[1];
            bytes[4] = data[5];
            bytes[5] = data[9];
            bytes[6] = data[2];
            bytes[7] = data[6];
            bytes[8] = data[10];
            graphic.uniformMatrix3fv(slot, graphic.FALSE, bytes);
            o._statistics._frameConstLength += bytes.byteLength;
            // 检查错误
            result = o.checkError("uniformMatrix3fv", "Bind const matrix3x3 failure. (shader_cd={1}, slot={2}, data={3}, count={4})", shaderCd, slot, data, count);
            break;
         }
         case EG3dParameterFormat.Float4x4: {
            // 修改数据
            let bytes = null;
            if (data.constructor == Float32Array) {
               bytes = data;
            } else if (data.writeData) {
               bytes = o._data16;
               data.writeData(bytes, 0);
            } else {
               throw new FError(this, 'Unknown data type.');
            }
            graphic.uniformMatrix4fv(slot, graphic.FALSE, bytes);
            o._statistics._frameConstLength += bytes.byteLength;
            // 检查错误
            result = o.checkError("uniformMatrix4fv", "Bind const matrix4x4 failure. (shader_cd={1}, slot={2}, data={3}, count={4})", shaderCd, slot, data, count);
            break;
         }
         default: {
            throw new FError(o, 'Unknown format type. (format_cd={1})', formatCd);
         }
      }
      return result;
   }

   //==========================================================
   // <T>绑定顶点缓冲。</T>
   //
   // @param slot:Integer 插槽
   // @param vertexBuffer:FG3dVertexBuffer 顶点缓冲
   // @param offset:Integer 偏移位置
   // @param formatCd:String 格式
   //==========================================================
   public bindVertexBuffer(slot, vertexBuffer, offset, formatCd) {
      var o = this;
      var graphic = o._handle;
      var result = true;
      o._statistics._frameBufferCount++;
      //............................................................
      // 录制模式
      if (o._statusRecord) {
         var layout = new graphic.context3d.SG3dLayoutBuffer();
         layout.slot = slot;
         layout.buffer = vertexBuffer;
         layout.index = offset;
         layout.formatCd = formatCd;
         o._recordBuffers.push(layout);
      }
      //............................................................
      // 设定顶点流
      var handle = null;
      if (vertexBuffer != null) {
         handle = vertexBuffer._handle;
      }
      graphic.bindBuffer(graphic.ARRAY_BUFFER, handle);
      // 检查错误
      result = o.checkError("bindBuffer", "Bind buffer. (buffer_id=%d)", handle);
      if (!result) {
         return result;
      }
      //............................................................
      // 激活顶点流
      if (vertexBuffer) {
         graphic.enableVertexAttribArray(slot);
         result = o.checkError("enableVertexAttribArray", "Enable vertex attribute array. (slot=%d)", slot);
         if (!result) {
            return result;
         }
      } else {
         graphic.disableVertexAttribArray(slot);
         result = o.checkError("disableVertexAttribArray", "Disable vertex attribute array. (slot=%d)", slot);
         return result;
      }
      //............................................................
      // 设置顶点流
      var stride = vertexBuffer._stride;
      switch (formatCd) {
         case EG3dAttributeFormat.Float1:
            graphic.vertexAttribPointer(slot, 1, graphic.FLOAT, false, stride, offset);
            break;
         case EG3dAttributeFormat.Float2:
            graphic.vertexAttribPointer(slot, 2, graphic.FLOAT, false, stride, offset);
            break;
         case EG3dAttributeFormat.Float3:
            graphic.vertexAttribPointer(slot, 3, graphic.FLOAT, false, stride, offset);
            break;
         case EG3dAttributeFormat.Float4:
            graphic.vertexAttribPointer(slot, 4, graphic.FLOAT, false, stride, offset);
            break;
         case EG3dAttributeFormat.Byte4:
            graphic.vertexAttribPointer(slot, 4, graphic.UNSIGNED_BYTE, false, stride, offset);
            break;
         case EG3dAttributeFormat.Byte4Normal:
            graphic.vertexAttribPointer(slot, 4, graphic.UNSIGNED_BYTE, true, stride, offset);
            break;
         default:
            throw new FError(o, "Unknown vertex format. (format_cd=%d)", formatCd);
      }
      // 检查错误
      result = o.checkError("glVertexAttribPointer", "Bind vertex attribute pointer. (slot=%d, format_cd=%d)", slot, formatCd);
      return result;
   }

   //==========================================================
   // <T>绑定纹理。</T>
   //
   // @param slot:Object 插槽
   // @param index:Integer 索引
   // @param texture:FG3dTexture 纹理
   // @return 处理结果
   //==========================================================
   public bindTexture(slot, index, texture) {
      var o = this;
      var graphic = o._handle;
      var result = true;
      o._statistics._frameTextureCount++;
      //............................................................
      // 录制模式
      if (o._statusRecord) {
         var layout = new graphic.context3d.SG3dLayoutSampler();
         layout.slot = slot;
         layout.index = index;
         layout.texture = texture;
         o._recordSamplers.push(layout);
      }
      //............................................................
      // 激活纹理
      if (o._activeTextureSlot != slot) {
         graphic.uniform1i(slot, index);
         graphic.activeTexture(graphic.TEXTURE0 + index);
         result = o.checkError("activeTexture", "Active texture failure. (slot=%d, index=%d)", slot, index);
         if (!result) {
            return result;
         }
         o._activeTextureSlot = slot;
      }
      //............................................................
      // 空纹理处理
      if (texture == null) {
         graphic.bindTexture(graphic.TEXTURE_2D, null);
         result = o.checkError("bindTexture", "Bind texture clear failure. (slot=%d)", slot);
         return result;
      }
      //............................................................
      // 绑定纹理
      var handle = texture._handle;
      var textureCd = texture.textureCd();
      switch (textureCd) {
         case EG3dTexture.Flat2d: {
            graphic.bindTexture(graphic.TEXTURE_2D, handle);
            result = o.checkError("glBindTexture", "Bind flag texture failure. (texture_id=%d)", handle);
            if (!result) {
               return result;
            }
            break;
         }
         case EG3dTexture.Cube: {
            graphic.bindTexture(graphic.TEXTURE_CUBE_MAP, handle);
            result = o.checkError("glBindTexture", "Bind cube texture failure. (texture_id=%d)", handle);
            if (!result) {
               return result;
            }
            break;
         }
         default: {
            throw new FError(o, 'Unknown texture type.');
         }
      }
      return result;
   }

   //==========================================================
   // <T>清空内容。</T>
   //
   // @param red:Float 红色
   // @param green:Float 绿色
   // @param blue:Float 蓝色
   // @param alpha:Float 透明
   // @param depth:Float 深度
   //==========================================================
   public clear(red, green, blue, alpha, depth) {
      var o = this;
      var graphic = o._handle;
      graphic.clearColor(red, green, blue, alpha);
      graphic.clearDepth(depth);
      graphic.clear(graphic.COLOR_BUFFER_BIT | graphic.DEPTH_BUFFER_BIT);
      o._statistics._frameClearCount++;
   }

   //==========================================================
   // <T>清空颜色内容。</T>
   //
   // @param red:Float 红色
   // @param green:Float 绿色
   // @param blue:Float 蓝色
   // @param alpha:Float 透明
   //==========================================================
   public clearColor(red, green, blue, alpha) {
      var o = this;
      var graphic = o._handle;
      graphic.clearColor(red, green, blue, alpha);
      graphic.clear(graphic.COLOR_BUFFER_BIT);
      o._statistics._frameClearCount++;
   }

   //==========================================================
   // <T>清空深度内容。</T>
   //
   // @param depth:Float 深度
   //==========================================================
   public clearDepth(depth) {
      var o = this;
      var graphic = o._handle;
      graphic.clearDepth(depth);
      graphic.clear(graphic.DEPTH_BUFFER_BIT);
      o._statistics._frameClearCount++;
   }

   //==========================================================
   // <T>读取指定范围的数据。</T>
   //
   // @param left:Integer 左位置
   // @param top:Integer 上位置
   // @param width:Integer 宽度
   // @param height:Integer 高度
   // @return Uint8Array 数据
   //==========================================================
   public readPixels(left, top, width, height) {
      var o = this;
      var graphic = o._handle;
      var length = 4 * width * height;
      var data = new Uint8Array(length);
      graphic.readPixels(left, top, width, height, graphic.RGBA, graphic.UNSIGNED_BYTE, data);
      return data;
   }

   //==========================================================
   // <T>绘制三角形。</T>
   //
   // @param indexBuffer:FIndexBuffer3d 索引缓冲
   // @param offset:Integer 开始位置
   // @param count:Integer 索引总数
   //==========================================================
   public drawTriangles(indexBuffer, offset, count) {
      var o = this;
      var graphic = o._handle;
      var result = true;
      // 设置参数
      if (offset == null) {
         offset = 0;
      }
      if (count == null) {
         count = indexBuffer.count();
      }
      // 设置索引流
      graphic.bindBuffer(graphic.ELEMENT_ARRAY_BUFFER, indexBuffer._handle);
      result = o.checkError("bindBuffer", "Bind element array buffer failure. (index=0x%08X, offset=%d, count=%d, buffer_id)", indexBuffer, offset, count, indexBuffer._handle);
      if (!result) {
         return result;
      }
      // 计算位宽
      var strideCd = indexBuffer.strideCd();
      var strideValue = RWglUtility.convertIndexStride(graphic, strideCd);
      var offsetValue = 0;
      switch (strideCd) {
         case EG3dIndexStride.Uint16:
            offsetValue = offset << 1;
            break;
         case EG3dIndexStride.Uint32:
            offsetValue = offset << 2;
            break;
      }
      // 绘制处理
      var drawModeCd = indexBuffer.drawModeCd();
      var drawModeValue = RWglUtility.convertDrawMode(graphic, drawModeCd);
      switch (drawModeCd) {
         case EG3dDrawMode.Lines:
            //if(indexBuffer._lineWidth){
            //graphic.lineWidth(indexBuffer._lineWidth);
            //}
            //graphic.enable(graphic.BLEND);
            //graphic.enable(graphic.LINE_SMOOTH);
            //graphic.hint(graphic.LINE_SMOOTH_HINT, graphic.FASTEST);
            //graphic.blendFunc(graphic.SRC_ALPHA, graphic.ONE_MINUS_SRC_ALPHA);
            break;
      }
      graphic.drawElements(drawModeValue, count, strideValue, offsetValue);
      o._statistics._frameTriangleCount += count;
      o._statistics._frameDrawCount++;
      result = o.checkError("drawElements", "Draw triangles failure. (index={1}, offset={2}, count={3})", indexBuffer, offset, count);
      if (!result) {
         return result;
      }
      // 清空索引流
      graphic.bindBuffer(graphic.ELEMENT_ARRAY_BUFFER, null);
      result = o.checkError("bindBuffer", "Bind element array buffer failure. (index={1}, offset={2}, count={3})", indexBuffer, offset, count);
      if (!result) {
         return result;
      }
      return result;
   }

   //==========================================================
   // <T>绘制处理。</T>
   //
   // @return 处理结果
   //==========================================================
   public present() {
   }

   //==========================================================
   // <T>检查执行错误。</T>
   //
   // @param code:String 代码
   // @param message:String 消息
   // @param parameter1:String 参数1
   //==========================================================
   public checkError(code, message, ...parameters) {
      var o = this;
      // 检查运行模式
      if (!o._capability.optionDebug) {
         return true;
      }
      //if (!MO.Runtime.isDebug()) {
      //   return true;
      //}
      // 获得错误原因
      var graphic = o._handle;
      var result = false;
      var error = null;
      var errorInfo = null;
      while (true) {
         // 获得错误
         error = graphic.getError();
         if (error == graphic.NO_ERROR) {
            result = true;
            break;
         }
         // 获得原因
         switch (error) {
            case graphic.INVALID_OPERATION:
               errorInfo = "Invalid operation.";
               break;
            case graphic.INVALID_ENUM:
               errorInfo = "Invalid enum.";
               break;
            case graphic.INVALID_VALUE:
               errorInfo = "Invalid value.";
               break;
            case graphic.INVALID_FRAMEBUFFER_OPERATION:
               errorInfo = "Invalid paramebuffer opeartion.";
               break;
            case graphic.OUT_OF_MEMORY:
               errorInfo = "Out of memory.";
               break;
            default:
               errorInfo = "Unknown";
               break;
         }
      }
      //............................................................
      // 输出错误信息
      if (!result) {
         RLogger.fatal(o, null, 'OpenGL check failure. (code={1}, description={2})', error, errorInfo);
      }
      return result;
   }

   //===========================================================
   // <T>存储设置。</T>
   //
   // @method
   // @param xconfig:TXmlNode 配置节点
   //===========================================================
   public saveConfig(xconfig) {
      var o = this;
      // 存储参数集合
      var parameters = o.parameters();
      var xparameters = xconfig.create('Parameters');
      RXml.saveObject(xparameters, 'Parameter', parameters);
      // 存储扩展集合
      var extensions = o.extensions();
      var xextensions = xconfig.create('Extensions');
      RXml.saveObject(xextensions, 'Extension', extensions);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      var o = this;
      // 释放属性
      o._data9 = null;
      o._data16 = null;
      // 释放属性
      o._recordBuffers = RObject.dispose(o._recordBuffers);
      o._recordSamplers = RObject.dispose(o._recordSamplers);
      // 释放属性
      //o._contextAttributes = null;
      o._parameters = null;
      o._extensions = null;
      o._activeTextureSlot = null;
      o._handleDrawBuffers = null;
      o._handleSamplerS3tc = null;
      o._handleDebugShader = null;
      // 父处理
      super.dispose();
   }
}
