package org.mo.com.json;

import org.mo.com.lang.FObjects;
import org.mo.com.lang.FString;

//============================================================
// <T>JSON节点。</T>
//
// @history 051201 MAOCY 创建
//============================================================
public class FJsonArray
      extends FObjects<Object>
      implements
         IJsonObject
{
   // 文档
   protected FJsonDocument _document;

   // 父节点
   protected FJsonArray _parent;

   //============================================================
   // <T>构造JSON节点。</T>
   //============================================================
   public FJsonArray(){
      super(Object.class);
   }

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
   public FJsonArray parent(){
      return _parent;
   }

   //============================================================
   // <T>设置父节点。</T>
   //
   // @param parent 父节点
   //============================================================
   public void setParent(FJsonArray parent){
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

   //   //============================================================
   //   // <T>获得迭代器。</T>
   //   //
   //   // @return 迭代器
   //   //============================================================
   //   @Override
   //   public Iterator<FJsonObject> iterator(){
   //      return children().iterator();
   //   }
   //
   //   //============================================================
   //   // <T>创建一个子节点。</T>
   //   //
   //   // @return 子节点
   //   //============================================================
   //   public FJsonObject createChild(){
   //      return children().create();
   //   }
   //
   //   //============================================================
   //   // <T>创建一个子节点。</T>
   //   //
   //   // @param name 节点名称
   //   // @param text 节点文本
   //   // @return 子节点
   //   //============================================================
   //   public FJsonObject createChild(String... attributes){
   //      return children().create(attributes);
   //   }
   //
   //   //============================================================
   //   // <T>创建一个子节点。</T>
   //   //
   //   // @param name 节点名称
   //   // @param attributes 属性集合
   //   // @return 子节点
   //   //============================================================
   //   public FJsonObject createChild(IAttributes attributes){
   //      FJsonObject xnode = children().create();
   //      xnode.attributes().assign(attributes);
   //      return xnode;
   //   }

   //============================================================
   // <T>复制指定节点内容到当前节点内。</T>
   //
   // @param node 指定节点
   //============================================================
   public void assign(FJsonArray jsonObject){
      //      if(jsonObject.hasAttribute()){
      //         attributes().assign(jsonObject._values);
      //      }
      //      if(jsonObject.hasChild()){
      //         children().assign(jsonObject._children);
      //      }
   }

   //============================================================
   // <T>复制指定节点内容到当前节点内。</T>
   //
   // @param node 指定节点
   // @param deep 深度
   //============================================================
   public void assign(FJsonArray jsonObject,
                      boolean deep){
      //      attributes().assign(jsonObject.attributes());
      //      if(deep){
      //         children().clear();
      //         //nodes().assign((FAbstractNamedList)node.nodes().copy());
      //      }else{
      //         children().clear();
      //         children().assign(jsonObject.children());
      //      }
   }

   //============================================================
   // <p>接收参数集合。</p>
   //
   // @param parameters 参数集合
   //============================================================
   public void assign(Object... parameters){
      clear();
   }

   //   //============================================================
   //   // <T>获得指定属性名称的字符串属性内容。</T>
   //   //
   //   // @param name 属性名称
   //   // @param value 属性内容
   //   // @return 属性内容
   //   //============================================================
   //   public String getString(String name){
   //      if(hasValue()){
   //         return _values.get(name, defaultValue);
   //      }
   //      return defaultValue;
   //   }
   //
   //   //============================================================
   //   // <T>获得指定属性名称的字符串属性内容。</T>
   //   //
   //   // @param name 属性名称
   //   // @param value 属性内容
   //   // @return 属性内容
   //   //============================================================
   //   public String getString(String name,
   //                           String defaultValue){
   //      if(hasValue()){
   //         return _values.get(name, defaultValue);
   //      }
   //      return defaultValue;
   //   }
   //
   //   //============================================================
   //   // <T>获得指定属性名称的字符串属性内容。</T>
   //   //
   //   // @param name 属性名称
   //   // @return 属性内容
   //   //============================================================
   //   public String getNvl(String name){
   //      return values().find(name);
   //   }
   //
   //   //============================================================
   //   // <p>获得指定属性名称的布尔属性内容。</p>
   //   //
   //   // @param name 属性名称
   //   // @return 属性内容
   //   //============================================================
   //   public boolean getBoolean(String name){
   //      String value = get(name);
   //      return RBoolean.parse(value);
   //   }
   //
   //   //============================================================
   //   // <p>获得指定属性名称的布尔属性内容。</p>
   //   //
   //   // @param name 属性名称
   //   // @param defaultValue 默认内容
   //   // @return 属性内容
   //   //============================================================
   //   public boolean getBoolean(String name,
   //                             boolean defaultValue){
   //      if(hasAttribute(name)){
   //         return getBoolean(name);
   //      }
   //      return defaultValue;
   //   }
   //
   //   //============================================================
   //   // <p>获得指定属性名称的整数属性内容。</p>
   //   //
   //   // @param name 属性名称
   //   // @return 属性内容
   //   //============================================================
   //   public int getInt(String name){
   //      String value = get(name);
   //      return RInteger.parse(value);
   //   }
   //
   //   //============================================================
   //   // <p>获得指定属性名称的整数属性内容。</p>
   //   //
   //   // @param name 属性名称
   //   // @param defaultValue 默认内容
   //   // @return 属性内容
   //   //============================================================
   //   public int getInt(String name,
   //                     int defaultValue){
   //      if(hasAttribute(name)){
   //         String value = get(name);
   //         return RInteger.parse(value, defaultValue);
   //      }
   //      return defaultValue;
   //   }
   //
   //   //============================================================
   //   // <p>获得指定属性名称的长整数属性内容。</p>
   //   //
   //   // @param name 属性名称
   //   // @return 属性内容
   //   //============================================================
   //   public long getLong(String name){
   //      String value = get(name);
   //      return RLong.parse(value);
   //   }
   //
   //   //============================================================
   //   // <p>获得指定属性名称的长整数属性内容。</p>
   //   //
   //   // @param name 属性名称
   //   // @param defaultValue 默认内容
   //   // @return 属性内容
   //   //============================================================
   //   public long getLong(String name,
   //                       int defaultValue){
   //      if(hasAttribute(name)){
   //         String value = get(name);
   //         return RLong.parse(value, defaultValue);
   //      }
   //      return defaultValue;
   //   }
   //
   //   //============================================================
   //   // <p>获得指定属性名称的浮点数属性内容。</p>
   //   //
   //   // @param name 属性名称
   //   // @return 属性内容
   //   //============================================================
   //   public float getFloat(String name){
   //      String value = get(name);
   //      return RFloat.parse(value);
   //   }
   //
   //   //============================================================
   //   // <p>获得指定属性名称的浮点数属性内容。</p>
   //   //
   //   // @param name 属性名称
   //   // @param defaultValue 默认内容
   //   // @return 属性内容
   //   //============================================================
   //   public float getFloat(String name,
   //                         float defaultValue){
   //      if(hasAttribute(name)){
   //         String value = get(name);
   //         return RFloat.parse(value, defaultValue);
   //      }
   //      return defaultValue;
   //   }
   //
   //   //============================================================
   //   // <p>获得指定属性名称的双精度浮点数属性内容。</p>
   //   //
   //   // @param name 属性名称
   //   // @return 属性内容
   //   //============================================================
   //   public double getDouble(String name){
   //      String value = get(name);
   //      return RDouble.parse(value);
   //   }
   //
   //   //============================================================
   //   // <p>获得指定属性名称的双精度浮点数属性内容。</p>
   //   //
   //   // @param name 属性名称
   //   // @param defaultValue 默认内容
   //   // @return 属性内容
   //   //============================================================
   //   public double getDouble(String name,
   //                           double defaultValue){
   //      if(hasAttribute(name)){
   //         String value = get(name);
   //         return RDouble.parse(value, defaultValue);
   //      }
   //      return defaultValue;
   //   }

   //   //============================================================
   //   // <p>设置属性名称和整数属性内容。</p>
   //   //
   //   // @param name 属性名称
   //   // @param value 属性内容
   //   //============================================================
   //   public void set(String name,
   //                   boolean value){
   //      values().set(name, RBoolean.toString(value));
   //   }
   //
   //   //============================================================
   //   // <p>设置属性名称和整数属性内容。</p>
   //   //
   //   // @param name 属性名称
   //   // @param value 属性内容
   //   //============================================================
   //   public void setNvl(String name,
   //                      boolean value){
   //      if(value){
   //         values().set(name, RBoolean.toString(value));
   //      }
   //   }
   //
   //   //============================================================
   //   // <p>设置属性名称和整数属性内容。</p>
   //   //
   //   // @param name 属性名称
   //   // @param value 属性内容
   //   //============================================================
   //   public void set(String name,
   //                   int value){
   //      values().set(name, Integer.toString(value));
   //   }
   //
   //   //============================================================
   //   // <p>设置属性名称和整数属性内容。</p>
   //   //
   //   // @param name 属性名称
   //   // @param value 属性内容
   //   //============================================================
   //   public void setNvl(String name,
   //                      int value){
   //      if(value != 0){
   //         values().set(name, Integer.toString(value));
   //      }
   //   }
   //
   //   //============================================================
   //   // <p>设置属性名称和长整数属性内容。</p>
   //   //
   //   // @param name 属性名称
   //   // @param value 属性内容
   //   //============================================================
   //   public void set(String name,
   //                   long value){
   //      values().set(name, Long.toString(value));
   //   }
   //
   //   //============================================================
   //   // <p>设置属性名称和长整数属性内容。</p>
   //   //
   //   // @param name 属性名称
   //   // @param value 属性内容
   //   //============================================================
   //   public void setNvl(String name,
   //                      long value){
   //      if(value != 0){
   //         values().set(name, Long.toString(value));
   //      }
   //   }
   //
   //   //============================================================
   //   // <p>设置属性名称和整数属性内容。</p>
   //   //
   //   // @param name 属性名称
   //   // @param value 属性内容
   //   //============================================================
   //   public void set(String name,
   //                   float value){
   //      values().set(name, Float.toString(value));
   //   }
   //
   //   //============================================================
   //   // <p>设置属性名称和整数属性内容。</p>
   //   //
   //   // @param name 属性名称
   //   // @param value 属性内容
   //   //============================================================
   //   public void setNvl(String name,
   //                      float value){
   //      if(value != 0){
   //         values().set(name, Float.toString(value));
   //      }
   //   }
   //
   //   //============================================================
   //   // <p>设置属性名称和整数属性内容。</p>
   //   //
   //   // @param name 属性名称
   //   // @param value 属性内容
   //   //============================================================
   //   public void set(String name,
   //                   double value){
   //      values().set(name, Double.toString(value));
   //   }
   //
   //   //============================================================
   //   // <p>设置属性名称和整数属性内容。</p>
   //   //
   //   // @param name 属性名称
   //   // @param value 属性内容
   //   //============================================================
   //   public void setNvl(String name,
   //                      double value){
   //      if(value != 0){
   //         values().set(name, Double.toString(value));
   //      }
   //   }
   //
   //   //============================================================
   //   // <p>设置属性名称和字符串属性内容。</p>
   //   //
   //   // @param name 属性名称
   //   // @param value 属性内容
   //   //============================================================
   //   @Override
   //   public void set(String name,
   //                   String value){
   //      values().set(name, RString.nvl(value));
   //   }
   //
   //   //============================================================
   //   // <p>设置属性名称和字符串属性内容。</p>
   //   //
   //   // @param name 属性名称
   //   // @param value 属性内容
   //   //============================================================
   //   public void setNvl(String name,
   //                      String value){
   //      if(!RString.isEmpty(value)){
   //         values().set(name, value);
   //      }
   //   }
   //
   //   //============================================================
   //   // <p>设置属性名称和字符串属性内容。</p>
   //   //
   //   // @param name 属性名称
   //   // @param value 属性内容
   //   //============================================================
   //   public void set(String name,
   //                   Object value){
   //      String valueString = RString.toString(value);
   //      values().set(name, valueString);
   //   }
   //
   //   //============================================================
   //   // <p>设置属性名称和字符串属性内容。</p>
   //   //
   //   // @param name 属性名称
   //   // @param value 属性内容
   //   //============================================================
   //   public void setNvl(String name,
   //                      Object value){
   //      String valueString = RString.toString(value);
   //      if(!RString.isEmpty(valueString)){
   //         values().set(name, valueString);
   //      }
   //   }

   //   //============================================================
   //   // <T>按照节点的名称进行排序。</T>
   //   //
   //   // @param asc 排序方式
   //   //============================================================
   //   public void sort(boolean asc){
   //      children().sortByAttribute(asc);
   //   }
   //
   //   //============================================================
   //   // <T>按照节点指定属性名称进行排序。</T>
   //   //
   //   // @param attrNames 属性名称集合
   //   //============================================================
   //   public void sort(String... attrNames){
   //      children().sortByAttribute(true, attrNames);
   //   }
   //
   //   //============================================================
   //   // <T>按照节点指定属性名称进行排序。</T>
   //   //
   //   // @param asc 排序方式
   //   // @param attrNames 属性名称集合
   //   //============================================================
   //   public void sort(boolean asc,
   //                    String... attrNames){
   //      children().sortByAttribute(asc, attrNames);
   //   }
   //
   //   //============================================================
   //   // <T>移除指定属性名称的属性内容。</T>
   //   //
   //   // @param attrName 属性名称
   //   // @return 属性内容
   //   //============================================================
   //   public String removeAttribute(String attrName){
   //      return values().remove(attrName);
   //   }
   //
   //   //============================================================
   //   // <T>移除指定的节点。</T>
   //   //
   //   // @param name 节点名称
   //   // @param attributes 属性集合
   //   // @return 属性内容
   //   //============================================================
   //   public void removeChild(String... attributes){
   //      if(hasChild()){
   //         FJsonObjects removes = null;
   //         for(FJsonObject node : children()){
   //            if(node.equals(attributes)){
   //               if(removes == null){
   //                  removes = new FJsonObjects();
   //               }
   //               removes.push(node);
   //            }
   //         }
   //         if(removes != null){
   //            throw new NoSuchMethodError();
   //         }
   //      }
   //   }
   //
   //   //============================================================
   //   // <T>获得当前实例的一份拷贝。</T>
   //   //
   //   // @return 实例的拷贝
   //   //============================================================
   //   @Override
   //   @SuppressWarnings("unchecked")
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
   @Override
   public void clear(){
      _document = null;
      _parent = null;
      super.clear();
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
      if(isEmpty()){
         source.append("[]");
      }else{
         int count = _count;
         // 获得是否有内部对象
         boolean hasObject = false;
         for(int n = 0; n < count; n++){
            Object value = _items[n];
            if(value instanceof IJsonObject){
               hasObject = true;
               break;
            }
         }
         // 追加内容
         source.append('[');
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
            // 追加项目
            if(hasObject){
               source.appendRepeat(RJson.DEFAULT_INDENT, level + 1);
            }
            Object value = _items[n];
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
         source.append("]");
      }
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
