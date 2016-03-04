import {FG3dObject} from './FG3dObject';
import {EG3dTexture} from './EG3dTexture';
import {EG3dSamplerFilter} from './EG3dSamplerFilter';

//==========================================================
// <T>渲染纹理。</T>
//
// @author maocy
// @history 141230
//==========================================================
export class FG3dTexture extends FG3dObject {
   // @attribute
   //_code = MO.Class.register(o, new MO.AGetSet('_code'));
   _code = null;
   //_textureCd = MO.Class.register(o, new MO.AGetter('_textureCd'), MO.EG3dTexture.Unknown);
   _textureCd = EG3dTexture.Unknown;
   //_filterMinCd = MO.Class.register(o, new MO.AGetSet('_filterMinCd'), MO.EG3dSamplerFilter.Linear);
   _filterMinCd = EG3dSamplerFilter.Linear;
   //_filterMagCd = MO.Class.register(o, new MO.AGetSet('_filterMagCd'), MO.EG3dSamplerFilter.Linear);
   _filterMagCd = EG3dSamplerFilter.Linear;
   //_wrapS = MO.Class.register(o, new MO.AGetSet('_wrapS'), MO.EG3dSamplerFilter.Unknown);
   _wrapS = EG3dSamplerFilter.Unknown;
   //_wrapT = MO.Class.register(o, new MO.AGetSet('_wrapT'), MO.EG3dSamplerFilter.Unknown);
   _wrapT = EG3dSamplerFilter.Unknown;
   // @attribute
   _statusLoad = false;
   //..........................................................
   // @method
   //isValid      = MO.Method.virtual(o, 'isValid');

   //==========================================================
   // <T>设置取样。</T>
   //
   // @method
   // @param minCd:EG3dSamplerFilter 最小取样
   // @param magCd:EG3dSamplerFilter 最大取样
   //==========================================================
   public setFilterCd(minCd, magCd) {
      this._filterMinCd = minCd;
      this._filterMagCd = magCd;
   }

   //==========================================================
   // <T>设置卷动。</T>
   //
   // @method
   // @param wrapS:EG3dSamplerFilter S卷动
   // @param wrapT:EG3dSamplerFilter T卷动
   //==========================================================
   public setWrapCd(wrapS, wrapT) {
      this._wrapS = wrapS;
      this._wrapT = wrapT;
   }
}