import {AssertUtil} from '../../../../runtime/common/AssertUtil';
import {RenderTarget} from '../RenderTarget';

//==========================================================
// <T>WebGL渲染目标。</T>
//
// @author maocy
// @history 150116
//==========================================================
export class WglRenderTarget extends RenderTarget {
   // @attribute
   public optionDepth;
   // @attribute
   public handle;
   public handleDepth;

   //==========================================================
   // <T>配置处理。</T>
   //==========================================================
   public setup() {
      var context = this._graphicContext;
      var graphic = context.handle;
      //............................................................
      // 创建帧缓冲
      this.handle = graphic.createFramebuffer();
      return context.checkError('createFramebuffer', 'Create frame buffer failure.');
   }

   //==========================================================
   // <T>构建处理。</T>
   //==========================================================
   public build() {
      var size = this.size;
      var context = this._graphicContext;
      var handle = context.handle;
      //............................................................
      // 绑定帧缓冲
      handle.bindFramebuffer(handle.FRAMEBUFFER, this.handle);
      var result = context.checkError('bindFramebuffer', 'Bind frame buffer failure.');
      if (!result) {
         return result;
      }
      //............................................................
      // 创建深度缓冲区
      if (this.optionDepth) {
         // 绑定深度缓冲区
         var depthHandle = this.handleDepth = handle.createRenderbuffer();
         var result = context.checkError('createRenderbuffer', 'Create render buffer failure.');
         if (!result) {
            return result;
         }
         handle.bindRenderbuffer(handle.RENDERBUFFER, depthHandle);
         var result = context.checkError('bindRenderbuffer', 'Bind render buffer failure.');
         if (!result) {
            return result;
         }
         handle.renderbufferStorage(handle.RENDERBUFFER, handle.DEPTH_COMPONENT16, size.width, size.height);
         //handle.renderbufferStorage(handle.RENDERBUFFER, handle.DEPTH_COMPONENT24, size.width, size.height);
         var result = context.checkError('renderbufferStorage', 'Set render buffer storage format failure.');
         if (!result) {
            return result;
         }
         // 绑定深度缓冲区
         handle.framebufferRenderbuffer(handle.FRAMEBUFFER, handle.DEPTH_ATTACHMENT, handle.RENDERBUFFER, depthHandle);
         var result = context.checkError('framebufferRenderbuffer', "Set depth buffer to frame buffer failure. (framebuffer=%d, depthbuffer=%d)", this.handle, depthHandle);
         if (!result) {
            return result;
         }
      }
      //............................................................
      // 绑定纹理缓冲集合
      var textures = this._textures;
      var textureCount = textures.count();
      var attachment0 = handle.COLOR_ATTACHMENT0;
      if (context.statusDrawBuffers) {
         var extension = context.handleDrawBuffers();
         attachment0 = extension.COLOR_ATTACHMENT0_WEBGL;
      }
      for (var i = 0; i < textureCount; i++) {
         var texture = textures.get(i);
         AssertUtil.debugNotNull(texture);
         AssertUtil.debugNotNull(texture.handle);
         // 设置信息
         handle.bindTexture(handle.TEXTURE_2D, texture.handle);
         handle.texParameteri(handle.TEXTURE_2D, handle.TEXTURE_MAG_FILTER, handle.LINEAR);
         handle.texParameteri(handle.TEXTURE_2D, handle.TEXTURE_MIN_FILTER, handle.LINEAR);
         // 设置存储
         //handle.texImage2D(handle.TEXTURE_2D, 0, handle.RGBA, size.width, size.height, 0, handle.RGBA, handle.UNSIGNED_BYTE, null);
         handle.texImage2D(handle.TEXTURE_2D, 0, handle.RGBA, size.width, size.height, 0, handle.RGBA, handle.UNSIGNED_BYTE, null);
         var result = context.checkError('texImage2D', "Alloc texture storage. (texture_id, size=%dx%d)", texture.handle, size.width, size.height);
         if (!result) {
            return result;
         }
         // 绑定数据
         handle.framebufferTexture2D(handle.FRAMEBUFFER, attachment0 + i, handle.TEXTURE_2D, texture.handle, 0);
         var result = context.checkError('framebufferTexture2D', "Set color buffer into frame buffer failure. (framebuffer_id=%d, texture_id=%d)", this.handle, texture.handle);
         if (!result) {
            return result;
         }
      }
      // 清空渲染目标
      handle.bindFramebuffer(handle.FRAMEBUFFER, null);
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      var context = this._graphicContext;
      // 释放深度对象
      var handleDepth = this.handleDepth;
      if (handleDepth) {
         context._handle.deleteRenderbuffer(handleDepth);
         this.handleDepth = null;
      }
      // 释放对象
      var handle = this.handle;
      if (handle) {
         context._handle.deleteFramebuffer(handle);
         this.handle = null;
      }
      // 父处理
      super.dispose();
   }
}
