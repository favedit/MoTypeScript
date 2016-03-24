import {FError} from '../../common/lang/FError';
import {LoggerUtil} from '../../common/lang/LoggerUtil';

//==========================================================
// <T>运行信息管理类。</T>
//
// @tool
// @author maocy
// @version 141229
//===========================================================
export class RBrowser {

   public static _hostPath = '';
   public static _contentPath = '';

   //===========================================================
   // <T>日志输出处理。</T>
   //
   // @method
   // @param event:Object 事件信息
   //===========================================================
   public static onLog(event) {
      (console as any).log(event.message);
   }

   //===========================================================
   // <T>获得主机路径。</T>
   //
   // @method
   // @param uri:String 路径
   // @return String 主机路径
   //===========================================================
   public static hostPath(uri) {
      if (uri) {
         return this._hostPath + uri;
      }
      return this._hostPath;
   }

   //===========================================================
   // <T>设置主机路径。</T>
   //
   // @method
   // @param host:String 主机路径
   //===========================================================
   public static setHostPath(host) {
      this._hostPath = host;
   }

   //===========================================================
   // <T>获得内容路径。</T>
   //
   // @method
   // @param uri:String 路径
   // @return String 内容路径
   //===========================================================
   public static contentPath(uri) {
      var o = this;
      if (uri) {
         return o._contentPath + uri;
      }
      return o._contentPath;
   }

   //===========================================================
   // <T>设置内容路径。</T>
   //
   // @method
   // @param path:String 路径
   //===========================================================
   public static setContentPath(path) {
      this._contentPath = path;
   }

   //===========================================================
   // <T>获得浏览器类型。</T>
   //
   // @method
   // @return 浏览器类型
   //===========================================================
   public static typeCd() {
      // return this._typeCd;
   }

   //===========================================================
   // <T>存储设置。</T>
   //
   // @method
   // @param xconfig:TXmlNode 配置节点
   //===========================================================
   public static saveConfig(xconfig) {
      var o = this;
      var xagent = xconfig.create('Agent');
      //xagent.setValue(o._agent);
   }
}
