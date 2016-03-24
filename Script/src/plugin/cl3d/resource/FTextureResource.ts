import {ServiceUtil} from '../../../runtime/core/ServiceUtil';
import {FImage} from '../../../runtime/ui/resource/FImage';
import {FImageConsole} from '../../../runtime/ui/resource/FImageConsole';
import {FResource} from './FResource';

//==========================================================
// <T>资源主题管理器。</T>
//
// @class
// @author maocy
// @history 150302
//==========================================================
export class FTextureResource extends FResource {
   // @attribute
   //_dataCompress = true;
   // @attribute
   //_bitmaps = MO.Class.register(o, new MO.AGetter('_bitmaps'));
   //_bitmapPacks = MO.Class.register(o, new MO.AGetter('_bitmapPacks'));
   public url: string;
   public image: FImage;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
   }

   //==========================================================
   // <T>测试是否准备好。</T>
   //
   // @return 是否准备好
   //==========================================================
   public testReady() {
      return this.image.testReady();
   }

   //==========================================================
   // <T>从输入流里反序列化信息内容</T>
   //
   // @param p:input:FByteStream 数据流
   // @return 处理结果
   //==========================================================
   public load() {
      var imageConsole: FImageConsole = ServiceUtil.find(FImageConsole);
      this.image = imageConsole.load(this.url);
   }

   //==========================================================
   // <T>从输入流里反序列化信息内容</T>
   //
   // @param p:input:FByteStream 数据流
   // @return 处理结果
   //==========================================================
   // public unserialize(input) {
   //    // super.unserialize(input);
   //    // // 读取纹理位图集合
   //    // var c = input.readInt16();
   //    // if (c > 0) {
   //    //    var s = this._bitmaps = new MO.TDictionary();
   //    //    for (var i = 0; i < c; i++) {
   //    //       var b = MO.Class.create(FE3sTextureBitmap);
   //    //       b.unserialize(input);
   //    //       s.set(b.code(), b);
   //    //    }
   //    // }
   //    // // 输出纹理位图打包集合
   //    // var c = input.readInt16();
   //    // if (c > 0) {
   //    //    var s = this._bitmapPacks = new MO.TDictionary();
   //    //    for (var i = 0; i < c; i++) {
   //    //       var b = MO.Class.create(FE3sTextureBitmapPack);
   //    //       b._texture = this;
   //    //       b.unserialize(input);
   //    //       s.set(b.code(), b);
   //    //    }
   //    // }
   // }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      // this._bitmaps = MO.Lang.Object.free(this._bitmaps);
      // this._bitmapPacks = MO.Lang.Object.free(this._bitmapPacks);
      // // 父处理
      super.dispose();
   }
}