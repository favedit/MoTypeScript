package org.mo.data.nosql.mongodb;

import org.mo.com.encoding.RMd5;
import org.mo.com.io.FByteStream;
import org.mo.com.lang.FFatalError;
import org.mo.com.lang.RByte;
import org.mo.com.lang.RDateTime;
import org.mo.com.lang.RString;
import org.mo.com.lang.reflect.RClass;
import org.mo.com.logging.ILogger;
import org.mo.com.logging.RLogger;
import org.mo.com.net.EMime;
import org.mo.data.nosql.FNosqlConnection;
import org.mo.data.nosql.FNosqlContent;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;
import com.mongodb.Mongo;

//============================================================
// <T>MongoDB连接。</T>
//============================================================
public class FMongodbConnection
      extends FNosqlConnection
      implements
         IMongodbConnection
{
   // 日志输出接口
   private final static ILogger _logger = RLogger.find(FMongodbConnection.class);

   // 数据库链接
   protected static int _byteLimit = 1024 * 1024 * 16 / 2 - 4096;

   // 数据库链接
   protected static String COLLECTION_FRAGMENT = ".fragment";

   // 数据名称
   protected String _databaseName;

   // 数据库链接
   protected Mongo _connection;

   // 数据库
   protected DB _database;

   //============================================================
   // <T>生成存储文件名称。</T>
   //
   // @param host 主机地址
   // @param port 端口
   // @return 文件名称
   //============================================================
   @SuppressWarnings("deprecation")
   @Override
   public void connect(String host,
                       int port,
                       String databaseName){
      _host = host;
      _port = port;
      _databaseName = databaseName;
      try{
         _connection = new Mongo(host, port);
         _database = _connection.getDB(databaseName);
      }catch(Exception exception){
         throw new FFatalError(exception);
      }
      _logger.debug(this, "connect", "Connect mongodb server. (host={1}, port={2}, database_name={3})", _host, _port, _databaseName);
   }

   //============================================================
   // <T>根据代码获得一个对象。</T>
   // <P>不存在的时候产生例外。</P>
   //
   // @param catalog 目录
   // @param name 查找名称
   // @param value 查找内容
   // @return 对象
   //============================================================
   @Override
   public Object get(String catalog,
                     String name,
                     String value){
      // 获得集合
      DBCollection collection = _database.getCollection(catalog);
      // 查找内容
      DBObject search = new BasicDBObject(name, value);
      // 更新处理
      DBObject item = collection.findOne(search);
      if(item == null){
         throw new FFatalError("Content is not exists. (name={1}, value={2})", name, value);
      }
      return item;
   }

   //============================================================
   // <T>根据代码获得一个对象。</T>
   // <P>不存在的时候返回默认对象。</P>
   //
   // @param catalog 目录
   // @param name 查找名称
   // @param value 查找内容
   // @param defaultValue 默认对象
   // @return 对象
   //============================================================
   @Override
   public Object get(String catalog,
                     String name,
                     String value,
                     Object defaultValue){
      // 获得集合
      DBCollection collection = _database.getCollection(catalog);
      // 查找内容
      DBObject search = new BasicDBObject(name, value);
      // 更新处理
      DBObject item = collection.findOne(search);
      if(item == null){
         return null;
      }
      // 返回对象
      return item;
   }

   //============================================================
   // <T>保存一个存储信息。</T>
   //
   // @param catalog 集合分类
   // @param guid 唯一编号
   // @return 查找结果
   //============================================================
   @Override
   public void set(String catalog,
                   String name,
                   String value,
                   Object item){
   }

   //============================================================
   // <T>查找一个存储内容。</T>
   //
   // @param clazz 类对象
   // @param catalog 目录
   // @param guid 唯一编号
   // @return 存储内容
   //============================================================
   @Override
   public <T extends FNosqlContent> T findContent(Class<T> clazz,
                                                  String catalog,
                                                  String guid){
      // 检查参数
      if(RString.isEmpty(catalog)){
         throw new FFatalError("Parameter catalog is empty.");
      }
      if(RString.isEmpty(guid)){
         throw new FFatalError("Parameter guid is empty.");
      }
      //............................................................
      // 获得集合
      DBCollection collection = _database.getCollection(catalog);
      // 查找内容
      DBObject search = new BasicDBObject("guid", guid);
      // 更新处理
      DBObject item = collection.findOne(search);
      if(item == null){
         return null;
      }
      String code = (String)item.get("code");
      String name = (String)item.get("name");
      String label = (String)item.get("label");
      String date = (String)item.get("date");
      String mime = (String)item.get("mime");
      int size = (int)item.get("size");
      int blockCount = (int)item.get("block");
      String hash = (String)item.get("hash");
      byte[] data = null;
      // 读取分片数据
      if(blockCount > 0){
         DBCollection fragmentCollection = _database.getCollection(catalog + COLLECTION_FRAGMENT);
         FByteStream stream = new FByteStream(size);
         for(int blockIndex = 0; blockIndex < blockCount; blockIndex++){
            String fragmentGuid = guid + "|" + blockIndex;
            DBObject fragmentSearch = new BasicDBObject("guid", fragmentGuid);
            DBObject fragmentFind = fragmentCollection.findOne(fragmentSearch);
            byte[] fragmentData = (byte[])fragmentFind.get("data");
            stream.append(fragmentData);
         }
         data = stream.toArray();
      }else{
         data = (byte[])item.get("data");
      }
      // 返回内容
      T content = RClass.newInstance(clazz);
      content.setGuid(guid);
      content.setCode(code);
      content.setName(name);
      content.setLabel(label);
      content.setDate(date);
      content.setMime(mime);
      content.setHash(hash);
      content.setData(data);
      return content;
   }

   //============================================================
   // <T>保存一个存储内容。</T>
   //
   // @param content 存储内容
   // @return 处理结果
   //============================================================
   @Override
   public boolean storeContent(FNosqlContent content){
      // 检查分类
      String catalog = content.catalog();
      if(RString.isEmpty(catalog)){
         throw new FFatalError("Store content catalog is empty.");
      }
      // 检查唯一编号
      String guid = content.guid();
      if(RString.isEmpty(guid)){
         throw new FFatalError("Store content guid is empty.");
      }
      String code = content.code();
      String name = content.name();
      String label = content.label();
      // 检查类型
      String date = RString.nvl(content.date(), RDateTime.format());
      String mime = RString.nvl(content.mime(), EMime.Bin.mime());
      // 检查数据
      byte[] data = content.data();
      if(data == null){
         throw new FFatalError("Store content data is empty.");
      }
      int size = data.length;
      content.setSize(size);
      // 计算校验内容
      String hash = RMd5.encode(data);
      content.setHash(hash);
      //............................................................
      // 压缩数据
      //FLzmaFile file = new FLzmaFile(data);
      //byte[] lzmaData = file.toLzmaArray();
      //............................................................
      // 获得集合
      DBCollection collection = _database.getCollection(catalog);
      // 新建数据
      DBObject item = new BasicDBObject();
      item.put("guid", guid);
      item.put("code", code);
      item.put("name", name);
      item.put("label", label);
      item.put("date", date);
      item.put("mime", mime);
      item.put("size", size);
      item.put("hash", hash);
      // 检查数据限制
      if(size > _byteLimit){
         // 分多片写入
         DBCollection fragmentCollection = _database.getCollection(catalog + COLLECTION_FRAGMENT);
         int blockCount = size / _byteLimit;
         if(size % _byteLimit != 0){
            blockCount++;
         }
         int remain = size;
         for(int blockIndex = 0; blockIndex < blockCount; blockIndex++){
            int blockOffset = _byteLimit * blockIndex;
            int blockSize = Math.min(remain, _byteLimit);
            byte[] fragmentData = RByte.sub(data, blockOffset, blockSize);
            String fragmentGuid = guid + "|" + blockIndex;
            // 新建节点
            DBObject fragmentItem = new BasicDBObject();
            fragmentItem.put("guid", fragmentGuid);
            fragmentItem.put("data", fragmentData);
            // 删除处理（不删除，更新时大小达不到16M上限就报错）
            DBObject fragmentSearch = new BasicDBObject("guid", fragmentGuid);
            DBObject fragmentFind = fragmentCollection.findOne(fragmentSearch);
            if(fragmentFind != null){
               fragmentCollection.update(fragmentSearch, fragmentItem);
               //fragmentCollection.remove(fragmentFind);
            }else{
               // 新建处理
               fragmentCollection.insert(fragmentItem);
            }
            remain -= _byteLimit;
         }
         item.put("block", blockCount);
         item.put("data", null);
      }else{
         item.put("block", 0);
         item.put("data", data);
      }
      // 删除处理（不删除，更新时大小达不到16M上限就报错）
      DBObject search = new BasicDBObject("guid", guid);
      DBObject find = collection.findOne(search);
      if(find != null){
         collection.update(search, item);
         //collection.remove(find);
      }else{
         // 新建处理
         collection.insert(item);
      }
      return true;
   }

   //============================================================
   // <T>删除一个存储内容。</T>
   //
   // @param catalog 目录
   // @param guid 唯一编号
   // @return 处理结果
   //============================================================
   @Override
   public boolean deleteContent(String catalog,
                                String guid){
      // 检查参数
      if(RString.isEmpty(catalog)){
         throw new FFatalError("Parameter catalog is empty.");
      }
      if(RString.isEmpty(guid)){
         throw new FFatalError("Parameter guid is empty.");
      }
      //............................................................
      // 获得集合
      DBCollection collection = _database.getCollection(catalog);
      // 查找内容
      DBObject search = new BasicDBObject("guid", guid);
      DBObject item = collection.findOne(search);
      if(item == null){
         return false;
      }
      int blockCount = (int)item.get("block");
      // 删除分片数据
      if(blockCount > 0){
         DBCollection fragmentCollection = _database.getCollection(catalog + COLLECTION_FRAGMENT);
         for(int blockIndex = 0; blockIndex < blockCount; blockIndex++){
            String fragmentGuid = guid + "|" + blockIndex;
            DBObject fragmentSearch = new BasicDBObject("guid", fragmentGuid);
            fragmentCollection.findAndRemove(fragmentSearch);
         }
      }
      collection.remove(item);
      return true;
   }

   //============================================================
   // <T>生成存储文件名称。</T>
   //
   // @param host 主机地址
   // @param port 端口
   // @return 文件名称
   //============================================================
   public void disconnect(){
      _connection.close();
   }
}
