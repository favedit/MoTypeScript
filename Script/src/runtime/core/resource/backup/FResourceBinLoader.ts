import {FDataView} from '../../common/io/FDataView';
import {FResourceLoader} from './FResourceLoader';
import {RClass} from '../../common/reflect/RClass';

//==========================================================
// <T>资源BIN加载器。</T>
//
// @class
// @author maocy
// @version 160122
//==========================================================
export class FResourceBinLoader extends FResourceLoader {

   //==========================================================
   // <T>加载完成处理。</T>
   //
   // @method
   //==========================================================
   public onLoad(event) {
      var o = this;
      var content = event.content;
      // 创建读取流
      var view = RClass.create(FDataView);
      view.setEndianCd(true);
      view.link(content);
      // 反序列化数据
      //o._resource.unserialize(view);
      // 释放资源
      view.dispose();
      // 完成处理
      //o.complete();
   }

   //==========================================================
   // <T>加载处理。</T>
   //
   // @method
   //==========================================================
   public load() {
      var o = this;
      //o.__base.FResourceLoader.load.call(o);
      // 加载处理
      //var connection = MO.Console.find(MO.FHttpConsole).send(o._url);
      //connection.addLoadListener(o, o.onLoad);
   }
}
