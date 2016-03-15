import {EScope} from '../../runtime/common/lang/EScope'
import {FDictionary} from '../../runtime/common/lang/FDictionary'
import {RObject} from '../../runtime/common/lang/RObject'
import {ALinker} from '../../runtime/common/reflect/ALinker'
import {RLogger} from '../../runtime/common/lang/RLogger'
import {FConsole} from '../../runtime/core/FConsole'
import {FEnvironmentConsole} from '../../runtime/core/console/FEnvironmentConsole'
import {FE3rBitmap} from './FE3rBitmap'
import {FE3rBitmapFlatPack} from './FE3rBitmapFlatPack'
import {FE3rBitmapCubePack} from './FE3rBitmapCubePack'

//==========================================================
// <T>纹理控制台。</T>
//
// @console
// @author maocy
// @version 150106
//==========================================================
export class FE3rBitmapConsole extends FConsole {
   // 位图集合
   protected _bitmaps: FDictionary<FE3rBitmap> = null;
   protected _dataUrl = '/cloud.resource.material.wv'
   // 环境控制台
   @ALinker(FEnvironmentConsole)
   protected _environmentConsole: FEnvironmentConsole = null;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this._scopeCd = EScope.Local;
      this._bitmaps = new FDictionary<FE3rBitmap>();
   }

   //==========================================================
   // <T>加载一个渲染位图。</T>
   //
   // @param context 渲染环境
   // @param guid 材质唯一编号
   // @param code 位图代码
   // @return 渲染位图
   //==========================================================
   public load(context, guid, code) {
      // 查找模型
      var flag = guid + '|' + code;
      var bitmap = this._bitmaps.get(flag);
      if (bitmap) {
         return bitmap;
      }
      // 生成地址
      var loadUrl: string = this._environmentConsole.parse(this._dataUrl);
      // var url = MO.Window.Browser.hostPath(this._dataUrl + '?guid=' + guid + '&code=' + code);
      RLogger.info(this, 'Load bitmap. (url={1})', loadUrl);
      // 加载模型
      var graphic = context.graphicContext();
      if (code == 'environment') {
         bitmap = graphic.createObject(FE3rBitmapCubePack);
      } else {
         bitmap = graphic.createObject(FE3rBitmapFlatPack);
      }
      // bitmap.loadUrl(loadUrl);
      this._bitmaps.set(flag, bitmap);
      return bitmap;
   }

   //==========================================================
   // <T>加载一个模型。</T>
   //
   // @param context 渲染上下文
   // @param url  网络地址
   // @return 渲染位图
   //==========================================================
   public loadUrl(context, url) {
      // 查找图片
      var bitmap = this._bitmaps.get(url);
      if (bitmap) {
         return bitmap;
      }
      // 生成地址
      var loadUrl: string = this._environmentConsole.parse(url);
      RLogger.info(this, 'Load bitmap from url. (url={1})', loadUrl);
      // 创建渲染位图
      //var bitmap = context.createObject(FE3rBitmap);
      //bitmap.loadUrl(url);
      this._bitmaps.set(url, bitmap);
      return bitmap;
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      // 释放处理
      this._bitmaps = RObject.dispose(this._bitmaps);
      // 父处理
      super.dispose();
   }
}