import {ScopeEnum} from '../../runtime/common/lang/ScopeEnum'
import {Dictionary} from '../../runtime/common/lang/Dictionary'
import {ObjectUtil} from '../../runtime/common/lang/ObjectUtil'
import {Linker} from '../../runtime/common/reflect/Linker'
import {LoggerUtil} from '../../runtime/common/lang/LoggerUtil'
import {Service} from '../../runtime/core/Service'
import {EnvironmentService} from '../../runtime/core/service/EnvironmentService'
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
export class FE3rBitmapConsole extends Service {
   // 位图集合
   protected _bitmaps: Dictionary<FE3rBitmap> = null;
   protected _dataUrl = '/cloud.resource.material.wv'
   // 环境控制台
   @Linker(EnvironmentService)
   protected _environmentConsole: EnvironmentService = null;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this._scopeCd = ScopeEnum.Local;
      this._bitmaps = new Dictionary<FE3rBitmap>();
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
      LoggerUtil.info(this, 'Load bitmap. (url={1})', loadUrl);
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
      LoggerUtil.info(this, 'Load bitmap from url. (url={1})', loadUrl);
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
      this._bitmaps = ObjectUtil.dispose(this._bitmaps);
      // 父处理
      super.dispose();
   }
}