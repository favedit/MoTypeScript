package org.mo.com.json;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Iterator;
import org.mo.com.io.FStringFile;
import org.mo.com.io.RFile;
import org.mo.com.io.RInput;
import org.mo.com.json.impl.JSONArray;
import org.mo.com.json.impl.JSONObject;
import org.mo.com.lang.FFatalError;
import org.mo.com.lang.FObject;
import org.mo.com.lang.IDump;
import org.mo.com.lang.reflect.FClass;

//============================================================
// <T>JSON文档。</T>
// <p>借助第三方组件，解析和存储Xml文件。<br>
// 在内存中构建以FXmlNode/FXmlNodes为主的Xml数据树。</p>
//
// @history 051014 MAOCY 创建
//============================================================
public class FJsonDocument
      extends FObject
      implements
         IDump
{
   // 文件编码
   protected String _encoding = RJson.DEFAULT_ENCODING;

   // 前置空白(TAB=" ")
   protected String _indent = RJson.DEFAULT_INDENT;

   // 配置是否建立新行
   protected boolean _optionNewLine = true;

   // 配置属性区分大小写
   protected boolean _optionAttributeCareCase = true;

   // 是否替换属性回车
   protected boolean _optionAttributeReturn = true;

   // 是否建立文本节点
   protected boolean _textFlag = false;

   // 节点内容两边去空格标志
   protected boolean _textTrimFlag = true;

   // 节点对象类
   protected FClass<?> _classObject;

   // 节点集合类
   protected FClass<?> _classArray;

   // Xml根节点
   protected FJsonObject _rootChild;

   // 文件名称
   protected String _fileName;

   //============================================================
   // <T>构造JSON文档。</T>
   //============================================================
   public FJsonDocument(){
   }

   //============================================================
   // <T>构造JSON文档。</T>
   //
   // @param root 根节点
   //============================================================
   public FJsonDocument(FJsonObject root){
      _rootChild = root;
   }

   //============================================================
   // <T>构造JSON文档。</T>
   //
   // @param inputStream 输入流
   //============================================================
   public FJsonDocument(InputStream inputStream){
      loadStream(inputStream);
   }

   //============================================================
   // <T>构造JSON文档。</T>
   //
   // @param fileName 文件名称
   //============================================================
   public FJsonDocument(String fileName){
      loadFile(fileName);
   }

   //============================================================
   // <T>获得内容编码。</T>
   //
   // @return 内容编码
   //============================================================
   public String encoding(){
      return _encoding;
   }

   //============================================================
   // <T>设置内容编码。</T>
   //
   // @param encoding 内容编码
   //============================================================
   public void setEncoding(String encoding){
      _encoding = encoding;
   }

   //============================================================
   // <T>获得前缀空白内容。</T>
   //
   // @return 前缀空白内容
   //============================================================
   public String indent(){
      return _indent;
   }

   //============================================================
   // <T>设置前缀空白内容。</T>
   //
   // @param indent 前缀空白内容
   //============================================================
   public void setIndent(String indent){
      _indent = indent;
   }

   //============================================================
   // <T>获得配置是否建立新行。</T>
   //
   // @return 配置是否建立新行
   //============================================================
   public boolean optionNewLine(){
      return _optionNewLine;
   }

   //============================================================
   // <T>设置配置是否建立新行。</T>
   //
   // @param optionNewLine 配置是否建立新行
   //============================================================
   public void setOptionNewLine(boolean optionNewLine){
      _optionNewLine = optionNewLine;
   }

   //============================================================
   // <T>获得配置属性区分大小写。</T>
   //
   // @return 配置属性区分大小写
   //============================================================
   public boolean optionAttributeCareCase(){
      return _optionAttributeCareCase;
   }

   //============================================================
   // <T>设置配置属性区分大小写。</T>
   //
   // @param optionAttributeCareCase 配置属性区分大小写
   //============================================================
   public void setOptionAttributeCareCase(boolean optionAttributeCareCase){
      _optionAttributeCareCase = optionAttributeCareCase;
   }

   //============================================================
   // <T>获得是否替换属性回车。</T>
   //
   // @return 是否替换属性回车
   //============================================================
   public boolean optionAttributeReturn(){
      return _optionAttributeReturn;
   }

   //============================================================
   // <T>设置是否替换属性回车。</T>
   //
   // @param optionAttributeReturn 是否替换属性回车
   //============================================================
   public void setOptionAttributeReturn(boolean optionAttributeReturn){
      _optionAttributeReturn = optionAttributeReturn;
   }

   //============================================================
   // <T>获得是否建立文本节点标志。</T>
   //
   // @return 节点标志
   //============================================================
   public boolean textFlag(){
      return _textFlag;
   }

   //============================================================
   // <T>设置是否建立文本节点标志。</T>
   //
   // @param textFlag 节点标志
   //============================================================
   public void setTextFlag(boolean textFlag){
      _textFlag = textFlag;
   }

   //============================================================
   // <T>获得节点内容两边去空格标志。</T>
   //
   // @return 节点内容两边去空格标志
   //============================================================
   public boolean textTrimFlag(){
      return _textTrimFlag;
   }

   //============================================================
   // <T>设置节点内容两边去空格标志。</T>
   //
   // @param textTrimFlag 标志
   //============================================================
   public void setTextTrimFlag(boolean textTrimFlag){
      _textTrimFlag = textTrimFlag;
   }

   //============================================================
   // <T>获得节点类对象。</T>
   //
   // @return 节点类对象
   //============================================================
   public FClass<?> nodeClass(){
      return _classObject;
   }

   //============================================================
   // <T>设置节点类对象。</T>
   //
   // @param clazz 节点类对象
   //============================================================
   public void setNodeClass(FClass<?> clazz){
      _classObject = clazz;
   }

   //============================================================
   // <T>获得配置根节点。</T>
   //
   // @return 根节点
   //============================================================
   public FJsonObject root(){
      if(_rootChild == null){
         _rootChild = createObject();
      }
      return _rootChild;
   }

   //============================================================
   // <T>设置配置根节点。</T>
   //
   // @param xroot 根节点
   //============================================================
   public void setRoot(FJsonObject xroot){
      _rootChild = xroot;
   }

   //============================================================
   // <T>获得文件名称。</T>
   //
   // @return 节点内容两边去空格标志
   //============================================================
   public String fileName(){
      return _fileName;
   }

   //============================================================
   // <T>设置文件名称。</T>
   //
   // @param fileName 文件名称
   //============================================================
   public void setFileName(String fileName){
      _fileName = RFile.formatFileName(fileName);
   }

   //============================================================
   // <T>创建一个新的节点。</T>
   //
   // @return 节点
   //============================================================
   public FJsonObject createObject(){
      FJsonObject result = null;
      if(_classObject != null){
         result = (FJsonObject)_classObject.newInstance();
      }else{
         result = new FJsonObject();
      }
      result._document = this;
      return result;
   }

   //============================================================
   // <T>创建一个新的数组。</T>
   //
   // @return 数组
   //============================================================
   public FJsonArray createArray(){
      FJsonArray result = null;
      if(_classArray != null){
         result = (FJsonArray)_classArray.newInstance();
      }else{
         result = new FJsonArray();
      }
      result._document = this;
      return result;
   }

   //============================================================
   // <T>同步Element数据到FXmlNode节点对象中。</T>
   //
   // @param fileName 文件名称
   //============================================================
   protected FJsonObject makeNodeFromElement(JSONObject element){
      FJsonObject jsonObject = createObject();
      Iterator<String> keyIterator = element.keys();
      while(keyIterator.hasNext()){
         String elementName = keyIterator.next();
         Object elementValue = element.get(elementName);
         Object value = null;
         if(elementValue instanceof JSONObject){
            value = makeNodeFromElement((JSONObject)elementValue);
         }else if(elementValue instanceof JSONArray){
            value = makeNodeFromElements((JSONArray)elementValue);
         }else{
            value = elementValue;
         }
         jsonObject.set(elementName, value);
      }
      return jsonObject;
   }

   //============================================================
   // <T>同步Element数据到FXmlNode节点对象中。</T>
   //
   // @param fileName 文件名称
   //============================================================
   protected FJsonArray makeNodeFromElements(JSONArray elements){
      FJsonArray array = new FJsonArray();
      for(Object element : elements){
         Object value = null;
         if(element instanceof JSONObject){
            value = makeNodeFromElement((JSONObject)element);
         }else if(element instanceof JSONArray){
            value = makeNodeFromElements((JSONArray)element);
         }else{
            value = element;
         }
         array.push(value);
      }
      return array;
   }

   //============================================================
   // <T>从字符串信息中读取JSON文档。</T>
   //
   // @param source 字符串
   //============================================================
   public void loadString(String source){
      root().clear();
      try{
         JSONObject element = new JSONObject(source);
         _rootChild = makeNodeFromElement(element);
      }catch(Exception exception){
         throw new FFatalError(exception, "Load from string. (source={1})", source);
      }
   }

   //============================================================
   // <T>从流信息中读取JSON文档。</T>
   //
   // @param inputStream 输入流
   //============================================================
   public void loadStream(InputStream inputStream){
      try{
         byte[] data = RInput.read(inputStream);
         String source = new String(data, _encoding);
         loadString(source);
      }catch(Exception exception){
         throw new FFatalError(exception, "Load stream failure. (input_stream={1}])", inputStream);
      }
   }

   //============================================================
   // <T>从指定文件中读取JSON文档。</T>
   //
   // @param fileName 文件名称
   //============================================================
   public void loadFile(String fileName){
      try{
         _fileName = fileName;
         FStringFile file = new FStringFile();
         file.loadFile(fileName);
         String source = file.toString();
         loadString(source);
      }catch(Exception exception){
         throw new FFatalError(exception, "Load file failure. (file_name={1}])", fileName);
      }
   }

   //============================================================
   // <T>重新读取Xml文档。</T>
   //============================================================
   public void reload(){
      loadFile(_fileName);
   }

   //============================================================
   // <T>保存Xml文档到输出流中。</T>
   //
   // @param stream 输出流
   //============================================================
   public void saveStream(OutputStream stream){
      //      try{
      //         // 复制信息到节点内
      //         Element root = new Element(RJson.DEFAULT_NODE_NAME);
      //         syncElementFromNode(root, root());
      //         // 生成内存节点
      //         Document document = new Document();
      //         document.setRootElement(makeElementFromNode(root()));
      //         // 设置存储格式，保存文件
      //         JSONOutputter outputter = new JSONOutputter(Format.getPrettyFormat());
      //         Format format = outputter.getFormat();
      //         format.setIndent(_indent);
      //         format.setLineSeparator("\n");
      //         format.setEncoding(_encoding);
      //         outputter.output(document, stream);
      //      }catch(Exception e){
      //         throw new FFatalError(e, "Save output stream failure. (stream={1})", stream);
      //      }
   }

   //============================================================
   // <T>自动创建目录，保存JSON文档。</T>
   //
   // @param createDir 自动创建目录
   //============================================================
   public void saveFile(boolean createDir){
      try{
         // 检查文件存储路径是否存在
         if(createDir){
            int index = _fileName.lastIndexOf(File.separator);
            if(index > 0){
               String path = _fileName.substring(0, index);
               File dir = new File(path);
               if(!dir.exists()){
                  dir.mkdirs();
               }
            }
         }
         // 获得数据
         String source = toJson();
         byte[] data = source.getBytes(_encoding);
         // 设置存储格式，保存JSON文件
         FileOutputStream stream = new FileOutputStream(_fileName);
         stream.write(data);
         stream.close();
      }catch(Exception e){
         throw new FFatalError(e, "Save file failure. (dir={1})", createDir);
      }
   }

   //============================================================
   // <T>保存JSON文档。</T>
   //
   // @param fileName 文件名称
   //============================================================
   public void saveFile(String fileName){
      setFileName(fileName);
      saveFile(true);
   }

   //============================================================
   // <T>自动创建目录，保存JSON文档。</T>
   //
   // @param fileName 文件名称
   // @param createDir 自动创建目录
   //============================================================
   public void saveFile(String fileName,
                        boolean createDir){
      setFileName(fileName);
      saveFile(createDir);
   }

   //============================================================
   // <T>存储JSON文档。</T>
   //============================================================
   public void store(){
      saveFile(true);
   }

   //============================================================
   // <T>获得JSON字符串。</T>
   //
   // @return 字符串
   //============================================================
   public String toJson(){
      return root().toString();
   }

   //============================================================
   // <T>获得JSON字节数组。</T>
   //
   // @return 字节数组
   //============================================================
   public byte[] toJsonBytes(){
      String source = root().toString();
      try{
         return source.getBytes(_encoding);
      }catch(Exception exception){
         throw new FFatalError(exception);
      }
   }
}
