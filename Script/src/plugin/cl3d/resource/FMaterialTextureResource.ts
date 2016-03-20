import {RConsole} from '../../runtime/core/RConsole';
import {FTextureResource} from './FTextureResource';
import {FTextureResourceConsole} from './FTextureResourceConsole';

export class FMaterialTextureResource {

   public code: string;
   public type: string;
   public src: string;
   public coord: string;
   public rate: string;

   public textureResource:FTextureResource;

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
      var textureResourceConsole: FTextureResourceConsole = RConsole.find(FTextureResourceConsole);
      this.textureResource = textureResourceConsole.loadByUrl(this.src);
   }
}
