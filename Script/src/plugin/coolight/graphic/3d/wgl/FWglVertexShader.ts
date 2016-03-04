import {FError} from '../../../../../runtime/common/lang/FError';
import {FG3dVertexShader} from '../FG3dVertexShader';

//==========================================================
// <T>WebGL渲染器。</T>
//
// @author maocy
// @history 141230
//==========================================================
export class FWglVertexShader extends FG3dVertexShader {
   // @attribute
   _handle = null;

   //==========================================================
   // <T>配置处理。</T>
   //
   // @method
   //==========================================================
   public setup() {
      //super.seto.__base.FG3dVertexShader.setup.call(o);
      // 创建对象
      var graphic = this._graphicContext._handle;
      this._handle = graphic.createShader(graphic.VERTEX_SHADER);
   }

   //==========================================================
   // <T>获得目标代码。</T>
   //
   // @method
   // @return String 目标代码
   //==========================================================
   public targetSource() {
      var o = this;
      var source = null;
      var context = o._graphicContext;
      var capability = context.capability();
      if (capability.optionShaderSource) {
         source = context._handleDebugShader.getTranslatedShaderSource(o._handle);
      } else {
         //source = o._source;
      }
      return source;
   }

   //==========================================================
   // <T>上传渲染代码。</T>
   //
   // @method
   // @param source:String 渲染代码
   //==========================================================
   public upload(source) {
      var o = this;
      var graphic = o._graphicContext._handle;
      var shader = o._handle;
      // 上传代码
      graphic.shaderSource(shader, source);
      // 编译处理
      graphic.compileShader(shader);
      var result = graphic.getShaderParameter(shader, graphic.COMPILE_STATUS);
      if (!result) {
         var info = graphic.getShaderInfoLog(shader);
         graphic.deleteShader(shader);
         o._handle = null;
         throw new FError(o, 'Upload vertex shader source failure. (error={1})\n{2}', info, source);
      }
      o._source = source;
      return true;
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
      var shader = o._handle;
      if (shader) {
         context._handle.deleteShader(shader);
         o._handle = null;
      }
      // 父处理
      super.dispose();
   }
}
