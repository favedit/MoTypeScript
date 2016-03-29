import {ServiceUtil} from '../../runtime/core/ServiceUtil';
import {TextureResource} from './TextureResource';
import {TextureResourceConsole} from './TextureResourceConsole';
import {ResourceObject} from './ResourceObject';

export class MaterialTextureResource extends ResourceObject {
   // 类名称
   public code: string;
   public type: string;
   public src: string;
   public coord: string;
   public rate: string;
   public textureResource: TextureResource;

   //==========================================================
   // <T>测试是否准备好。</T>
   //
   // @return 是否准备好
   //==========================================================
   public testReady() {
      return this.textureResource.testReady();
   }

   //==========================================================
   // <T>从配置里加载信息内容</T>
   //
   // @param config 配置
   //==========================================================
   public loadConfig(config: any) {
      super.loadConfig(config);
      // 加载设置
      this.code = config.code;
      this.type = config.type;
      this.src = config.src;
      this.coord = config.coord;
      this.rate = config.rate;
      // 加载纹理
      var textureResourceConsole: TextureResourceConsole = ServiceUtil.find(TextureResourceConsole);
      this.textureResource = textureResourceConsole.loadByUrl(this.src);
   }
}
