import {FError} from '../../../../runtime/common/lang/FError';
import {FVertexShader} from '../FVertexShader';

//==========================================================
// <T>WebGL渲染器。</T>
//
// @author maocy
// @history 141230
//==========================================================
export class FWglVertexShader extends FVertexShader {
   // 句柄
   public handle = null;

   //==========================================================
   // <T>配置处理。</T>
   //
   // @method
   //==========================================================
   public setup() {
      super.setup();
      // 创建对象
      var graphic = this.graphicContext.handle;
      this.handle = graphic.createShader(graphic.VERTEX_SHADER);
   }

   //==========================================================
   // <T>获得目标代码。</T>
   //
   // @return 目标代码
   //==========================================================
   public targetSource() {
      var source = null;
      var context = this.graphicContext;
      var capability = context.capability();
      if (capability.optionShaderSource) {
         source = context._handleDebugShader.getTranslatedShaderSource(this.handle);
      } else {
         source = this.source;
      }
      return source;
   }

   //==========================================================
   // <T>上传渲染代码。</T>
   //
   // @param source 渲染代码
   //==========================================================
   public upload(source: string): void {
      var graphic = this.graphicContext.handle;
      var handle = this.handle;
      // 上传代码
      graphic.shaderSource(handle, source);
      // 编译处理
      graphic.compileShader(handle);
      var result = graphic.getShaderParameter(handle, graphic.COMPILE_STATUS);
      if (!result) {
         var info = graphic.getShaderInfoLog(handle);
         graphic.deleteShader(handle);
         this.handle = null;
         throw new FError(this, 'Upload vertex shader source failure. (error={1})\n{2}', info, source);
      }
      this.source = source;
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      var graphic = this.graphicContext.handle;
      // 释放对象
      var shader = this.handle;
      if (shader) {
         graphic.deleteShader(shader);
         this.handle = null;
      }
      // 父处理
      super.dispose();
   }
}
