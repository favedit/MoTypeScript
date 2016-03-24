import {AssertUtil} from '../../../../runtime/common/AssertUtil';
import {WglContext} from './WglContext';

//==========================================================
// <T>WebGL渲染环境。</T>
//
// @author maocy
// @refer https://www.khronos.org/registry/webgl
// @history 141230
//==========================================================
export class WglContext2 extends WglContext {

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
   }

   //==========================================================
   // <T>关联页面画布标签。</T>
   //
   // @param hCanvas 页面画布标签
   //==========================================================
   public setup(hCanvas: HTMLCanvasElement, handle: any) {
      super.setup(hCanvas, handle);
      var capability = this.capability;
      // 设置信息
      capability.optionInstance = true;
      capability.optionLayout = true;
      capability.optionDepth24 = true;
      capability.optionIndex32 = true;
      capability.optionDrawBuffers = true;
      // "EXT_color_buffer_float",
      // "EXT_disjoint_timer_query",
      // "EXT_texture_filter_anisotropic",
      // "OES_texture_float_linear",
      // "WEBGL_compressed_texture_etc1",
      // "WEBGL_compressed_texture_s3tc",
      // "WEBGL_debug_renderer_info",
      // "WEBGL_debug_shaders",
      // "WEBGL_lose_context"
      return true;
   }

   //==========================================================
   // <T>创建顶点数组对象。</T>
   //
   // @return 顶点数组对象
   //==========================================================
   public createVertexArrayObject() {
      return this.handle.createVertexArray();
   }

   //==========================================================
   // <T>绑定顶点数组对象。</T>
   //
   // @param handle 顶点数组对象
   //==========================================================
   public bindVertexArrayObject(handle: any) {
      return this.handle.bindVertexArray(handle);
   }

   //==========================================================
   // <T>删除顶点数组对象。</T>
   //
   // @param handle 顶点数组对象
   //==========================================================
   public deleteVertexArrayObject(handle: any) {
      return this.handle.deleteVertexArray(handle);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      // 父处理
      super.dispose();
   }
}
