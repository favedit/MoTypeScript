package org.mo.web.core.parser.js;

import org.mo.com.lang.FFatalError;
import org.mo.com.lang.RDump;
import org.mo.com.lang.RString;
import org.mo.com.lang.generic.TDumpInfo;
import org.mo.com.xml.FXmlNode;

public class FJsStyle
      extends FJsObject
{

   protected String _name;

   protected String _type;

   protected String _description;

   protected String _alias;

   public String alias(){
      return _name;
   }

   public String description(){
      return _description;
   }

   @Override
   public TDumpInfo dump(TDumpInfo info){
      RDump.append(info);
      info.append("[name=", _name);
      info.append(",alias=", _alias);
      info.append(",description=", _description, "]");
      return info;
   }

   public FXmlNode makeNode(){
      FXmlNode node = new FXmlNode("Style");
      node.set("name", _name);
      node.set("description", _description);
      return node;
   }

   public String name(){
      return _name;
   }

   public void parse(String[] items){
      String subItem = "";
      try{
         String nameLine = "";
         for(int i = 0; i < items.length; i++){
            if(!items[i].startsWith("o.")){
               subItem += items[i].toString();
            }else{
               nameLine += items[i].toString();
            }
         }
         subItem = subItem.substring(RJsTag.STYLE.length()).trim();
         String[] subItems = RString.splitTwo(subItem, " ", true);
         String[] name = nameLine.split("=");
         // 没有写注释的情况
         if(null == subItems){
            subItems = new String[]{subItem};
         }
         if(subItems.length == 1){
            // 参数里：别称:名称:类型
            _name = name[0].substring(2).trim();
         }else if(subItems.length == 2){
            // 参数里：别称:名称:类型
            _name = name[0].substring(2).trim();
            _description = subItems[0].trim();
         }
      }catch(Exception e){
         throw new FFatalError(e, "Parse style error. (line={0})", items[0]);
      }
   }

   public void setAlias(String alias){
      _alias = alias;
   }

   public void setDescription(String description){
      _description = description;
   }

   public void setName(String name){
      _name = name;
   }

   public void setType(String type){
      _type = type;
   }

   public String type(){
      return _type;
   }

}
