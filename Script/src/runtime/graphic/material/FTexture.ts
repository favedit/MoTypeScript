import {ESamplerFilter} from '../base/ESamplerFilter';
import {FGraphicObject} from '../core/FGraphicObject';
import {ETexture} from './ETexture';

//==========================================================
// <T>渲染纹理。</T>
//
// @author maocy
// @history 141230
//==========================================================
export class FTexture extends FGraphicObject {
   // 代码
   public code = null;
   // 纹理类型
   public textureCd = ETexture.Unknown;
   // MIN取样
   public filterMinCd = ESamplerFilter.Linear;
   // MAG取样
   public filterMagCd = ESamplerFilter.Linear;
   // S缠绕
   public wrapS = ESamplerFilter.Unknown;
   // T缠绕
   public wrapT = ESamplerFilter.Unknown;
   // 加载状态
   public statusLoad = false;

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
}