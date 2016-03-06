import {FError} from '../../../../runtime/common/lang/FError';
import {FFlatTexture} from '../FFlatTexture';
import {RWglUtility} from './RWglUtility';

//==========================================================
// <T>WebGL平面渲染纹理。</T>
//
// @author maocy
// @history 141230
//==========================================================
export class FWglFlatTexture extends FFlatTexture {
   // 句柄
   public handle: WebGLTexture = null;
   // 更新状态 
   public statusUpdate: boolean = false;

   //==========================================================
   // <T>配置处理。</T>
   //==========================================================
   public setup() {
      super.setup();
      var graphic = this.graphicContext.handle;
      this.handle = graphic.createTexture();
   }

   //==========================================================
   // <T>当前缓冲是否有效。</T>
   //
   // @method
   // @return Boolean 是否有效
   //==========================================================
   public isValid() {
      var graphic = this.graphicContext.handle;
      return graphic.isTexture(this.handle);
   }

   //==========================================================
   // <T>获得纹理。</T>
   //
   // @method
   //==========================================================
   // public texture() {
   //    return this;
   // }

   //==========================================================
   // <T>生成位图的缩放图片。</T>
   //
   // @method
   //==========================================================
   public makeMipmap() {
      var graphic = this.graphicContext.handle;
      // 绑定数据
      graphic.bindTexture(graphic.TEXTURE_2D, this.handle);
      // 生成MIP
      graphic.generateMipmap(graphic.TEXTURE_2D);
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
      var context = this.graphicContext;
      var graphic = context.handle;
      // 检查参数
      var data = null;
      var clazz = content.constructor;
      if (clazz == ArrayBuffer) {
         data = new Uint8Array(content);
      } else if (clazz == Uint8Array) {
         data = content;
      } else if (clazz == Float32Array) {
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
      graphic.bindTexture(graphic.TEXTURE_2D, this.handle);
      // 上传内容
      var internalformatCd = graphic.RGBA;
      var formatCd = graphic.RGBA;
      var typeCd = graphic.UNSIGNED_BYTE;
      if (content.constructor == Float32Array) {
         internalformatCd = graphic.ALPHA;
         formatCd = graphic.ALPHA;
         typeCd = graphic.FLOAT;
      }
      graphic.texImage2D(graphic.TEXTURE_2D, 0, internalformatCd, width, height, 0, formatCd, typeCd, data);
      this.statusLoad = context.checkError("texImage2D", "Upload content failure.");
      // 更新处理
      this.update();
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
      var context = this.graphicContext;
      var capability = context.capability();
      var graphic = context.handle;
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
      graphic.bindTexture(graphic.TEXTURE_2D, this.handle);
      // 设置上下反转
      if (this.optionFlipY) {
         graphic.pixelStorei(graphic.UNPACK_FLIP_Y_WEBGL, true);
      }
      // 上传内容
      //if(f){
      //handle.compressedTexImage2D(handle.TEXTURE_2D, 0, f, p.size().width, p.size().height, 0, m);
      //}else{
      //handle.texImage2D(handle.TEXTURE_2D, 0, handle.RGBA, handle.RGBA, handle.UNSIGNED_BYTE, m);
      //}
      if ((left != null) && (top != null) && (width != null) && (height != null)) {
         graphic.texSubImage2D(graphic.TEXTURE_2D, 0, left, top, width, height, graphic.RGBA, graphic.UNSIGNED_BYTE, data);
      } else {
         graphic.texImage2D(graphic.TEXTURE_2D, 0, graphic.RGBA, graphic.RGBA, graphic.UNSIGNED_BYTE, data);
      }
      // 更新处理
      this.update();
      this.statusLoad = context.checkError("texImage2D", "Upload image failure.");
   }

   //==========================================================
   // <T>上传元素内容。</T>
   //
   // @method
   // @param element:Object 内容
   //==========================================================
   public uploadElement(element) {
      var graphic = this.graphicContext.handle;
      // 绑定数据
      graphic.bindTexture(graphic.TEXTURE_2D, this.handle);
      // 上传内容
      graphic.texImage2D(graphic.TEXTURE_2D, 0, graphic.RGBA, graphic.RGBA, graphic.UNSIGNED_BYTE, element);
      // 更新处理
      if (!this.statusUpdate) {
         this.update();
         this.statusUpdate = true;
      }
   }

   //==========================================================
   // <T>更新处理。</T>
   //
   // @method
   //==========================================================
   public update() {
      super.setup();
      // 绑定数据
      var graphic = this.graphicContext.handle;
      graphic.bindTexture(graphic.TEXTURE_2D, this.handle);
      // 设置过滤器
      var code = RWglUtility.convertSamplerFilter(graphic, this.filterMinCd);
      if (code) {
         graphic.texParameteri(graphic.TEXTURE_2D, graphic.TEXTURE_MIN_FILTER, code);
      }
      var code = RWglUtility.convertSamplerFilter(graphic, this.filterMagCd);
      if (code) {
         graphic.texParameteri(graphic.TEXTURE_2D, graphic.TEXTURE_MAG_FILTER, code);
      }
      var code = RWglUtility.convertSamplerFilter(graphic, this.wrapS);
      if (code) {
         graphic.texParameteri(graphic.TEXTURE_2D, graphic.TEXTURE_WRAP_S, code);
      }
      var code = RWglUtility.convertSamplerFilter(graphic, this.wrapT);
      if (code) {
         graphic.texParameteri(graphic.TEXTURE_2D, graphic.TEXTURE_WRAP_T, code);
      }
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      var graphic = this.graphicContext;
      // 释放对象
      var handle = this.handle;
      if (handle) {
         graphic.handle.deleteTexture(handle);
         this.handle = null;
      }
      // 父处理
      super.dispose();
   }
}
