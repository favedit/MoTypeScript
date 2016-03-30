import {Fatal} from '../../../runtime/common/lang/Fatal';
import {ProcessLoader} from '../../../runtime/core/service/ProcessLoader';
import {Material} from '../../../runtime/graphic/material/Material';
import {PhongMaterial} from '../../material/PhongMaterial';
import {ParallaxMaterial} from '../../material/ParallaxMaterial';
import {MaterialResource} from '../../resource/MaterialResource';

//==========================================================
// <T>材质加载器。</T>
//
// @author maocy
// @history 160323
//==========================================================
export class PoolMaterialLoader extends ProcessLoader {
   // 图形环境
   public graphicContext;
   // 资源
   public resource: MaterialResource;
   // 材质
   public material: Material;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
   }

   //==========================================================
   // <T>处理加载</T>
   //
   // @param 处理结果
   //==========================================================
   public processLoad(): boolean {
      var ready = this.ready;
      if (!ready) {
         var resource = this.resource;
         if (resource.testReady()) {
            // 创建材质
            var material = null;
            if (resource.className == 'PhongMaterial') {
               material = new PhongMaterial();
            } else if (resource.className == 'ParallaxMaterial') {
               material = new ParallaxMaterial();
            } else {
               throw new Fatal(this, 'Unknown material.');
            }
            material.linkGraphicContext(this.graphicContext);
            material.loadResource(resource);
            // 加载完成
            this.material = material;
            this.ready = true;
         }
      }
      return ready;
   }
}