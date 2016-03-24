import {ServiceUtil} from '../../../runtime/core/ServiceUtil';
import {Region} from '../../base/Region';
import {TechniqueService} from '../TechniqueService';
import {GeneralTechnique} from '../GeneralTechnique';
import {ShadowTechnique} from '../ShadowTechnique';
import {SelectTechnique} from '../SelectTechnique';
import {Pipeline} from './Pipeline';

//==========================================================
// <T>渲染属性类型枚举。</T>
//
// @enum
// @author maocy
// @version 141230
//==========================================================
export class ForwardPipeline extends Pipeline {
   // 阴影标志
   protected _optionShadow: boolean;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
   }

   //==========================================================
   // <T>配置处理。</T>
   //==========================================================
   public setup() {
      super.setup();
      // 设置渲染区域
      this.region = new Region();
      this.optionShadow = false;
      // 设置渲染技术
      var techniqueConsole: TechniqueService = ServiceUtil.find(TechniqueService);
      this.selectTechnique = <SelectTechnique>techniqueConsole.find(this._graphicContext, SelectTechnique);
   }

   //==========================================================
   // <T>获得阴影标志。</T>
   //==========================================================
   public get optionShadow() {
      return this._optionShadow;
   }

   //==========================================================
   // <T>设置阴影标志。</T>
   //==========================================================
   public set optionShadow(value) {
      this._optionShadow = value;
      // 设置渲染技术
      var techniqueConsole: TechniqueService = ServiceUtil.find(TechniqueService);
      var techniqueClass = value ? ShadowTechnique : GeneralTechnique;
      this.drawTechnique = techniqueConsole.find(this._graphicContext, techniqueClass);
   }
}
