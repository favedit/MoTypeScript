import {Fatal} from '../../../../runtime/common/lang/Fatal';
import {TextureFormatEnum} from '../../../../runtime/graphic/material/TextureFormatEnum';
import {FillModeEnum} from '../FillModeEnum';
import {DrawModeEnum} from '../DrawModeEnum';
import {CullModeEnum} from '../CullModeEnum';
import {DepthModeEnum} from '../DepthModeEnum';
import {BlendModeEnum} from '../BlendModeEnum';
import {IndexStrideEnum} from '../IndexStrideEnum';
import {SamplerFilterEnum} from '../SamplerFilterEnum';

//==========================================================
// <T>WebGL工具集。</T>
//
// @author maocy
// @history 141230
//==========================================================
export class WglUtil {
   //==========================================================
   // <T>转换填充模式类型。</T>
   //
   // @param graphic 渲染环境
   // @param fillCd 填充模式
   // @return 渲染数据
   //==========================================================
   public static convertFillMode(graphic, fillCd) {
      switch (fillCd) {
         case FillModeEnum.Point:
            return graphic.POINT;
         case FillModeEnum.Line:
            return graphic.LINE;
         case FillModeEnum.Face:
            return graphic.FILL;
      }
      throw new Fatal(this, "Convert fill mode failure. (fill_cd={1})", fillCd);
   }

   //==========================================================
   // <T>转换绘制模式类型。</T>
   //
   // @param graphic 渲染环境
   // @param drawCd 填充模式
   // @return 渲染数据
   //==========================================================
   public static convertDrawMode(graphic, drawCd) {
      switch (drawCd) {
         case DrawModeEnum.Points:
            return graphic.POINTS;
         case DrawModeEnum.Lines:
            return graphic.LINES;
         case DrawModeEnum.LineStrip:
            return graphic.LINE_STRIP;
         case DrawModeEnum.LineLoop:
            return graphic.LINE_LOOP;
         case DrawModeEnum.Triangles:
            return graphic.TRIANGLES;
         case DrawModeEnum.TriangleStrip:
            return graphic.TRIANGLE_STRIP;
         case DrawModeEnum.TriangleFan:
            return graphic.TRIANGLE_FAN;
         case DrawModeEnum.Quads:
            return graphic.QUADS;
         case DrawModeEnum.QuadStrip:
            return graphic.QUAD_STRIP;
      }
      throw new Fatal(this, "Convert draw mode failure. (draw_cd={1})", drawCd);
   }

   //==========================================================
   // <T>转换剔除模式类型。</T>
   //
   // @param graphic 渲染环境
   // @param cullCd 剔除模式
   // @return 渲染数据
   //==========================================================
   public static convertCullMode(graphic, cullCd) {
      switch (cullCd) {
         case CullModeEnum.Front:
            return graphic.FRONT;
         case CullModeEnum.Back:
            return graphic.BACK;
         case CullModeEnum.Both:
            return graphic.FRONT_AND_BACK;
      }
      throw new Fatal(this, "Convert cull mode failure. (cull_cd={1})", cullCd);
   }

   //==========================================================
   // <T>转换深度模式类型。</T>
   //
   // @param graphic 渲染环境
   // @param depthCd 深度模式
   // @return 渲染数据
   //==========================================================
   public static convertDepthMode(graphic, depthCd) {
      switch (depthCd) {
         case DepthModeEnum.Equal:
            return graphic.EQUAL;
         case DepthModeEnum.NotEqual:
            return graphic.NOTEQUAL;
         case DepthModeEnum.Less:
            return graphic.LESS;
         case DepthModeEnum.LessEqual:
            return graphic.LEQUAL;
         case DepthModeEnum.Greater:
            return graphic.GREATER;
         case DepthModeEnum.GreaterEqual:
            return graphic.GEQUAL;
         case DepthModeEnum.Always:
            return graphic.ALWAYS;
      }
      throw new Fatal(this, "Convert depth mode failure. (depth_cd={1})", depthCd);
   }

   //==========================================================
   // <T>转换融合模式类型。</T>
   //
   // @param graphic 渲染环境
   // @param blendCd 融合模式
   // @return 渲染数据
   //==========================================================
   public static convertBlendFactors(graphic, blendCd) {
      switch (blendCd) {
         case BlendModeEnum.Zero:
            return graphic.ZERO;
         case BlendModeEnum.One:
            return graphic.ONE;
         case BlendModeEnum.SrcColor:
            return graphic.SRC_COLOR;
         case BlendModeEnum.OneMinusSrcColor:
            return graphic.ONE_MINUS_SRC_COLOR;
         case BlendModeEnum.DstColor:
            return graphic.DST_COLOR;
         case BlendModeEnum.OneMinusDstColor:
            return graphic.ONE_MINUS_DST_COLOR;
         case BlendModeEnum.SrcAlpha:
            return graphic.SRC_ALPHA;
         case BlendModeEnum.OneMinusSrcAlpha:
            return graphic.ONE_MINUS_SRC_ALPHA;
         case BlendModeEnum.DstAlpha:
            return graphic.DST_ALPHA;
         case BlendModeEnum.OneMinusDstAlpha:
            return graphic.ONE_MINUS_DST_ALPHA;
         case BlendModeEnum.SrcAlphaSaturate:
            return graphic.SRC_ALPHA_SATURATE;
      }
      throw new Fatal(this, "Convert blend factors failure. (blend_cd={1})", blendCd);
   }

   //==========================================================
   // <T>转换索引宽度类型。</T>
   //
   // @param graphic 渲染环境
   // @param strideCd 索引宽度
   // @return 渲染数据
   //==========================================================
   public static convertIndexStride(graphic, strideCd) {
      switch (strideCd) {
         case IndexStrideEnum.Uint16:
            return graphic.UNSIGNED_SHORT;
         case IndexStrideEnum.Uint32:
            return graphic.UNSIGNED_INT;
      }
      throw new Fatal(this, "Convert index stride failure. (stride_cd={1})", strideCd);
   }

   //==========================================================
   // <T>转换采样过滤类型。</T>
   //
   // @method
   // @param graphic 渲染环境
   // @param filterCd 采样过滤
   // @return 渲染数据
   //==========================================================
   public static convertSamplerFilter(graphic, filterCd) {
      switch (filterCd) {
         case SamplerFilterEnum.Nearest:
            return graphic.NEAREST;
         case SamplerFilterEnum.Linear:
            return graphic.LINEAR;
         case SamplerFilterEnum.Repeat:
            return graphic.REPEAT;
         case SamplerFilterEnum.MirroredRepeat:
            return graphic.MIRRORED_REPEAT;
         case SamplerFilterEnum.ClampToEdge:
            return graphic.CLAMP_TO_EDGE;
         case SamplerFilterEnum.ClampToBorder:
            return graphic.CLAMP_TO_BORDER;
      }
      throw new Fatal(this, "Convert sampler filter failure. (filter_cd={1})", filterCd);
   }

   //==========================================================
   // <T>转换纹理格式。</T>
   //
   // @param graphic 渲染环境
   // @param formatCd 格式类型
   // @return 渲染数据
   //==========================================================
   public static convertTextureFormat(graphic, formatCd: TextureFormatEnum) {
      switch (formatCd) {
         case TextureFormatEnum.UnsignedByte:
            return graphic.NEAREST;
         case TextureFormatEnum.Float:
            return graphic.LINEAR;
      }
      throw new Fatal(this, "Convert texture format failure. (format_cd={1})", formatCd);
   }
}
