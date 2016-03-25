import {ESamplerFilter} from '../base/ESamplerFilter';
import {GraphicObject} from '../core/GraphicObject';
import {ETexture} from './ETexture';
import {TextureFormatEnum} from './TextureFormatEnum';

//==========================================================
// <T>渲染纹理。</T>
//
// @author maocy
// @history 141230
//==========================================================
export class FTexture extends GraphicObject {
   // 代码
   public code: string;
   // 纹理类型
   public textureCd: ETexture;
   // MIN取样
   public filterMinCd: ESamplerFilter;
   // MAG取样
   public filterMagCd: ESamplerFilter;
   // S缠绕
   public wrapS: ESamplerFilter;
   // T缠绕
   public wrapT: ESamplerFilter;
   // 格式类型
   public formatCd: TextureFormatEnum;
   // 加载状态
   public statusLoad: boolean;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      // 设置属性 
      this.filterMinCd = ESamplerFilter.Linear;
      this.filterMagCd = ESamplerFilter.Linear;
      this.wrapS = ESamplerFilter.Repeat;
      this.wrapT = ESamplerFilter.Repeat;
      this.formatCd = TextureFormatEnum.UnsignedByte;
   }

   //==========================================================
   // <T>判断是否有效</T>
   //
   // @return 是否有效
   //==========================================================
   public isValid(): boolean {
      return true;
   }

   //==========================================================
   // <T>设置取样。</T>
   //
   // @method
   // @param minCd MIN取样
   // @param magCd MAG取样
   //==========================================================
   public setFilterCd(minCd, magCd) {
      this.filterMinCd = minCd;
      this.filterMagCd = magCd;
   }

   //==========================================================
   // <T>设置卷动。</T>
   //
   // @method
   // @param wrapS S缠绕
   // @param wrapT T缠绕
   //==========================================================
   public setWrapCd(wrapS, wrapT) {
      this.wrapS = wrapS;
      this.wrapT = wrapT;
   }

   //==========================================================
   // <T>更新处理。</T>
   //==========================================================
   public update() {
   }
}