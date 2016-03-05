import {EScope} from '../../common/lang/EScope';
import {FObjectPool} from '../../common/lang/FObjectPool';
import {RClass} from '../../common/reflect/RClass';
import {EHttpContent} from '../../common/net/EHttpContent';
import {FHttpConnection} from '../../common/net/FHttpConnection';
import {FConsole} from '../FConsole';

//==========================================================
// <T>页面数据通讯的控制台。</T>
//
// @console
// @author maocy
// @version 150104
//==========================================================
export class FHttpConsole extends FConsole {
   //..........................................................
   // @attribute
   public _scopeCd = EScope.Local;
   // @attribute
   public _pool: FObjectPool = null;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置变量
      this._pool = RClass.create(FObjectPool);
   }

   //==========================================================
   // <T>加载事件完成后，响应的处理。</T>
   //
   // @method
   // @param connection:FHttpConnection 网络链接
   //==========================================================
   public onComplete(event) {
      var connection = event.connection;
      this._pool.free(connection);
   }

   //==========================================================
   // <T>创建一个网络链接。</T>
   //
   // @method
   // @return 网络链接
   //==========================================================
   public create() {
      return RClass.create(FHttpConnection);
   }

   //==========================================================
   // <T>收集一个新的未使用的节点链接。</T>
   //
   // @method
   // @param clazz 类型
   // @return 节点链接
   //==========================================================
   public alloc(clazz: Function = null): any {
      var pool = this._pool;
      // 查找一个未使用的节点链接
      if (!pool.hasFree()) {
         this._pool.push(this.create());
      }
      // 收集对象
      var connection = pool.alloc();
      connection.reset();
      connection.addCompleteListener(this, this.onComplete);
      return connection;
   }

   //==========================================================
   // <T>释放一个未使用的节点链接。</T>
   //
   // @method
   // @param connection:FHttpConnection 节点链接
   //==========================================================
   public free(connection) {
      this._pool.free(connection);
   }

   //==========================================================
   // <T>发送一个同步数据请求，返回请求数据。</T>
   //
   // @method
   // @param url:String 发送地址
   // @param data:Object 发送数据
   // @return FHttpConnection 链接对象
   //==========================================================
   public sendSync(url, data) {
      var connection = this.alloc();
      connection._asynchronous = false;
      connection.send(url, data);
      return connection.content();
   }

   //==========================================================
   // <T>发送一个异步数据请求。</T>
   //
   // @method
   // @param url:String 发送地址
   // @param data:Object 发送数据
   // @return FHttpConnection 链接对象
   //==========================================================
   public sendAsync(url, data) {
      var connection = this.alloc();
      connection._asynchronous = true;
      connection.send(url, data);
      return connection;
   }

   //==========================================================
   // <T>发送一个同步文本请求，返回请求文本。</T>
   //
   // @method
   // @param url:String 发送地址
   // @param data:Object 发送数据
   // @return FHttpConnection 链接对象
   //==========================================================
   public fetchSync(url, data) {
      var connection = this.alloc();
      connection._asynchronous = false;
      connection._contentCd = EHttpContent.Text;
      connection.send(url, data);
      return connection.content();
   }

   //==========================================================
   // <T>发送一个异步文本请求。</T>
   //
   // @method
   // @param url:String 发送地址
   // @param data:Object 发送数据
   // @return FHttpConnection 链接对象
   //==========================================================
   public fetchAsync(url, data) {
      var connection = this.alloc();
      connection._asynchronous = true;
      connection._contentCd = EHttpContent.Text;
      connection.send(url, data);
      return connection;
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      super.dispose();
   }
}
