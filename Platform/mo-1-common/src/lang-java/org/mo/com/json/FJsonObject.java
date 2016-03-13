package org.mo.com.json;

import java.util.Iterator;
import org.mo.com.collections.FObjectDictionary;
import org.mo.com.lang.FFatalError;
import org.mo.com.lang.FString;
import org.mo.com.lang.INamePair;
import org.mo.com.lang.RString;

//============================================================
// <T>JSON节点。</T>
//
// @history 051201 MAOCY 创建
//============================================================
public class FJsonObject
      extends FJsonValue
      implements
         IJsonObject,
         Iterable<INamePair<Object>>
{
   // 文档
   protected FJsonDocument _document;

   // 父节点
   protected FJsonObject _parent;

   // 内容集合
   protected FObjectDictionary _values;

   //============================================================
   // <T>构造JSON节点。</T>
   //============================================================
   public FJsonObject(){
   }

   //   //============================================================
   //   // <T>构造JSON节点。</T>
   //   //
   //   // @param attributes 属性集合
   //   //============================================================
   //   public FJsonObject(Object... attributes){
   //      append(attributes);
   //   }

   //============================================================
   // <T>获得文档。</T>
   //
   // @return 文档
   //============================================================
   public FJsonDocument document(){
      return _document;
   }

   //============================================================
   // <T>设置文档。</T>
   //
   // @param document 文档
   //============================================================
   public void setDocument(FJsonDocument document){
      _document = document;
   }

   //============================================================
   // <T>获得父节点。</T>
   //
   // @return 父节点
   //============================================================
   public FJsonObject parent(){
      return _parent;
   }

   //============================================================
   // <T>设置父节点。</T>
   //
   // @param parent 父节点
   //============================================================
   public void setParent(FJsonObject parent){
      _parent = parent;
   }

   //   //============================================================
   //   // <T>是否含有指定属性。</T>
   //   //
   //   // @param name 名称
   //   // @param attributes 属性集合
   //   // @return TRUE：是<br>FALSE：否
   //   //============================================================
   //   public boolean equals(String... attributes){
   //      // 比较属性为空的状况
   //      if(attributes == null){
   //         return true;
   //      }
   //      int count = attributes.length;
   //      if(count == 0){
   //         return true;
   //      }
   //      // 比较属性
   //      int loop = count - 1;
   //      for(int n = 0; n < loop; n += 2){
   //         String value = attributes[n + 1];
   //         if(value == null){
   //            return false;
   //         }else{
   //            String attributeName = attributes[n];
   //            String attributeValue = _values.find(attributeName);
   //            if(!value.equalsIgnoreCase(attributeValue)){
   //               return false;
   //            }
   //         }
   //      }
   //      return true;
   //   }
   //
   //   //============================================================
   //   // <T>是否含有属性。</T>
   //   //
   //   // @param attrName 属性名称
   //   // @param attrValue 属性内容
   //   // @return TRUE：是<br>FALSE：否
   //   //============================================================
   //   public boolean equalsAttribute(String attrName,
   //                                  String attrValue){
   //      if(!hasAttribute()){
   //         return false;
   //      }
   //      String value = _values.get(attrName);
   //      if(!RString.equals(value, attrValue)){
   //         return false;
   //      }
   //      return true;
   //   }
   //
   //   //============================================================
   //   // <T>是否含有指定名称。</T>
   //   //
   //   // @param name 指定名称
   //   // @return 是否含有
   //   //============================================================
   //   public boolean contains(String name){
   //      return (_values != null) ? _values.contains(name) : false;
   //   }
   //
   //   //============================================================
   //   // <T>根据参数进行节点的比较。</T>
   //   //
   //   // @param node 节点
   //   // @param params 参数集合
   //   // @return 比较结果
   //   //============================================================
   //   @Override
   //   public int compare(FJsonObject node,
   //                      Object... params){
   //      if(params != null){
   //         int count = params.length;
   //         for(int n = 0; n < count; n++){
   //            String name = (String)params[n];
   //            String sourceValue = _values.find(name);
   //            String targetValue = node._values.find(name);
   //            int result = RString.compare(sourceValue, targetValue, false);
   //            if(result != 0){
   //               return result;
   //            }
   //         }
   //      }
   //      return 0;
   //   }

   //============================================================
   // <T>是否含有属性。</T>
   //
   // @return TRUE：是<br>FALSE：否
   //============================================================
   public boolean hasValue(){
      if(_values != null){
         return !_values.isEmpty();
      }
      return false;
   }

   //============================================================
   // <T>是否含有属性。</T>
   //
   // @param name 属性名称
   // @return TRUE：是<br>FALSE：否
   //============================================================
   public boolean hasValue(String name){
      if(_values != null){
         return _values.contains(name);
      }
      return false;
   }

   //============================================================
   // <T>获得节点总数。</T>
   //
   // @return 节点总数
   //============================================================
   public int valueCount(){
      return (_values != null) ? _values.count() : 0;
   }

   //============================================================
   // <T>获得属性列表。</T>
   //
   // @return 属性列表
   //============================================================
   public FObjectDictionary values(){
      if(_values == null){
         _values = new FObjectDictionary();
      }
      return _values;
   }

   //============================================================
   // <T>获得迭代器。</T>
   //
   // @return 迭代器
   //============================================================
   @Override
   public Iterator<INamePair<Object>> iterator(){
      return _values.iterator();
   }

   //
   //   //============================================================
   //   // <T>查找指定路径的节点。</T>
   //   // <P>节点名称中用“.”分开，每个可以代表一个单独节点的名称。</P>
   //   //
   //   // @param path 节点路径
   //   // @return 节点
   //   //============================================================
   //   public FJsonObject findPath(String path){
   //      FJsonObject node = this;
   //      if(!RString.isEmpty(path)){
   //         // 去掉开始符号
   //         if(path.startsWith("\\")){
   //            path = path.substring(1);
   //         }
   //         // 分割路径进行查找
   //         String[] paths = path.split("\\.");
   //         int count = paths.length;
   //         for(int i = 0; i < count; i++){
   //            if(!RString.isEmpty(paths[i])){
   //               node = node.findChild(paths[i]);
   //               if(null == node){
   //                  break;
   //               }
   //            }
   //         }
   //      }
   //      return node;
   //   }
   //
   //   //============================================================
   //   // <T>查找指定路径的节点。</T>
   //   // <P>节点名称中用“.”分开，每个可以代表一个单独节点的名称。</P>
   //   //
   //   // @param path 节点路径
   //   // @param split 路径分隔
   //   // @return 节点
   //   //============================================================
   //   public FJsonObject findPath(String path,
   //                               char split){
   //      FJsonObject node = this;
   //      if(!RString.isEmpty(path)){
   //         // 去掉开始符号
   //         if(0 == path.indexOf(split)){
   //            path = path.substring(1);
   //         }
   //         // 分割路径进行查找
   //         String[] paths = RString.split(path, split);
   //         int count = paths.length;
   //         for(int i = 0; i < count; i++){
   //            if(!RString.isEmpty(paths[i])){
   //               node = node.findChild(paths[i]);
   //               if(null == node){
   //                  break;
   //               }
   //            }
   //         }
   //      }
   //      return node;
   //   }
   //
   //   //============================================================
   //   // <T>获得全路径。</T>
   //   //
   //   // @param attribute 属性
   //   // @param split 分割符
   //   // @return 全路径
   //   //============================================================
   //   public String fullPath(String attribute,
   //                          char split){
   //      FJsonObject loop = this;
   //      if(null == loop._parent){
   //         return Character.toString(split);
   //      }
   //      String path = "";
   //      while(null != loop._parent){
   //         path = split + loop.get(attribute) + path;
   //         loop = loop._parent;
   //      }
   //      return path;
   //   }
   //
   //   //============================================================
   //   // <T>在当前节点下查找一个指定信息的节点。</T>
   //   //
   //   // @param attributes 属性集合
   //   // @return 节点
   //   //============================================================
   //   public FJsonObject findChild(String... attributes){
   //      FJsonObject findChild = null;
   //      if(hasChild()){
   //         findChild = _children.findChild(attributes);
   //      }
   //      return findChild;
   //   }
   //
   //   //============================================================
   //   // <T>在当前节点下查找最后一个指定信息的节点。</T>
   //   //
   //   // @param attributes 属性集合
   //   // @return 节点
   //   //============================================================
   //   public FJsonObject findLastChild(String... attributes){
   //      FJsonObject findChild = null;
   //      if(hasChild()){
   //         findChild = _children.findLastChild(attributes);
   //      }
   //      return findChild;
   //   }
   //
   //   //============================================================
   //   // <T>在当前节点下的所有节点中查找一个指定信息的节点。</T>
   //   //
   //   // @param attrName 属性名称
   //   // @param attrValue 属性内容
   //   // @return 节点
   //   //============================================================
   //   public FJsonObject findAllChild(String attrName,
   //                                   String attrValue){
   //      if(hasAttribute()){
   //         if(RString.equalsIgnoreCase(get(attrName), attrValue)){
   //            return this;
   //         }
   //      }
   //      if(hasChild()){
   //         for(FJsonObject node : _children){
   //            if(RString.equalsIgnoreCase(node.get(attrName), attrValue)){
   //               return node;
   //            }
   //         }
   //      }
   //      return null;
   //   }
   //
   //   //============================================================
   //   // <T>递归查询当前所有子节点满足条件的节点。</T>
   //   //
   //   // @param name 名称
   //   // @param attrName 属性名称
   //   // @param attrValue 属性内容
   //   // @return 节点
   //   //============================================================
   //   public FJsonObject search(){
   //      FJsonObject find = this;
   //      while(find.hasChild()){
   //         find = find.children().first();
   //      }
   //      return find;
   //   }
   //
   //   //============================================================
   //   // <T>递归查询当前所有子节点满足条件的节点。</T>
   //   //
   //   // @param attrName 属性名称
   //   // @param attrValue 属性内容
   //   // @return 节点
   //   //============================================================
   //   public FJsonObject search(String attrName,
   //                             String attrValue){
   //      if(equalsAttribute(attrName, attrValue)){
   //         return this;
   //      }
   //      if(_children != null){
   //         int count = _children.count();
   //         for(int n = 0; n < count; n++){
   //            FJsonObject node = _children.get(n);
   //            FJsonObject find = node.search(attrName, attrValue);
   //            if(find != null){
   //               return find;
   //            }
   //         }
   //      }
   //      return null;
   //   }
   //
   //   //============================================================
   //   // <T>增加符合指定信息的所有节点到节点列表中。</T>
   //   //
   //   // @param nodes 节点集合
   //   // @param node 节点集合
   //   // @param name 节点集合
   //   // @return 节点集合
   //   //============================================================
   //   protected FJsonObjects innerAllChildren(FJsonObjects nodes,
   //                                           FJsonObject node){
   //      if(node != null){
   //         for(FJsonObject itemNode : node.children()){
   //            nodes.push(itemNode);
   //            if(itemNode.hasChild()){
   //               innerAllChildren(nodes, itemNode);
   //            }
   //         }
   //      }
   //      return nodes;
   //   }
   //
   //   //============================================================
   //   // <T>增加符合指定信息的所有节点到节点列表中。</T>
   //   //
   //   // @param nodes 节点集合
   //   // @param node 节点集合
   //   // @param name 节点集合
   //   // @param attributes 节点集合
   //   // @return 节点集合
   //   //============================================================
   //   protected FJsonObjects innerAllChildren(FJsonObjects nodes,
   //                                           FJsonObject node,
   //                                           String... attributes){
   //      if(node != null){
   //         for(FJsonObject itemNode : node.children()){
   //            if(itemNode.equals(attributes)){
   //               nodes.push(itemNode);
   //            }
   //            if(itemNode.hasChild()){
   //               innerAllChildren(nodes, itemNode, attributes);
   //            }
   //         }
   //      }
   //      return nodes;
   //   }
   //
   //   //============================================================
   //   // <T>获得当前节点下所有符合指定信息的节点的节点列表。</T>
   //   // <P>搜索当前节点和当前节点下所有子节点。</P>
   //   //
   //   // @return 节点集合
   //   //============================================================
   //   public FJsonObjects allChildren(){
   //      FJsonObjects nodes = new FJsonObjects();
   //      if(hasChild()){
   //         innerAllChildren(nodes, this);
   //      }
   //      return nodes;
   //   }
   //
   //   //============================================================
   //   // <T>获得当前节点下所有符合指定信息的节点的节点列表。</T>
   //   // <P>搜索当前节点和当前节点下所有子节点。</P>
   //   //
   //   // @param name 节点名称
   //   // @param attributes 属性集合
   //   // @return 节点集合
   //   //============================================================
   //   public FJsonObjects allChildren(String... attributes){
   //      FJsonObjects nodes = new FJsonObjects();
   //      if(hasChild()){
   //         innerAllChildren(nodes, this, attributes);
   //      }
   //      return nodes;
   //   }
   //
   //   //============================================================
   //   // <T>查找指定路径的节点。</T>
   //   // <P>节点名称中用“.”分开，每个可以代表一个单独节点的名称。</P>
   //   //
   //   // @param path 节点路径
   //   // @param split 路径分隔
   //   // @param name 属性名称
   //   // @return 节点
   //   //============================================================
   //   public FJsonObject findPath(String path,
   //                               char split,
   //                               String name){
   //      FJsonObject node = this;
   //      if(!RString.isEmpty(path)){
   //         // 去掉开始符号
   //         if(path.indexOf(split) == 0){
   //            path = path.substring(1);
   //         }
   //         // 分割路径进行查找
   //         String[] paths = RString.split(path, split);
   //         int count = paths.length;
   //         for(int n = 0; n < count; n++){
   //            if(!RString.isEmpty(paths[n])){
   //               node = node.findChild(name, paths[n]);
   //               if(node == null){
   //                  break;
   //               }
   //            }
   //         }
   //      }
   //      return node;
   //   }

   //============================================================
   // <T>创建一个子节点。</T>
   //
   // @param name 名称
   // @return 子节点
   //============================================================
   public FJsonObject createObject(String name){
      FJsonObject value = new FJsonObject();
      values().set(name, value);
      return value;
   }

   //============================================================
   // <T>创建一个子数组。</T>
   //
   // @param name 名称
   // @return 子数组
   //============================================================
   public FJsonArray createArray(String name){
      FJsonArray value = new FJsonArray();
      values().set(name, value);
      return value;
   }

   //   //============================================================
   //   // <T>复制指定节点内容到当前节点内。</T>
   //   //
   //   // @param node 指定节点
   //   //============================================================
   //   public void assign(FJsonObject jsonObject){
   //      //      if(jsonObject.hasAttribute()){
   //      //         attributes().assign(jsonObject._values);
   //      //      }
   //      //      if(jsonObject.hasChild()){
   //      //         children().assign(jsonObject._children);
   //      //      }
   //   }
   //
   //   //============================================================
   //   // <T>复制指定节点内容到当前节点内。</T>
   //   //
   //   // @param node 指定节点
   //   // @param deep 深度
   //   //============================================================
   //   public void assign(FJsonObject jsonObject,
   //                      boolean deep){
   //      //      attributes().assign(jsonObject.attributes());
   //      //      if(deep){
   //      //         children().clear();
   //      //         //nodes().assign((FAbstractNamedList)node.nodes().copy());
   //      //      }else{
   //      //         children().clear();
   //      //         children().assign(jsonObject.children());
   //      //      }
   //   }

   //   //============================================================
   //   // <p>接收参数集合。</p>
   //   //
   //   // @param parameters 参数集合
   //   //============================================================
   //   public void assign(Object... parameters){
   //      clear();
   //      append(parameters);
   //   }
   //
   //   //============================================================
   //   // <p>追加参数集合。</p>
   //   //
   //   // @param parameters 参数集合
   //   //============================================================
   //   public void append(Object... parameters){
   //      if(parameters != null){
   //         int count = parameters.length - 1;
   //         for(int n = 0; n < count; n += 2){
   //            String name = (String)parameters[n];
   //            Object value = parameters[n + 1];
   //            set(name, value);
   //         }
   //      }
   //   }

   //============================================================
   // <T>获得指定属性名称的字符串属性内容。</T>
   //
   // @param name 属性名称
   // @return 属性内容
   //============================================================
   public Object get(String name){
      Object vlaue = null;
      if(hasValue()){
         vlaue = _values.get(name);
      }
      return vlaue;
   }

   //============================================================
   // <p>获得指定属性名称的布尔属性内容。</p>
   //
   // @param name 属性名称
   // @param defaultValue 默认内容
   // @return 属性内容
   //============================================================
   public Object get(String name,
                     Object defaultValue){
      Object result = null;
      if(hasValue()){
         result = _values.get(name, defaultValue);
      }
      return result;
   }

   //============================================================
   // <p>获得指定属性名称的布尔属性内容。</p>
   //
   // @param name 属性名称
   // @return 属性内容
   //============================================================
   public boolean getBoolean(String name){
      boolean result = false;
      if(hasValue()){
         Object value = _values.get(name);
         if(value != null){
            if(value instanceof Boolean){
               result = ((Boolean)value).booleanValue();
            }else{
               //RBoolean.parse(value);
               throw new FFatalError("Invalid inner type.");
            }
         }
      }
      return result;
   }

   //============================================================
   // <p>获得指定属性名称的布尔属性内容。</p>
   //
   // @param name 属性名称
   // @param defaultValue 默认内容
   // @return 属性内容
   //============================================================
   public boolean getBoolean(String name,
                             boolean defaultValue){
      boolean result = false;
      if(hasValue()){
         Object value = _values.get(name, defaultValue);
         if(value != null){
            if(value instanceof Boolean){
               result = ((Boolean)value).booleanValue();
            }else{
               throw new FFatalError("Invalid inner type.");
            }
         }
      }
      return result;
   }

   //============================================================
   // <p>获得指定属性名称的整数属性内容。</p>
   //
   // @param name 属性名称
   // @return 属性内容
   //============================================================
   public int getInt(String name){
      int result = 0;
      if(hasValue()){
         Object value = _values.get(name);
         if(value != null){
            if(value instanceof Integer){
               result = ((Integer)value).intValue();
            }else{
               throw new FFatalError("Invalid inner type.");
            }
         }
      }
      return result;
   }

   //============================================================
   // <p>获得指定属性名称的整数属性内容。</p>
   //
   // @param name 属性名称
   // @param defaultValue 默认内容
   // @return 属性内容
   //============================================================
   public int getInt(String name,
                     int defaultValue){
      int result = 0;
      if(hasValue()){
         Object value = _values.get(name, defaultValue);
         if(value != null){
            if(value instanceof Integer){
               result = ((Integer)value).intValue();
            }else{
               throw new FFatalError("Invalid inner type.");
            }
         }
      }
      return result;
   }

   //============================================================
   // <p>获得指定属性名称的长整数属性内容。</p>
   //
   // @param name 属性名称
   // @return 属性内容
   //============================================================
   public long getLong(String name){
      long result = 0;
      if(hasValue()){
         Object value = _values.get(name);
         if(value != null){
            if(value instanceof Long){
               result = ((Long)value).longValue();
            }else{
               throw new FFatalError("Invalid inner type.");
            }
         }
      }
      return result;
   }

   //============================================================
   // <p>获得指定属性名称的长整数属性内容。</p>
   //
   // @param name 属性名称
   // @param defaultValue 默认内容
   // @return 属性内容
   //============================================================
   public long getLong(String name,
                       int defaultValue){
      long result = 0;
      if(hasValue()){
         Object value = _values.get(name, defaultValue);
         if(value != null){
            if(value instanceof Long){
               result = ((Long)value).longValue();
            }else{
               throw new FFatalError("Invalid inner type.");
            }
         }
      }
      return result;
   }

   //============================================================
   // <p>获得指定属性名称的浮点数属性内容。</p>
   //
   // @param name 属性名称
   // @return 属性内容
   //============================================================
   public float getFloat(String name){
      float result = 0;
      if(hasValue()){
         Object value = _values.get(name);
         if(value != null){
            if(value instanceof Float){
               result = ((Float)value).floatValue();
            }else{
               throw new FFatalError("Invalid inner type.");
            }
         }
      }
      return result;
   }

   //============================================================
   // <p>获得指定属性名称的浮点数属性内容。</p>
   //
   // @param name 属性名称
   // @param defaultValue 默认内容
   // @return 属性内容
   //============================================================
   public float getFloat(String name,
                         float defaultValue){
      float result = 0;
      if(hasValue()){
         Object value = _values.get(name, defaultValue);
         if(value != null){
            if(value instanceof Float){
               result = ((Float)value).floatValue();
            }else{
               throw new FFatalError("Invalid inner type.");
            }
         }
      }
      return result;
   }

   //============================================================
   // <p>获得指定属性名称的双精度浮点数属性内容。</p>
   //
   // @param name 属性名称
   // @return 属性内容
   //============================================================
   public double getDouble(String name){
      double result = 0;
      if(hasValue()){
         Object value = _values.get(name);
         if(value != null){
            if(value instanceof Double){
               result = ((Double)value).doubleValue();
            }else{
               throw new FFatalError("Invalid inner type.");
            }
         }
      }
      return result;
   }

   //============================================================
   // <p>获得指定属性名称的双精度浮点数属性内容。</p>
   //
   // @param name 属性名称
   // @param defaultValue 默认内容
   // @return 属性内容
   //============================================================
   public double getDouble(String name,
                           double defaultValue){
      double result = 0;
      if(hasValue()){
         Object value = _values.get(name, defaultValue);
         if(value != null){
            if(value instanceof Double){
               result = ((Double)value).doubleValue();
            }else{
               throw new FFatalError("Invalid inner type.");
            }
         }
      }
      return result;
   }

   //============================================================
   // <p>获得指定属性名称的字符串属性内容。</p>
   //
   // @param name 属性名称
   // @return 属性内容
   //============================================================
   public String getString(String name){
      String result = null;
      if(hasValue()){
         Object value = _values.get(name);
         if(value != null){
            if(value instanceof String){
               result = (String)value;
            }else{
               throw new FFatalError("Invalid inner type.");
            }
         }
      }
      return result;
   }

   //============================================================
   // <p>获得指定属性名称的字符串属性内容。</p>
   //
   // @param name 属性名称
   // @param defaultValue 默认内容
   // @return 属性内容
   //============================================================
   public String getString(String name,
                           String defaultValue){
      String result = null;
      if(hasValue()){
         Object value = _values.get(name, defaultValue);
         if(value != null){
            if(value instanceof String){
               result = (String)value;
            }else{
               throw new FFatalError("Invalid inner type.");
            }
         }
      }
      return result;
   }

   //============================================================
   // <p>根据属性名称设置属性内容。</p>
   //
   // @param name 属性名称
   // @param value 属性内容
   //============================================================
   public void set(String name,
                   Object value){
      values().set(name, value);
   }

   //============================================================
   // <p>根据属性名称设置布尔属性内容。</p>
   //
   // @param name 属性名称
   // @param value 属性内容
   //============================================================
   public void set(String name,
                   boolean value){
      values().set(name, new Boolean(value));
   }

   //============================================================
   // <p>根据属性名称设置布尔属性内容。</p>
   //
   // @param name 属性名称
   // @param value 属性内容
   //============================================================
   public void set(String name,
                   Boolean value){
      values().set(name, new Boolean(value));
   }

   //============================================================
   // <p>根据属性名称设置整数属性内容。</p>
   //
   // @param name 属性名称
   // @param value 属性内容
   //============================================================
   public void set(String name,
                   int value){
      values().set(name, new Integer(value));
   }

   //============================================================
   // <p>根据属性名称设置整数属性内容。</p>
   //
   // @param name 属性名称
   // @param value 属性内容
   //============================================================
   public void set(String name,
                   Integer value){
      values().set(name, new Integer(value));
   }

   //============================================================
   // <p>根据属性名称设置长整数属性内容。</p>
   //
   // @param name 属性名称
   // @param value 属性内容
   //============================================================
   public void set(String name,
                   long value){
      values().set(name, new Long(value));
   }

   //============================================================
   // <p>根据属性名称设置长整数属性内容。</p>
   //
   // @param name 属性名称
   // @param value 属性内容
   //============================================================
   public void set(String name,
                   Long value){
      values().set(name, new Long(value));
   }

   //============================================================
   // <p>根据属性名称设置浮点数属性内容。</p>
   //
   // @param name 属性名称
   // @param value 属性内容
   //============================================================
   public void set(String name,
                   float value){
      values().set(name, new Float(value));
   }

   //============================================================
   // <p>根据属性名称设置浮点数属性内容。</p>
   //
   // @param name 属性名称
   // @param value 属性内容
   //============================================================
   public void set(String name,
                   Float value){
      values().set(name, new Float(value));
   }

   //============================================================
   // <p>根据属性名称设置双精度浮点数属性内容。</p>
   //
   // @param name 属性名称
   // @param value 属性内容
   //============================================================
   public void set(String name,
                   double value){
      values().set(name, new Double(value));
   }

   //============================================================
   // <p>根据属性名称设置双精度浮点数属性内容。</p>
   //
   // @param name 属性名称
   // @param value 属性内容
   //============================================================
   public void set(String name,
                   Double value){
      values().set(name, new Double(value));
   }

   //============================================================
   // <p>根据属性名称设置字符串属性内容。</p>
   //
   // @param name 属性名称
   // @param value 属性内容
   //============================================================
   public void set(String name,
                   String value){
      values().set(name, value);
   }

   //============================================================
   // <p>根据属性名称设置字符串数组属性内容。</p>
   //
   // @param name 属性名称
   // @param values 属性内容
   //============================================================
   public void set(String name,
                   String[] values){
      FJsonArray array = new FJsonArray();
      if(values != null){
         for(String value : values){
            array.push(value);
         }
      }
      values().set(name, array);
   }

   //============================================================
   // <p>根据属性名称设置非空属性内容。</p>
   //
   // @param name 属性名称
   // @param value 属性内容
   //============================================================
   public void setNvl(String name,
                      Object value){
      if(value != null){
         values().set(name, value);
      }
   }

   //============================================================
   // <p>根据属性名称设置非空布尔属性内容。</p>
   //
   // @param name 属性名称
   // @param value 属性内容
   //============================================================
   public void setNvl(String name,
                      boolean value){
      if(value){
         values().set(name, new Boolean(value));
      }
   }

   //============================================================
   // <p>根据属性名称设置非空布尔属性内容。</p>
   //
   // @param name 属性名称
   // @param value 属性内容
   //============================================================
   public void setNvl(String name,
                      Boolean value){
      if(value != null){
         if(value.booleanValue()){
            values().set(name, new Boolean(value));
         }
      }
   }

   //============================================================
   // <p>根据属性名称设置非空整数属性内容。</p>
   //
   // @param name 属性名称
   // @param value 属性内容
   //============================================================
   public void setNvl(String name,
                      int value){
      if(value != 0){
         values().set(name, new Integer(value));
      }
   }

   //============================================================
   // <p>根据属性名称设置非空整数属性内容。</p>
   //
   // @param name 属性名称
   // @param value 属性内容
   //============================================================
   public void setNvl(String name,
                      Integer value){
      if(value != null){
         if(value.intValue() != 0){
            values().set(name, new Integer(value));
         }
      }
   }

   //============================================================
   // <p>根据属性名称设置非空长整数属性内容。</p>
   //
   // @param name 属性名称
   // @param value 属性内容
   //============================================================
   public void setNvl(String name,
                      long value){
      if(value != 0){
         values().set(name, new Long(value));
      }
   }

   //============================================================
   // <p>根据属性名称设置非空长整数属性内容。</p>
   //
   // @param name 属性名称
   // @param value 属性内容
   //============================================================
   public void setNvl(String name,
                      Long value){
      if(value != null){
         if(value.longValue() != 0){
            values().set(name, new Long(value));
         }
      }
   }

   //============================================================
   // <p>根据属性名称设置非空浮点数属性内容。</p>
   //
   // @param name 属性名称
   // @param value 属性内容
   //============================================================
   public void setNvl(String name,
                      float value){
      if(value != 0){
         values().set(name, new Float(value));
      }
   }

   //============================================================
   // <p>根据属性名称设置非空浮点数属性内容。</p>
   //
   // @param name 属性名称
   // @param value 属性内容
   //============================================================
   public void setNvl(String name,
                      Float value){
      if(value != null){
         if(value.floatValue() != 0){
            values().set(name, new Float(value));
         }
      }
   }

   //============================================================
   // <p>根据属性名称设置非空双精度浮点数属性内容。</p>
   //
   // @param name 属性名称
   // @param value 属性内容
   //============================================================
   public void setNvl(String name,
                      double value){
      if(value != 0){
         values().set(name, new Double(value));
      }
   }

   //============================================================
   // <p>根据属性名称设置非空双精度浮点数属性内容。</p>
   //
   // @param name 属性名称
   // @param value 属性内容
   //============================================================
   public void setNvl(String name,
                      Double value){
      if(value != null){
         if(value.doubleValue() != 0){
            values().set(name, new Double(value));
         }
      }
   }

   //============================================================
   // <p>根据属性名称设置非空字符串属性内容。</p>
   //
   // @param name 属性名称
   // @param value 属性内容
   //============================================================
   public void setNvl(String name,
                      String value){
      if(!RString.isEmpty(value)){
         values().set(name, value);
      }
   }

   //============================================================
   // <T>移除指定属性名称的属性内容。</T>
   //
   // @param name 属性名称
   // @return 属性内容
   //============================================================
   public Object remove(String name){
      Object value = null;
      if(hasValue()){
         value = values().remove(name);
      }
      return value;
   }

   //   //============================================================
   //   // <T>获得当前实例的一份拷贝。</T>
   //   //
   //   // @return 实例的拷贝
   //   //============================================================
   //   @Override
   //   public FJsonObject copy(){
   //      // 复制节点
   //      FJsonObject node = new FJsonObject();
   //      node._document = _document;
   //      // 复制属性
   //      if(_values != null){
   //         FAttributes attributes = new FAttributes();
   //         attributes.assign(_values);
   //         node._values = attributes;
   //      }
   //      // 复制子节点集合
   //      if(_children != null){
   //         node._children = _children.copy();
   //      }
   //      return node;
   //   }

   //============================================================
   // <T>清除当前节点的所有信息。</T>
   //============================================================
   public void clear(){
      _document = null;
      _parent = null;
      if(_values != null){
         _values.clear();
         _values = null;
      }
   }

   //============================================================
   // <T>建立JSON字符串。</T>
   //
   // @param json JSON字符串
   // @param level 级别
   // @param deep 深度
   //============================================================
   @Override
   public void build(FString source,
                     int level,
                     boolean deep){
      if(hasValue()){
         int count = _values.count();
         // 获得是否有内部对象
         boolean hasObject = false;
         for(int n = 0; n < count; n++){
            Object value = _values.value(n);
            if(value instanceof IJsonObject){
               hasObject = true;
               break;
            }
         }
         // 追加内容
         source.append("{ ");
         if(hasObject){
            source.append('\n');
         }
         for(int n = 0; n < count; n++){
            if(n > 0){
               source.append(", ");
               if(hasObject){
                  source.append('\n');
               }
            }
            String name = _values.name(n);
            Object value = _values.value(n);
            if(hasObject){
               source.appendRepeat(RJson.DEFAULT_INDENT, level + 1);
            }
            source.append('"');
            source.append(name);
            source.append("\": ");
            if(value instanceof IJsonObject){
               ((IJsonObject)value).build(source, level + 1, deep);
            }else{
               RJson.buildValue(source, value);
            }
         }
         if(hasObject){
            source.append('\n');
            source.appendRepeat(RJson.DEFAULT_INDENT, level);
         }
         source.append(" }");
      }else{
         source.append("{}");
      }
   }

   //============================================================
   // <T>获得简单字符串。</T>
   //
   // @return 简单字符串
   //============================================================
   public String toSimple(){
      FString source = new FString();
      build(source, 0, false);
      return source.toString();
   }

   //============================================================
   // <T>获得JSON字符串。</T>
   //
   // @return JSON字符串
   //============================================================
   @Override
   public String toString(){
      FString source = new FString();
      build(source, 0, true);
      return source.toString();
   }
}
