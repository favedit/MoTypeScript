import {RObject} from '../../../runtime/common/lang/RObject';
import {FDictionary} from '../../../runtime/common/lang/FDictionary';
import {FGraphicObject} from '../core/FGraphicObject';
import {FTexture} from './FTexture';

//==========================================================
// <T>基础渲染材质。</T>
//
// @author maocy
// @history 150107
//==========================================================
export class FMaterial extends FGraphicObject {
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
   public textures: FDictionary<FTexture>;

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
   }

   //==========================================================
   // <T>获得纹理集合。</T>
   //
   // @method
   // @return 纹理集合
   //==========================================================
   public setTexture(code, texture) {
      var textures = this.textures;
      if (!textures) {
         textures = this.textures = new FDictionary<FTexture>();
      }
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
      this.effect = RObject.dispose(this.effect);
      this.textures = RObject.dispose(this.textures);
      // 父处理
      super.dispose();
   }
}
