package org.mo.eng.persistence.base;

import org.mo.com.lang.FMultiString;
import org.mo.com.lang.RBoolean;
import org.mo.com.lang.RString;
import org.mo.com.lang.face.AName;
import org.mo.com.xml.EXmlConfig;
import org.mo.com.xml.FXmlNode;
import org.mo.com.xml.FXmlObject;
import org.mo.com.xml.IXmlObject;
import org.mo.eng.persistence.common.XObjectFace;

//============================================================
// <T>组件对象的XML节点基类。</T>
//============================================================
public abstract class XBaseComponent
      extends FXmlObject
      implements
         XObjectFace
{
   // 名称定义
   public static final String NAME = "Component";

   //============================================================
   // <T>获得名称定义。</T>
   //
   // @return 名称定义
   //============================================================
   public String name(){
      return NAME;
   }

   //============================================================
   // <T>判断是否指定名称。</T>
   //
   // @param name 名称
   // @return 是否指定
   //============================================================
   public static boolean isName(String name){
      return NAME.equals(name);
   }

   //============================================================
   // <T>判断是否指定实例。</T>
   //
   // @param xobject 对象
   // @return 是否指定
   //============================================================
   public static boolean isInstance(IXmlObject xobject){
      return NAME.equals(xobject.name());
   }

   // 名称的名称定义
   public static final String PTY_NAME = "name";

   // 标签的名称定义
   public static final String PTY_LABEL = "label";

   // 有效性的名称定义
   public static final String PTY_IS_VALID = "is_valid";

   // 描述信息的名称定义
   public static final String PTY_NOTE = "note";

   // 附加属性的名称定义
   public static final String PTY_ATTRIBUTES = "attributes";

   // 类名称的名称定义
   public static final String PTY_CLASS_NAME = "class_name";

   // 基类名称的名称定义
   public static final String PTY_BASE_NAME = "base_name";

   // 继承接口的名称定义
   public static final String PTY_INHERITS = "inherits";

   // 代码位置的名称定义
   public static final String PTY_SOURCE = "source";

   // 名称的定义
   @AName("name")
   protected String _name;

   // 标签的定义
   @AName("label")
   protected FMultiString _label = new FMultiString();

   // 有效性的定义
   @AName("is_valid")
   protected Boolean _isValid = Boolean.FALSE;

   // 描述信息的定义
   @AName("note")
   protected FMultiString _note = new FMultiString();

   // 附加属性的定义
   @AName("attributes")
   protected String _attributes;

   // 类名称的定义
   @AName("class_name")
   protected String _className;

   // 基类名称的定义
   @AName("base_name")
   protected String _baseName;

   // 继承接口的定义
   @AName("inherits")
   protected String _inherits;

   // 代码位置的定义
   @AName("source")
   protected String _source;

   //============================================================
   // <T>获得名称的内容。</T>
   //
   // @return 名称
   //============================================================
   public String getName(){
      return _name;
   }

   //============================================================
   // <T>设置名称的内容。</T>
   //
   // @param value 名称
   //============================================================
   public void setName(String value){
      _name = value;
   }

   //============================================================
   // <T>获得标签的内容。</T>
   //
   // @return 标签
   //============================================================
   public String getLabel(){
      return _label.get();
   }

   //============================================================
   // <T>设置标签的内容。</T>
   //
   // @param value 标签
   //============================================================
   public void setLabel(String value){
      _label.set(value);
   }

   //============================================================
   // <T>获得有效性的内容。</T>
   //
   // @return 有效性
   //============================================================
   public Boolean getIsValid(){
      return _isValid;
   }

   //============================================================
   // <T>设置有效性的内容。</T>
   //
   // @param value 有效性
   //============================================================
   public void setIsValid(Boolean value){
      _isValid = value;
   }

   //============================================================
   // <T>获得描述信息的内容。</T>
   //
   // @return 描述信息
   //============================================================
   public String getNote(){
      return _note.get();
   }

   //============================================================
   // <T>设置描述信息的内容。</T>
   //
   // @param value 描述信息
   //============================================================
   public void setNote(String value){
      _note.set(value);
   }

   //============================================================
   // <T>获得附加属性的内容。</T>
   //
   // @return 附加属性
   //============================================================
   public String getAttributes(){
      return _attributes;
   }

   //============================================================
   // <T>设置附加属性的内容。</T>
   //
   // @param value 附加属性
   //============================================================
   public void setAttributes(String value){
      _attributes = value;
   }

   //============================================================
   // <T>获得类名称的内容。</T>
   //
   // @return 类名称
   //============================================================
   public String getClassName(){
      return _className;
   }

   //============================================================
   // <T>设置类名称的内容。</T>
   //
   // @param value 类名称
   //============================================================
   public void setClassName(String value){
      _className = value;
   }

   //============================================================
   // <T>获得基类名称的内容。</T>
   //
   // @return 基类名称
   //============================================================
   public String getBaseName(){
      return _baseName;
   }

   //============================================================
   // <T>设置基类名称的内容。</T>
   //
   // @param value 基类名称
   //============================================================
   public void setBaseName(String value){
      _baseName = value;
   }

   //============================================================
   // <T>获得继承接口的内容。</T>
   //
   // @return 继承接口
   //============================================================
   public String getInherits(){
      return _inherits;
   }

   //============================================================
   // <T>设置继承接口的内容。</T>
   //
   // @param value 继承接口
   //============================================================
   public void setInherits(String value){
      _inherits = value;
   }

   //============================================================
   // <T>获得代码位置的内容。</T>
   //
   // @return 代码位置
   //============================================================
   public String getSource(){
      return _source;
   }

   //============================================================
   // <T>设置代码位置的内容。</T>
   //
   // @param value 代码位置
   //============================================================
   public void setSource(String value){
      _source = value;
   }

   //============================================================
   // <T>内部获得内容置信息。</T>
   //
   // @param name 名称
   // @return 内容
   //============================================================
   public String innerGet(String name){
      if(RString.isEmpty(name)){
         return null;
      }else if(PTY_NAME.equalsIgnoreCase(name)){
         return getName();
      }else if(PTY_LABEL.equalsIgnoreCase(name)){
         return getLabel();
      }else if(PTY_IS_VALID.equalsIgnoreCase(name)){
         return RBoolean.toString(getIsValid());
      }else if(PTY_NOTE.equalsIgnoreCase(name)){
         return getNote();
      }else if(PTY_ATTRIBUTES.equalsIgnoreCase(name)){
         return getAttributes();
      }else if(PTY_CLASS_NAME.equalsIgnoreCase(name)){
         return getClassName();
      }else if(PTY_BASE_NAME.equalsIgnoreCase(name)){
         return getBaseName();
      }else if(PTY_INHERITS.equalsIgnoreCase(name)){
         return getInherits();
      }else if(PTY_SOURCE.equalsIgnoreCase(name)){
         return getSource();
      }
      return null;
   }

   //============================================================
   // <T>内部设置内容置信息。</T>
   //
   // @param name 名称
   // @param value 内容
   //============================================================
   public void innerSet(String name,
                        String value){
      if(RString.isEmpty(name)){
         return;
      }else if(PTY_NAME.equalsIgnoreCase(name)){
         setName(value);
      }else if(PTY_LABEL.equalsIgnoreCase(name)){
         setLabel(value);
      }else if(PTY_IS_VALID.equalsIgnoreCase(name)){
         setIsValid(RBoolean.parse(value));
      }else if(PTY_NOTE.equalsIgnoreCase(name)){
         setNote(value);
      }else if(PTY_ATTRIBUTES.equalsIgnoreCase(name)){
         setAttributes(value);
      }else if(PTY_CLASS_NAME.equalsIgnoreCase(name)){
         setClassName(value);
      }else if(PTY_BASE_NAME.equalsIgnoreCase(name)){
         setBaseName(value);
      }else if(PTY_INHERITS.equalsIgnoreCase(name)){
         setInherits(value);
      }else if(PTY_SOURCE.equalsIgnoreCase(name)){
         setSource(value);
      }
   }

   //============================================================
   // <T>加载设置信息。</T>
   //
   // @param config 设置信息
   // @param type 类型
   //============================================================
   public void loadConfig(FXmlNode config,
                          EXmlConfig type){
      super.loadConfig(config, type);
      if(EXmlConfig.Full == type){
         if(config.contains("name")){
            setName(config.get(PTY_NAME));
         }
         if(config.contains("label")){
            _label.unpack(config.get(PTY_LABEL));
         }
         if(config.contains("is_valid")){
            setIsValid(RBoolean.parse(config.get(PTY_IS_VALID)));
         }
         if(config.contains("note")){
            _note.unpack(config.get(PTY_NOTE));
         }
         if(config.contains("attributes")){
            setAttributes(config.get(PTY_ATTRIBUTES));
         }
         if(config.contains("class_name")){
            setClassName(config.get(PTY_CLASS_NAME));
         }
         if(config.contains("base_name")){
            setBaseName(config.get(PTY_BASE_NAME));
         }
         if(config.contains("inherits")){
            setInherits(config.get(PTY_INHERITS));
         }
         if(config.contains("source")){
            setSource(config.get(PTY_SOURCE));
         }
      }else if(EXmlConfig.Simple == type){
         if(config.contains("name")){
            setName(config.get(PTY_NAME));
         }
         if(config.contains("label")){
            setLabel(config.get(PTY_LABEL));
         }
         if(config.contains("is_valid")){
            setIsValid(RBoolean.parse(config.get(PTY_IS_VALID)));
         }
         if(config.contains("note")){
            setNote(config.get(PTY_NOTE));
         }
         if(config.contains("attributes")){
            setAttributes(config.get(PTY_ATTRIBUTES));
         }
         if(config.contains("class_name")){
            setClassName(config.get(PTY_CLASS_NAME));
         }
         if(config.contains("base_name")){
            setBaseName(config.get(PTY_BASE_NAME));
         }
         if(config.contains("inherits")){
            setInherits(config.get(PTY_INHERITS));
         }
         if(config.contains("source")){
            setSource(config.get(PTY_SOURCE));
         }
      }else if(EXmlConfig.Value == type){
         if(config.contains("name")){
            setName(config.get(PTY_NAME));
         }
         if(config.contains("label")){
            setLabel(config.get(PTY_LABEL));
         }
         if(config.contains("is_valid")){
            setIsValid(RBoolean.parse(config.get(PTY_IS_VALID)));
         }
         if(config.contains("note")){
            setNote(config.get(PTY_NOTE));
         }
         if(config.contains("attributes")){
            setAttributes(config.get(PTY_ATTRIBUTES));
         }
         if(config.contains("class_name")){
            setClassName(config.get(PTY_CLASS_NAME));
         }
         if(config.contains("base_name")){
            setBaseName(config.get(PTY_BASE_NAME));
         }
         if(config.contains("inherits")){
            setInherits(config.get(PTY_INHERITS));
         }
         if(config.contains("source")){
            setSource(config.get(PTY_SOURCE));
         }
      }else if(EXmlConfig.Default == type){
      }
   }

   //============================================================
   // <T>保存设置信息。</T>
   //
   // @param config 设置信息
   // @param type 类型
   //============================================================
   public void saveConfig(FXmlNode config,
                          EXmlConfig type){
      config.setName(NAME);
      super.saveConfig(config, type);
      if(EXmlConfig.Full == type){
         if(RString.isNotEmpty(getName())){
            config.set(PTY_NAME, getName());
         }
         String label = _label.pack().toString();
         if(RString.isNotEmpty(label)){
            config.set(PTY_LABEL, label);
         }
         if(RBoolean.parse(getIsValid())){
            config.set(PTY_IS_VALID, RBoolean.toString(getIsValid()));
         }
         String note = _note.pack().toString();
         if(RString.isNotEmpty(note)){
            config.set(PTY_NOTE, note);
         }
         if(RString.isNotEmpty(getAttributes())){
            config.set(PTY_ATTRIBUTES, getAttributes());
         }
         if(RString.isNotEmpty(getClassName())){
            config.set(PTY_CLASS_NAME, getClassName());
         }
         if(RString.isNotEmpty(getBaseName())){
            config.set(PTY_BASE_NAME, getBaseName());
         }
         if(RString.isNotEmpty(getInherits())){
            config.set(PTY_INHERITS, getInherits());
         }
         if(RString.isNotEmpty(getSource())){
            config.set(PTY_SOURCE, getSource());
         }
      }else if(EXmlConfig.Simple == type){
         if(RString.isNotEmpty(getName())){
            config.set(PTY_NAME, getName());
         }
         if(RString.isNotEmpty(getLabel())){
            config.set(PTY_LABEL, getLabel());
         }
         if(RBoolean.parse(getIsValid())){
            config.set(PTY_IS_VALID, RBoolean.toString(getIsValid()));
         }
         if(RString.isNotEmpty(getNote())){
            config.set(PTY_NOTE, getNote());
         }
         if(RString.isNotEmpty(getAttributes())){
            config.set(PTY_ATTRIBUTES, getAttributes());
         }
         if(RString.isNotEmpty(getClassName())){
            config.set(PTY_CLASS_NAME, getClassName());
         }
         if(RString.isNotEmpty(getBaseName())){
            config.set(PTY_BASE_NAME, getBaseName());
         }
         if(RString.isNotEmpty(getInherits())){
            config.set(PTY_INHERITS, getInherits());
         }
         if(RString.isNotEmpty(getSource())){
            config.set(PTY_SOURCE, getSource());
         }
      }else if(EXmlConfig.Value == type){
         String sName = getName();
         if(RString.isNotEmpty(sName)){
            config.set(PTY_NAME, sName);
         }
         String sLabel = getLabel();
         if(RString.isNotEmpty(sLabel)){
            config.set(PTY_LABEL, sLabel);
         }
         Boolean bIsValid = getIsValid();
         if(RBoolean.parse(bIsValid)){
            config.set(PTY_IS_VALID, RBoolean.toString(bIsValid));
         }
         String sNote = getNote();
         if(RString.isNotEmpty(sNote)){
            config.set(PTY_NOTE, sNote);
         }
         String sAttributes = getAttributes();
         if(RString.isNotEmpty(sAttributes)){
            config.set(PTY_ATTRIBUTES, sAttributes);
         }
         String sClassName = getClassName();
         if(RString.isNotEmpty(sClassName)){
            config.set(PTY_CLASS_NAME, sClassName);
         }
         String sBaseName = getBaseName();
         if(RString.isNotEmpty(sBaseName)){
            config.set(PTY_BASE_NAME, sBaseName);
         }
         String sInherits = getInherits();
         if(RString.isNotEmpty(sInherits)){
            config.set(PTY_INHERITS, sInherits);
         }
         String sSource = getSource();
         if(RString.isNotEmpty(sSource)){
            config.set(PTY_SOURCE, sSource);
         }
      }else if(EXmlConfig.Default == type){
      }
   }
}
