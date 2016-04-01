import {ServiceUtil} from '../../../runtime/core/ServiceUtil';
import {Region} from '../../base/Region';
import {DeferredTechnique} from '../DeferredTechnique';
import {SelectTechnique} from '../SelectTechnique';
import {TechniqueService} from '../TechniqueService';
import {Pipeline} from './Pipeline';

//==========================================================
// <T>渲染属性类型枚举。</T>
//
// @enum
// @author maocy
// @version 141230
//==========================================================
export class DeferredPipeline extends Pipeline {

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
      // 设置渲染技术
      var techniqueConsole: TechniqueService = ServiceUtil.find(TechniqueService);
      this.drawTechnique = techniqueConsole.find(this.graphicContext, DeferredTechnique);
      this.selectTechnique = <SelectTechnique>techniqueConsole.find(this.graphicContext, SelectTechnique);
   }
}
