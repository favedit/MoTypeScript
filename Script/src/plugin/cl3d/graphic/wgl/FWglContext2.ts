import {AssertUtil} from '../../../../runtime/common/AssertUtil';
import {FWglContext} from './FWglContext';

//==========================================================
// <T>WebGL渲染环境。</T>
//
// @author maocy
// @refer https://www.khronos.org/registry/webgl
// @history 141230
//==========================================================
export class FWglContext2 extends FWglContext {

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
      // 测试实例绘制支持
      capability.optionInstance = true;
      // 测试顶点布局支持
      capability.optionLayout = true;
      // 测试32位索引支持
      capability.optionIndex32 = true;
      // 测试多渲染支持
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
