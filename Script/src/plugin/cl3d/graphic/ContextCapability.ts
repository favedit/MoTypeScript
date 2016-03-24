//==========================================================
// <T>渲染环境信息。</T>
//
// @class
// @author maocy
// @history 141230
//==========================================================
export class ContextCapability {
   // @attribute
   public vendor;
   public version;
   public shaderVersion;
   // @attribute
   public optionDebug:boolean = true;
   public optionInstance:boolean = false;
   public optionLayout:boolean = false;
   public optionMaterialMap:boolean = false;
   public optionIndex32:boolean = false;
   public optionShaderSource:boolean = false;
   public optionDrawBuffers:boolean = false;
   // @attribute
   public mergeCount = 0;
   public attributeCount = null;
   public vertexCount = 65536;
   public vertexConst = null;
   public fragmentConst = null;
   public varyingCount = null;
   // @attribute
   public samplerCount = null;
   public samplerSize = null;
   public samplerCompressRgb = null;
   public samplerCompressRgba = null;
   // @attribute
   public shader = null;

   //============================================================
   // <T>计算当前设备支持实例的最大个数。</T>
   //
   // @param boneCount 骨头数量
   // @param vertexCount 顶点数量（不设置的话不限制）
   // @param 可用实例个数
   //============================================================
   public calculateBoneCount(boneCount, vertexCount) {
      var o = this;
      // 以4个为倍数
      var rb = 0;
      var bi = boneCount % 4;
      if (bi != 0) {
         rb = boneCount + 4 - bi;
      } else {
         rb = boneCount;
      }
      // 以4个为倍数
      var r = 0;
      var ib = (o.vertexConst - 16) / 4;
      if (rb > ib) {
         r = ib;
      } else {
         r = rb;
      }
      return r;
   }

   //============================================================
   // <T>计算当前设备支持实例的最大个数。</T>
   //
   // @param boneCount 骨头数量
   // @param vertexCount 顶点数量（不设置的话不限制）
   // @param 可用实例个数
   //============================================================
   public calculateInstanceCount(boneCount, vertexCount) {
      var o = this;
      // 计算常量缓冲限制
      var cr = (4 * boneCount) + 4;
      var ib = (o.vertexConst - 16) / cr;
      //var r = cl;
      var r = 0;
      // 计算顶点限制
      if (vertexCount > 0) {
         var iv = o.vertexCount / vertexCount;
         r = Math.min(ib, iv);
      }
      // 计算其他限制
      if (r > 64) {
         r = 64;
      }
      return r;
   }

   //============================================================
   // <T>释放处理。</T>
   //============================================================
   public dispose() {
      var o = this;
      o.shader = null;
      //MO.RObject.free(o);
   }
}