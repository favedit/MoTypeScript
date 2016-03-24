import {Fatal} from '../../../../runtime/common/lang/Fatal';
import {EFillMode} from '../EFillMode';
import {EDrawMode} from '../EDrawMode';
import {ECullMode} from '../ECullMode';
import {EDepthMode} from '../EDepthMode';
import {EBlendMode} from '../EBlendMode';
import {EIndexStride} from '../EIndexStride';
import {ESamplerFilter} from '../ESamplerFilter';

//==========================================================
// <T>WebGL工具集。</T>
//
// @author maocy
// @history 141230
//==========================================================
export class RWglUtility {
   //==========================================================
   // <T>转换填充模式类型。</T>
   //
   // @method
   // @param graphic:WebGLObject 渲染环境
   // @param fillCd:Integer 填充模式
   // @return Integer 渲染填充模式
   //==========================================================
   public static convertFillMode(graphic, fillCd) {
      switch (fillCd) {
         case EFillMode.Point:
            return graphic.POINT;
         case EFillMode.Line:
            return graphic.LINE;
         case EFillMode.Face:
            return graphic.FILL;
      }
      throw new Fatal(this, "Convert fill mode failure. (fill_cd={1})", fillCd);
   }

   //==========================================================
   // <T>转换绘制模式类型。</T>
   //
   // @method
   // @param graphic:WebGLObject 渲染环境
   // @param drawCd:Integer 填充模式
   // @return Integer 渲染填充模式
   //==========================================================
   public static convertDrawMode(graphic, drawCd) {
      switch (drawCd) {
         case EDrawMode.Points:
            return graphic.POINTS;
         case EDrawMode.Lines:
            return graphic.LINES;
         case EDrawMode.LineStrip:
            return graphic.LINE_STRIP;
         case EDrawMode.LineLoop:
            return graphic.LINE_LOOP;
         case EDrawMode.Triangles:
            return graphic.TRIANGLES;
         case EDrawMode.TriangleStrip:
            return graphic.TRIANGLE_STRIP;
         case EDrawMode.TriangleFan:
            return graphic.TRIANGLE_FAN;
         case EDrawMode.Quads:
            return graphic.QUADS;
         case EDrawMode.QuadStrip:
            return graphic.QUAD_STRIP;
      }
      throw new Fatal(this, "Convert draw mode failure. (draw_cd={1})", drawCd);
   }

   //==========================================================
   // <T>转换剔除模式类型。</T>
   //
   // @method
   // @param graphic:WebGLObject 渲染环境
   // @param cullCd:Integer 剔除模式
   // @return Integer 渲染剔除模式
   //==========================================================
   public static convertCullMode(graphic, cullCd) {
      switch (cullCd) {
         case ECullMode.Front:
            return graphic.FRONT;
         case ECullMode.Back:
            return graphic.BACK;
         case ECullMode.Both:
            return graphic.FRONT_AND_BACK;
      }
      throw new Fatal(this, "Convert cull mode failure. (cull_cd={1})", cullCd);
   }

   //==========================================================
   // <T>转换深度模式类型。</T>
   //
   // @method
   // @param graphic:WebGLObject 渲染环境
   // @param depthCd:Integer 深度模式
   // @return Integer 渲染深度模式
   //==========================================================
   public static convertDepthMode(graphic, depthCd) {
      switch (depthCd) {
         case EDepthMode.Equal:
            return graphic.EQUAL;
         case EDepthMode.NotEqual:
            return graphic.NOTEQUAL;
         case EDepthMode.Less:
            return graphic.LESS;
         case EDepthMode.LessEqual:
            return graphic.LEQUAL;
         case EDepthMode.Greater:
            return graphic.GREATER;
         case EDepthMode.GreaterEqual:
            return graphic.GEQUAL;
         case EDepthMode.Always:
            return graphic.ALWAYS;
      }
      throw new Fatal(this, "Convert depth mode failure. (depth_cd={1})", depthCd);
   }

   //==========================================================
   // <T>转换融合模式类型。</T>
   //
   // @method
   // @param graphic:WebGLObject 渲染环境
   // @param blendCd:Integer 融合模式
   // @return Integer 渲染融合模式
   //==========================================================
   public static convertBlendFactors(graphic, blendCd) {
      switch (blendCd) {
         case EBlendMode.Zero:
            return graphic.ZERO;
         case EBlendMode.One:
            return graphic.ONE;
         case EBlendMode.SrcColor:
            return graphic.SRC_COLOR;
         case EBlendMode.OneMinusSrcColor:
            return graphic.ONE_MINUS_SRC_COLOR;
         case EBlendMode.DstColor:
            return graphic.DST_COLOR;
         case EBlendMode.OneMinusDstColor:
            return graphic.ONE_MINUS_DST_COLOR;
         case EBlendMode.SrcAlpha:
            return graphic.SRC_ALPHA;
         case EBlendMode.OneMinusSrcAlpha:
            return graphic.ONE_MINUS_SRC_ALPHA;
         case EBlendMode.DstAlpha:
            return graphic.DST_ALPHA;
         case EBlendMode.OneMinusDstAlpha:
            return graphic.ONE_MINUS_DST_ALPHA;
         case EBlendMode.SrcAlphaSaturate:
            return graphic.SRC_ALPHA_SATURATE;
      }
      throw new Fatal(this, "Convert blend factors failure. (blend_cd={1})", blendCd);
   }

   //==========================================================
   // <T>转换索引宽度类型。</T>
   //
   // @method
   // @param graphic:WebGLObject 渲染环境
   // @param strideCd:Integer 索引宽度
   // @return Integer 渲染索引宽度
   //==========================================================
   public static convertIndexStride(graphic, strideCd) {
      switch (strideCd) {
         case EIndexStride.Uint16:
            return graphic.UNSIGNED_SHORT;
         case EIndexStride.Uint32:
            return graphic.UNSIGNED_INT;
      }
      throw new Fatal(this, "Convert index stride failure. (stride_cd={1})", strideCd);
   }

   //==========================================================
   // <T>转换采样过滤类型。</T>
   //
   // @method
   // @param graphic:WebGLObject 渲染环境
   // @param filterCd:Integer 采样过滤
   // @return Integer 渲染索引宽度
   //==========================================================
   public static convertSamplerFilter(graphic, filterCd) {
      switch (filterCd) {
         case ESamplerFilter.Nearest:
            return graphic.NEAREST;
         case ESamplerFilter.Linear:
            return graphic.LINEAR;
         case ESamplerFilter.Repeat:
            return graphic.REPEAT;
         case ESamplerFilter.MirroredRepeat:
            return graphic.MIRRORED_REPEAT;
         case ESamplerFilter.ClampToEdge:
            return graphic.CLAMP_TO_EDGE;
         case ESamplerFilter.ClampToBorder:
            return graphic.CLAMP_TO_BORDER;
      }
      throw new Fatal(this, "Convert sampler filter failure. (filter_cd={1})", filterCd);
   }
}
