import {FError} from '../../../runtime/common/lang/FError';
import {FObjects} from '../../../runtime/common/lang/FObjects';
import {FDictionary} from '../../../runtime/common/lang/FDictionary';
import {RString} from '../../../runtime/common/lang/RString';
import {RObject} from '../../../runtime/common/lang/RObject';
import {SMatrix3d} from '../../../runtime/common/math/SMatrix3d';
import {SOutline3d} from '../../../runtime/common/math/SOutline3d';
import {RAssert} from '../../../runtime/common/RAssert';
import {FRenderable as FBaseRenderable} from '../base/FRenderable';
import {FIndexBuffer} from '../graphic/FIndexBuffer';
import {FVertexBuffer} from '../graphic/FVertexBuffer';
import {SRenderableInfo} from './SRenderableInfo';
import {FRegion} from './FRegion';

//==========================================================
// <T>渲染体。</T>
//
// @author maocy
// @history 150207
//==========================================================
export class FRenderable extends FBaseRenderable {
   // 图形环境
   public graphicContext: any = null;
   // 资源
   public resource = null;
   // 外轮廓
   public outline = null;
   // 轮廓可见性
   // public outlineVisible = true;
   // 计算矩阵
   public calculateMatrix = null;
   // 顶点数量
   public vertexCount: number = 0;
   // 顶点缓冲集合
   public vertexBuffers: FDictionary<FVertexBuffer> = null;
   // 索引缓冲集合
   public indexBuffers: FObjects<FIndexBuffer> = null;
   // 纹理集合
   public textures: FDictionary<any> = null;
   // 激活信息
   public activeInfo: SRenderableInfo = null;
   // 信息集合
   public infos: FDictionary<SRenderableInfo> = null;
   //..........................................................
   //    o._display           = MO.Class.register(o, new MO.AGetSet('_display'));
   //public optionMerge = false;
   //public optionFull = false;
   //public optionSelect = true;
   //    o._materials         = MO.Class.register(o, new MO.AGetter('_materials'));
   //    o._bones             = MO.Class.register(o, new MO.AGetter('_bones'));
   //    //..........................................................
   //    // @method
   //    o.setup              = MO.Method.empty;
   //    // @method
   //    o.testReady          = MO.Method.emptyTrue;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 构造变量
      this.outline = new SOutline3d();
      this.calculateMatrix = new SMatrix3d();
      this.materialReference = this;
   }

   //==========================================================
   // <T>关联图形环境。</T>
   //
   // @param context 图形环境
   //==========================================================
   public linkGraphicContext(context) {
      RAssert.debugNotNull(context);
      this.graphicContext = context;
   }

   //==========================================================
   // <T>获得激活效果器。</T>
   //
   // @method
   // @return FG3dEffect 效果器
   //==========================================================
   public activeEffect() {
      var info = this.activeInfo;
      return info ? info.effect : null;
   }

   //==========================================================
   // <T>根据名称查找效果器。</T>
   //
   // @method
   // @param code 代码
   // @return FG3dEffect 效果器
   //==========================================================
   public effectFind(code: string) {
      RAssert.debugNotEmpty(code);
      var infos = this.infos;
      if (infos) {
         var info = infos.get(code);
         if (info) {
            return info.effect;
         }
      }
      return null;
   }

   //==========================================================
   // <T>设置一个效果器。</T>
   //
   // @method
   // @param code 代码
   // @param effect:FG3dEffect 效果器
   //==========================================================
   public effectSet(code: string, effect) {
      RAssert.debugNotEmpty(code);
      RAssert.debugNotNull(effect);
      var infos = this.infos;
      if (!infos) {
         infos = this.infos = new FDictionary<SRenderableInfo>();
      }
      var info = infos.get(code);
      if (!info) {
         info = new SRenderableInfo();
         infos.set(code, info)
      }
      info.effect = effect;
   }

   //==========================================================
   // <T>选中一个信息。</T>
   //
   // @method
   // @param code 名称
   // @return SG3dRenderableInfo 信息
   //==========================================================
   public selectInfo(code: string) {
      RAssert.debugNotEmpty(code);
      var infos = this.infos;
      if (!infos) {
         infos = this.infos = new FDictionary<SRenderableInfo>();
      }
      var info = infos.get(code);
      if (!info) {
         info = new SRenderableInfo();
         infos.set(code, info)
      }
      this.activeInfo = info;
      return info;
   }

   //==========================================================
   // <T>重置所有信息。</T>
   //
   // @method
   //==========================================================
   public resetInfos() {
      var infos = this.infos;
      if (infos) {
         var count = infos.count();
         for (var i = 0; i < count; i++) {
            var info = infos.at(i);
            info.reset();
         }
      }
   }

   // //==========================================================
   // // <T>测试可见性。</T>
   // //
   // // @method
   // // @return Boolean 可见性
   // //==========================================================
   // public testVisible() {
   //     var o = this;
   //     // 测试准备好
   //     var ready = o.testReady();
   //     if (!ready) {
   //         return false;
   //     }
   //     // 测试可见性
   //     var visible = o.__base.FRenderable.testVisible.call(o);
   //     if (!visible) {
   //         return false;
   //     }
   //     // 测试轮廓可见
   //     if (!o._outlineVisible) {
   //         return false;
   //     }
   //     // 测试模式时候，可见性依赖材质
   //     var material = o._material;
   //     if (material) {
   //         if (!material.testVisible()) {
   //             return false;
   //         }
   //     }
   //     return true;
   // }

   //==========================================================
   // <T>根据代码查找顶点缓冲。</T>
   //
   // @param code 代码
   // @return 顶点缓冲
   //==========================================================
   public findVertexBuffer(code: string): FVertexBuffer {
      return this.vertexBuffers.get(code);
   }

   //==========================================================
   // <T>增加一个顶点缓冲。</T>
   //
   // @method
   // @return buffer 顶点缓冲
   //==========================================================
   public pushVertexBuffer(buffer: FVertexBuffer): void {
      RAssert.debugNotNull(buffer);
      // 检查参数
      var code = buffer.code;
      RAssert.debugNotEmpty(code);
      // 获得集合
      var buffers = this.vertexBuffers;
      if (!buffers) {
         buffers = this.vertexBuffers = new FDictionary<FVertexBuffer>();
      }
      // 设置缓冲
      buffers.set(code, buffer);
   }

   //==========================================================
   // <T>增加一个索引缓冲。</T>
   //
   // @method
   // @return buffer:FG3dIndexBuffer 顶点缓冲
   //==========================================================
   public pushIndexBuffer(buffer) {
      // 获得集合
      var buffers = this.indexBuffers;
      if (!buffers) {
         buffers = this.indexBuffers = new FObjects<FIndexBuffer>();
      }
      // 设置缓冲
      buffers.push(buffer);
   }

   // //==========================================================
   // // <T>增加一个材质。</T>
   // //
   // // @method
   // // @return material 材质
   // //==========================================================
   // public pushMaterial(material) {
   //     var o = this;
   //     var materials = o._materials;
   //     if (!materials) {
   //         materials = o._materials = new MO.TObjects();
   //     }
   //     materials.push(material);
   // }

   //==========================================================
   // <T>根据名称查找纹理。</T>
   //
   // @method
   // @param name:String 名称
   // @return FRenderIndexBuffer 纹理
   //==========================================================
   public findTexture(name) {
      return this.textures.get(name);
   }

   //==========================================================
   // <T>增加一个纹理。</T>
   //
   // @param code 代码
   // @param texture 纹理
   //==========================================================
   public pushTexture(code, texture) {
      RAssert.debugNotEmpty(code);
      RAssert.debugNotNull(texture);
      var textures = this.textures;
      if (!textures) {
         textures = this.textures = new FDictionary();
      }
      // 增加纹理
      textures.set(code, texture);
   }

   //==========================================================
   // <T>更新处理。</T>
   //
   // @param region 区域
   // @return 处理结果
   //==========================================================
   public update(region: FRegion): boolean {
      var result = super.update(region);
      // 计算矩阵
      var calculateMatrix = this.calculateMatrix;
      calculateMatrix.assign(this.matrix);
      // 计算显示矩阵
      var display = this.parent;
      if (display) {
         calculateMatrix.append(display.currentMatrix);
      }
      // 接收数据
      var changed = this.currentMatrix.attachData(calculateMatrix.data());
      if (changed && region) {
         region.change();
      }
      return result;
   }

   // //==========================================================
   // // <T>移除处理。</T>
   // //
   // // @method
   // //==========================================================
   // public remove() {
   //     var o = this;
   //     var display = o._display;
   //     if (display) {
   //         display.removeRenderable(o);
   //         o._display = null;
   //     }
   // }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      // 释放属性
      this.graphicContext = null;
      this.activeInfo = null;
      this.infos = RObject.dispose(this.infos, true);
      this.vertexBuffers = RObject.dispose(this.vertexBuffers);
      this.indexBuffers = RObject.dispose(this.indexBuffers);
      // 父处理
      super.dispose();
   }
}
