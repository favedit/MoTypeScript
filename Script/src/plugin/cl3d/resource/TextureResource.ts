import {Linker} from '../../../runtime/common/reflect/Linker';
import {AssertUtil} from '../../../runtime/common/AssertUtil';
import {ImageResource} from '../../../runtime/ui/resource/ImageResource';
import {ImageResourceService} from '../../../runtime/ui/resource/ImageResourceService';
import {Resource} from './Resource';

//==========================================================
// <T>资源主题管理器。</T>
//
// @class
// @author maocy
// @history 150302
//==========================================================
export class TextureResource extends Resource {
   // 网络地址
   public url: string;
   // 位图
   public image: ImageResource;
   // 位图资源服务
   @Linker(ImageResourceService)
   protected _imageResourceService: ImageResourceService;

   //==========================================================
   // <T>测试是否准备好。</T>
   //
   // @return 是否准备好
   //==========================================================
   public testReady() {
      return this.image.testReady();
   }

   //==========================================================
   // <T>加载处理。</T>
   //==========================================================
   public load() {
      AssertUtil.debugNull(this.image);
      this.image = this._imageResourceService.load(this.url);
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      this.image = null;
      // // 父处理
      super.dispose();
   }
}