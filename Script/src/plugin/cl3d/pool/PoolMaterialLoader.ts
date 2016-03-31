import {Fatal} from '../../../runtime/common/lang/Fatal';
import {Linker} from '../../../runtime/common/reflect/Linker';
import {ProcessLoader} from '../../../runtime/core/service/ProcessLoader';
import {Material} from '../../../runtime/graphic/material/Material';
import {MaterialResource} from '../resource/MaterialResource';
import {PoolMaterialService} from './PoolMaterialService';

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
   // 纹理缓冲服务
   @Linker(PoolMaterialService)
   public _materialService: PoolMaterialService;

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
            var material: any = this._materialService.create(resource.className);
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