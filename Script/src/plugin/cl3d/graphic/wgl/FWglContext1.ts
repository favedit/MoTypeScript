import {RAssert} from '../../../../runtime/common/RAssert';
import {FWglContext} from './FWglContext';

//==========================================================
// <T>WebGL渲染环境。</T>
//
// @author maocy
// @refer https://www.khronos.org/registry/webgl
// @history 141230
//==========================================================
export class FWglContext1 extends FWglContext {
   // @attribute
   protected _handleInstance;
   protected _handleLayout;
   protected _handleDrawBuffers;

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
   public setup(hCanvas: HTMLCanvasElement, handle: WebGLRenderingContext) {
      super.setup(hCanvas, handle);
      debugger;
      var capability = this.capability;
      // 测试实例绘制支持
      var extension = this._handleInstance = handle.getExtension('ANGLE_instanced_arrays');
      if (extension) {
         capability.optionInstance = true;
      }
      capability.mergeCount = parseInt(((capability.vertexConst - 32) / 4) as any);
      // 测试顶点布局支持
      var extension = this._handleLayout = handle.getExtension('OES_vertex_array_object');
      if (extension) {
         capability.optionLayout = true;
      }
      // 测试32位索引支持
      var extension = handle.getExtension('OES_element_index_uint');
      if (extension) {
         capability.optionIndex32 = true;
      }
      // 测试多渲染支持
      var extension = this._handleDrawBuffers = handle.getExtension('WEBGL_draw_buffers');
      if (extension) {
         capability.optionDrawBuffers = true;
      }
      return true;
   }

   //==========================================================
   // <T>允许多纹理。</T>
   //
   // @return 是否允许
   //==========================================================
   public enableDrawBuffers() {
      super.enableDrawBuffers
      if (!this.statusDrawBuffers) {
         var handle = this.handle;
         // 检查句柄
         var extension = this._handleDrawBuffers;
         if (!extension) {
            return false;
         }
         // 检查浮点纹理采样
         extension.drawBuffersWEBGL([
            extension.COLOR_ATTACHMENT0_WEBGL
         ]);
         // 设置状态
         this.statusDrawBuffers = true;
         return true;
      }
      return false;
   }

   //==========================================================
   // <T>创建顶点数组对象。</T>
   //
   // @return 顶点数组对象
   //==========================================================
   public createVertexArrayObject() {
      RAssert.debugNotNull(this._handleLayout);
      return this._handleLayout.createVertexArrayOES();
   }

   //==========================================================
   // <T>绑定顶点数组对象。</T>
   //
   // @param handle 顶点数组对象
   //==========================================================
   public bindVertexArrayObject(handle: any) {
      RAssert.debugNotNull(this._handleLayout);
      return this._handleLayout.bindVertexArrayOES(handle);
   }

   //==========================================================
   // <T>删除顶点数组对象。</T>
   //
   // @param handle 顶点数组对象
   //==========================================================
   public deleteVertexArrayObject(handle: any) {
      RAssert.debugNotNull(this._handleLayout);
      return this._handleLayout.deleteVertexArrayOES(handle);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      // 释放属性
      this._handleDrawBuffers = null;
      // 父处理
      super.dispose();
   }
}
