import {ObjectUtil} from '../../../runtime/common/lang/ObjectUtil';
import {Dictionary} from '../../../runtime/common/lang/Dictionary';
import {AssertUtil} from '../../../runtime/common/AssertUtil';
import {GraphicObject} from '../core/GraphicObject';
import {Texture} from './Texture';

//==========================================================
// <T>基础渲染材质。</T>
//
// @author maocy
// @history 150107
//==========================================================
export class Material extends GraphicObject {
   // 代码
   public code: string;
   // 名称
   public name: string;
   // 脏标志
   public dirty: boolean;
   // 效果器代码
   public effectCode: string;
   // 效果器
   public effect: any;
   // 渲染器代码
   public renderCode: string;
   // 配置深度检查
   public optionDepth: boolean;
   // 配置深度写入
   public optionDepthWrite: boolean;
   // 配置双面
   public optionDouble: boolean;
   // 配置信息
   public optionAlpha: boolean;
   // 纹理集合
   public textures: Dictionary<Texture>;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this.effectCode = 'automatic';
      this.optionDepth = true;
      this.optionDepthWrite = true;
      this.optionDouble = false;
      this.optionAlpha = false;
      this.dirty = true;
      this.textures = new Dictionary<Texture>();
   }

   //==========================================================
   // <T>根据代码查找纹理。</T>
   //
   // @param code 名称
   // @return 纹理
   //==========================================================
   public findTexture(code: string): Texture {
      var texture: Texture = null;
      var textures = this.textures;
      if (textures) {
         texture = textures.get(code);
      }
      return texture;
   }

   //==========================================================
   // <T>设置一个纹理。</T>
   //
   // @param code 代码
   // @param texture 纹理
   //==========================================================
   public setTexture(code: string, texture: Texture) {
      AssertUtil.debugNotEmpty(code);
      AssertUtil.debugNotNull(texture);
      var textures = this.textures;
      if (!textures) {
         textures = this.textures = new Dictionary<Texture>();
      }
      // 增加纹理
      textures.set(code, texture);
   }

   //==========================================================
   // <T>重置内容。</T>
   //==========================================================
   public reset() {
      this.optionDepth = true;
      this.optionDepthWrite = true;
      this.optionDouble = false;
      this.optionAlpha = false;
   }

   //==========================================================
   // <T>更新处理。</T>
   //==========================================================
   public update() {
      this.dirty = true;
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose(): void {
      // 释放属性
      this.effect = ObjectUtil.dispose(this.effect);
      this.textures = ObjectUtil.dispose(this.textures);
      // 父处理
      super.dispose();
   }
}
