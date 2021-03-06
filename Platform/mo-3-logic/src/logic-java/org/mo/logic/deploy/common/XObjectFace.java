/*
 * @(#)XObjectFace.java
 *
 * Copyright 2008 microbject, All Rights Reserved.
 *
 */
package org.mo.logic.deploy.common;

import org.mo.com.xml.IXmlObject;

/**
 * <p>对象对象的XML节点基类</p>
 *
 * @author system
 */
public interface XObjectFace
      extends
         IXmlObject
{
   String NAME = "IObject";

   /**
    * 名称的名称定义
    */
   String PTY_NAME = "name";

   /**
    * 标签的名称定义
    */
   String PTY_LABEL = "label";

   /**
    * 有效性的名称定义
    */
   String PTY_IS_VALID = "is_valid";

   /**
    * 描述信息的名称定义
    */
   String PTY_NOTE = "note";

   /**
    * 获得名称的内容。
    *
    * @return 名称
    */
   String getName();

   /**
    * 设置名称的内容。
    *
    * @param value 名称
    */
   void setName(String value);

   /**
    * 获得标签的内容。
    *
    * @return 标签
    */
   String getLabel();

   /**
    * 设置标签的内容。
    *
    * @param value 标签
    */
   void setLabel(String value);

   /**
    * 获得有效性的内容。
    *
    * @return 有效性
    */
   Boolean getIsValid();

   /**
    * 设置有效性的内容。
    *
    * @param value 有效性
    */
   void setIsValid(Boolean value);

   /**
    * 获得描述信息的内容。
    *
    * @return 描述信息
    */
   String getNote();

   /**
    * 设置描述信息的内容。
    *
    * @param value 描述信息
    */
   void setNote(String value);
}
