import {Fatal} from '../../../runtime/common/lang/Fatal';
import {FProcessLoader} from '../../../runtime/core/console/FProcessLoader';
import {FPhongMaterial} from '../../material/FPhongMaterial';

//==========================================================
// <T>材质加载器。</T>
//
// @author maocy
// @history 160323
//==========================================================
export class FMaterialLoader extends FProcessLoader {
   // 图形环境
   public graphicContext;
   // 资源
   public resource;
   // 材质
   public material;

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
            if (resource.className == 'phong') {
               material = new FPhongMaterial();
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