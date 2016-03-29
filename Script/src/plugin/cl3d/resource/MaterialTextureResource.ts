import {ServiceUtil} from '../../runtime/core/ServiceUtil';
import {TextureResource} from './TextureResource';
import {TextureResourceConsole} from './TextureResourceConsole';

export class MaterialTextureResource {

   public code: string;
   public type: string;
   public src: string;
   public coord: string;
   public rate: string;

   public textureResource:TextureResource;

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
   // @param jconfig 配置
   //==========================================================
   public loadConfig(jconfig: any) {
      // 加载设置
      this.code = jconfig.code;
      this.type = jconfig.type;
      this.src = jconfig.src;
      this.coord = jconfig.coord;
      this.rate = jconfig.rate;
      // 加载纹理
      var textureResourceConsole: TextureResourceConsole = ServiceUtil.find(TextureResourceConsole);
      this.textureResource = textureResourceConsole.loadByUrl(this.src);
   }
}
