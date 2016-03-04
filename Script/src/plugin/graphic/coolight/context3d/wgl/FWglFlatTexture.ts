import {FError} from '../../../../../runtime/common/lang/FError';
import {FG3dFlatTexture} from '../FG3dFlatTexture';
import {RWglUtility} from './RWglUtility';

//==========================================================
// <T>WebGL平面渲染纹理。</T>
//
// @author maocy
// @history 141230
//==========================================================
export class FWglFlatTexture extends FG3dFlatTexture {
   // @attribute
   _handle = null;
   _statusUpdate = false;

   //==========================================================
   // <T>配置处理。</T>
   //
   // @method
   //==========================================================
   public setup() {
      var o = this;
      var g = o._graphicContext._handle;
      //o.__base.FG3dFlatTexture.setup.call(o);
      o._handle = g.createTexture();
   }

   //==========================================================
   // <T>当前缓冲是否有效。</T>
   //
   // @method
   // @return Boolean 是否有效
   //==========================================================
   public isValid() {
      var o = this;
      var g = o._graphicContext._handle;
      return g.isTexture(o._handle);
   }

   //==========================================================
   // <T>获得纹理。</T>
   //
   // @method
   //==========================================================
   public texture() {
      return this;
   }

   //==========================================================
   // <T>生成位图的缩放图片。</T>
   //
   // @method
   //==========================================================
   public makeMipmap() {
      var o = this;
      var context = o._graphicContext;
      var handle = context._handle;
      // 绑定数据
      handle.bindTexture(handle.TEXTURE_2D, o._handle);
      // 生成MIP
      handle.generateMipmap(handle.TEXTURE_2D);
   }

   //==========================================================
   // <T>上传数据内容。</T>
   //
   // @method
   // @param content:Array 内容
   // @param width:Integer 宽度
   // @param height:Integer 高度
   //==========================================================
   public uploadData(content, width, height) {
      var o = this;
      var context = o._graphicContext;
      var handle = context._handle;
      // 检查参数
      var data = null;
      if (content.constructor == ArrayBuffer) {
         data = new Uint8Array(content);
      } else if (content.constructor == Uint8Array) {
         data = content;
      } else if (content.constructor == Float32Array) {
         if (!context.enableFloatTexture()) {
            throw new FError(this, 'Invalid content float format.');
         }
         data = content;
      } else {
         throw new FError(this, 'Invalid content format.');
      }
      // 设置属性
      // o.width = width;
      // o.height = height;
      // 绑定数据
      handle.bindTexture(handle.TEXTURE_2D, o._handle);
      // 上传内容
      var internalformatCd = handle.RGBA;
      var formatCd = handle.RGBA;
      var typeCd = handle.UNSIGNED_BYTE;
      if (content.constructor == Float32Array) {
         internalformatCd = handle.ALPHA;
         formatCd = handle.ALPHA;
         typeCd = handle.FLOAT;
      }
      handle.texImage2D(handle.TEXTURE_2D, 0, internalformatCd, width, height, 0, formatCd, typeCd, data);
      o._statusLoad = context.checkError("texImage2D", "Upload content failure.");
      // 更新处理
      o.update();
   }

   //==========================================================
   // <T>上传图片内容。</T>
   //
   // @method
   // @param content:Object 内容
   // @param left:Number 左位置
   // @param top:Number 上位置
   // @param width:Number 宽度
   // @param height:Number 高度
   //==========================================================
   public upload(content, left, top, width, height) {
      var o = this;
      var context = o._graphicContext;
      var capability = context.capability();
      var handle = context._handle;
      // 检查参数
      var data = null;
      //var format = null;
      var tagName = content.tagName;
      if ((tagName == 'IMG') || (tagName == 'VIDEO') || (tagName == 'CANVAS')) {
         data = content;
      } else if (content.constructor == Uint8Array) {
         data = content;
      } else if (content.constructor == Uint8ClampedArray) {
         data = new Uint8Array(content);
         //} else if (MO.Class.isClass(content, MO.FImage)) {
         //data = content.image();
         //if(image.optionAlpha()){
         //   format = capability.samplerCompressRgba;
         //}else{
         //   format = capability.samplerCompressRgb;
         //}
         //} else if (MO.Class.isClass(content, MO.MCanvasObject)) {
         //data = content.htmlCanvas();
      } else {
         throw new FError(this, 'Invalid image format.');
      }
      // 绑定数据
      handle.bindTexture(handle.TEXTURE_2D, o._handle);
      // 设置上下反转
      if (o._optionFlipY) {
         handle.pixelStorei(handle.UNPACK_FLIP_Y_WEBGL, true);
      }
      // 上传内容
      //if(f){
      //handle.compressedTexImage2D(handle.TEXTURE_2D, 0, f, p.size().width, p.size().height, 0, m);
      //}else{
      //handle.texImage2D(handle.TEXTURE_2D, 0, handle.RGBA, handle.RGBA, handle.UNSIGNED_BYTE, m);
      //}
      if ((left != null) && (top != null) && (width != null) && (height != null)) {
         handle.texSubImage2D(handle.TEXTURE_2D, 0, left, top, width, height, handle.RGBA, handle.UNSIGNED_BYTE, data);
      } else {
         handle.texImage2D(handle.TEXTURE_2D, 0, handle.RGBA, handle.RGBA, handle.UNSIGNED_BYTE, data);
      }
      // 更新处理
      o.update();
      o._statusLoad = context.checkError("texImage2D", "Upload image failure.");
   }

   //==========================================================
   // <T>上传元素内容。</T>
   //
   // @method
   // @param element:Object 内容
   //==========================================================
   public uploadElement(element) {
      var o = this;
      var handle = o._graphicContext._handle;
      // 绑定数据
      handle.bindTexture(handle.TEXTURE_2D, o._handle);
      // 上传内容
      handle.texImage2D(handle.TEXTURE_2D, 0, handle.RGBA, handle.RGBA, handle.UNSIGNED_BYTE, element);
      // 更新处理
      if (!o._statusUpdate) {
         o.update();
         o._statusUpdate = true;
      }
   }

   //==========================================================
   // <T>更新处理。</T>
   //
   // @method
   //==========================================================
   public update() {
      var o = this;
      //o.__base.FG3dFlatTexture.update.call(o);
      // 绑定数据
      var handle = o._graphicContext._handle;
      handle.bindTexture(handle.TEXTURE_2D, o._handle);
      // 设置过滤器
      var code = RWglUtility.convertSamplerFilter(handle, o._filterMinCd);
      if (code) {
         handle.texParameteri(handle.TEXTURE_2D, handle.TEXTURE_MIN_FILTER, code);
      }
      var code = RWglUtility.convertSamplerFilter(handle, o._filterMagCd);
      if (code) {
         handle.texParameteri(handle.TEXTURE_2D, handle.TEXTURE_MAG_FILTER, code);
      }
      var code = RWglUtility.convertSamplerFilter(handle, o._wrapS);
      if (code) {
         handle.texParameteri(handle.TEXTURE_2D, handle.TEXTURE_WRAP_S, code);
      }
      var code = RWglUtility.convertSamplerFilter(handle, o._wrapT);
      if (code) {
         handle.texParameteri(handle.TEXTURE_2D, handle.TEXTURE_WRAP_T, code);
      }
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      var o = this;
      var context = o._graphicContext;
      // 释放对象
      var handle = o._handle;
      if (handle) {
         context._handle.deleteTexture(handle);
         o._handle = null;
      }
      // 父处理
      super.dispose();
   }
}
