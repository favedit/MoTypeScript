import {Objects} from '../../../runtime/common/lang/Objects';
import {Dictionary} from '../../../runtime/common/lang/Dictionary';
import {ObjectUtil} from '../../../runtime/common/lang/ObjectUtil';
import {ObjectIdUtil} from '../../../runtime/common/lang/ObjectIdUtil';
import {Outline3d} from '../../../runtime/common/math/Outline3d';
import {AssertUtil} from '../../../runtime/common/AssertUtil';
import {SMatrix3d} from '../../../runtime/graphic/math/SMatrix3d';
import {IRenderable} from '../../../runtime/graphic/IRenderable';
import {FGraphicContext} from '../../../runtime/graphic/core/FGraphicContext';
import {FMaterial} from '../../../runtime/graphic/material/FMaterial';
import {IndexBuffer} from '../graphic/IndexBuffer';
import {VertexBuffer} from '../graphic/VertexBuffer';
import {RenderableInfo} from './RenderableInfo';
import {Drawable} from './Drawable';
import {Display} from './Display';
import {Region} from './Region';

//==========================================================
// <T>可绘制对象。</T>
//
// @author maocy
// @history 150312
//==========================================================
export class Renderable extends Drawable implements IRenderable {
   // 选取设置
   public optionSelect: boolean;
   // 外轮廓
   public outline: Outline3d;
   // 未定材质
   public peddingMaterial: FMaterial;
   // 材质
   public material: FMaterial;
   // 参考材质
   public materialReference: any;
   // 资源
   public resource: any;
   // 计算矩阵
   public calculateMatrix: SMatrix3d;
   // 顶点数量
   public vertexCount: number;
   // 顶点缓冲集合
   public vertexBuffers: Dictionary<VertexBuffer>;
   // 索引缓冲集合
   public indexBuffers: Objects<IndexBuffer>;
   // 纹理集合
   // public textures: FDictionary<any>;
   // 激活信息
   public activeInfo: RenderableInfo;
   // 信息集合
   public _infos: Dictionary<RenderableInfo>;
   //..........................................................
   // 轮廓可见性
   // public outlineVisible = true;
   //    o._display           = MO.Class.register(o, new MO.AGetSet('_display'));
   //public optionMerge = false;
   //public optionFull = false;
   //    o._materials         = MO.Class.register(o, new MO.AGetter('_materials'));
   //    o._bones             = MO.Class.register(o, new MO.AGetter('_bones'));
   //    //..........................................................
   //    // @method
   //    o.setup              = MO.Method.empty;
   //    // @method
   //    o.testReady          = MO.Method.emptyTrue;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      // 构造变量
      this.id = ObjectIdUtil.nextId('renderable');
      this.optionSelect = true;
      this.outline = new Outline3d();
      this.calculateMatrix = new SMatrix3d();
      this.vertexCount = 0;
      this.materialReference = this;
      this._infos = new Dictionary<RenderableInfo>();
   }

   //==========================================================
   // <T>测试准备好。</T>
   //
   // @return 准备好。
   //==========================================================
   public testReady(): boolean {
      return true;
   }

   //==========================================================
   // <T>测试可见性。</T>
   //
   // @return 可见性
   //==========================================================
   public testVisible(): boolean {
      // 测试准备好
      var ready = this.testReady();
      if (!ready) {
         return false;
      }
      // 测试可见性
      var visible = super.testVisible();
      if (!visible) {
         return false;
      }
      // 测试轮廓可见
      //if (!this._outlineVisible) {
      //   return false;
      //}
      // 测试模式时候，可见性依赖材质
      //var material = this._material;
      //if (material) {
      //   if (!material.testVisible()) {
      //      return false;
      //   }
      //}
      return true;
   }

   //==========================================================
   // <T>获得激活效果器。</T>
   //
   // @return 效果器
   //==========================================================
   public activeEffect() {
      var info = this.activeInfo;
      return info ? info.effect : null;
   }

   //==========================================================
   // <T>根据名称查找效果器。</T>
   //
   // @param code 代码
   // @return 效果器
   //==========================================================
   public effectFind(code: string) {
      AssertUtil.debugNotEmpty(code);
      var infos = this._infos;
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
   // @param code 代码
   // @param effect 效果器
   //==========================================================
   public effectSet(code: string, effect) {
      AssertUtil.debugNotEmpty(code);
      AssertUtil.debugNotNull(effect);
      var infos = this._infos;
      if (!infos) {
         infos = this._infos = new Dictionary<RenderableInfo>();
      }
      var info = infos.get(code);
      if (!info) {
         info = new RenderableInfo();
         infos.set(code, info)
      }
      info.effect = effect;
   }

   //==========================================================
   // <T>选中一个信息。</T>
   //
   // @param code 名称
   // @return 信息
   //==========================================================
   public selectInfo(code: string): RenderableInfo {
      AssertUtil.debugNotEmpty(code);
      var infos = this._infos;
      if (!infos) {
         infos = this._infos = new Dictionary<RenderableInfo>();
      }
      var info = infos.get(code);
      if (!info) {
         info = new RenderableInfo();
         infos.set(code, info)
      }
      this.activeInfo = info;
      return info;
   }

   //==========================================================
   // <T>重置所有信息。</T>
   //==========================================================
   public resetInfos() {
      var infos = this._infos;
      if (infos) {
         var count = infos.count();
         for (var i = 0; i < count; i++) {
            var info = infos.at(i);
            info.reset();
         }
      }
   }

   //==========================================================
   // <T>计算轮廓大小。</T>
   //
   // @return 轮廓
   //==========================================================
   public calculateOutline(): Outline3d {
      var outline = this.outline;
      // TODO:
      return outline;
   }

   //==========================================================
   // <T>根据代码查找顶点缓冲。</T>
   //
   // @param code 代码
   // @return 顶点缓冲
   //==========================================================
   public findVertexBuffer(code: string): VertexBuffer {
      return this.vertexBuffers.get(code);
   }

   //==========================================================
   // <T>增加一个顶点缓冲。</T>
   //
   // @return buffer 顶点缓冲
   //==========================================================
   public pushVertexBuffer(buffer: VertexBuffer): void {
      AssertUtil.debugNotNull(buffer);
      // 检查参数
      var code = buffer.code;
      AssertUtil.debugNotEmpty(code);
      // 获得集合
      var buffers = this.vertexBuffers;
      if (!buffers) {
         buffers = this.vertexBuffers = new Dictionary<VertexBuffer>();
      }
      // 设置缓冲
      buffers.set(code, buffer);
   }

   //==========================================================
   // <T>增加一个索引缓冲。</T>
   //
   // @return buffer 索引缓冲
   //==========================================================
   public pushIndexBuffer(buffer: IndexBuffer): void {
      AssertUtil.debugNotNull(buffer);
      // 获得集合
      var buffers = this.indexBuffers;
      if (!buffers) {
         buffers = this.indexBuffers = new Objects<IndexBuffer>();
      }
      // 设置缓冲
      buffers.push(buffer);
   }

   //==========================================================
   // <T>更新处理。</T>
   //
   // @param region 区域
   // @return 处理结果
   //==========================================================
   public update(region: Region): boolean {
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

   //==========================================================
   // <T>脱除处理。</T>
   //==========================================================
   public drop() {
      var display = this.parent;
      if (display instanceof Display) {
         display.removeRenderable(this);
         this.parent = null;
      }
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      // 释放属性
      this.activeInfo = null;
      this._infos = ObjectUtil.dispose(this._infos, true);
      this.vertexBuffers = ObjectUtil.dispose(this.vertexBuffers);
      this.indexBuffers = ObjectUtil.dispose(this.indexBuffers);
      // 父处理
      super.dispose();
   }
}
