package org.mo.data.dataset.common;

//============================================================
// <T>数据集对象对象的XML节点基类。</T>
//============================================================
public interface XDatasetFace
      extends
         XObjectFace,
         XAccessFace
{
   // 名称定义
   String NAME = "IDataset";

   // 数据名称的名称定义
   String PTY_DATA_NAME = "data_name";

   // 数据别称的名称定义
   String PTY_DATA_ALIAS = "data_alias";

   // 数据别称的名称定义
   String PTY_DATA_LOGIC = "data_logic";

   // 逻辑接口的名称定义
   String PTY_LOGIC_NAME = "logic_name";

   // 处理接口的名称定义
   String PTY_LOGIC_FACE = "logic_face";

   // 单元类的名称定义
   String PTY_LOGIC_ENTITY = "logic_entity";

   // 处理类的名称定义
   String PTY_LOGIC_CLASS = "logic_class";

   // 新建逻辑的名称定义
   String PTY_LOGIC_INSERT = "logic_insert";

   // 更新逻辑的名称定义
   String PTY_LOGIC_UPDATE = "logic_update";

   // 删除逻辑的名称定义
   String PTY_LOGIC_DELETE = "logic_delete";

   //============================================================
   // <T>获得数据名称的内容。</T>
   //
   // @return 数据名称
   //============================================================
   String getDataName();

   //============================================================
   // <T>设置数据名称的内容。</T>
   //
   // @param value 数据名称
   //============================================================
   void setDataName(String value);

   //============================================================
   // <T>获得数据别称的内容。</T>
   //
   // @return 数据别称
   //============================================================
   String getDataAlias();

   //============================================================
   // <T>设置数据别称的内容。</T>
   //
   // @param value 数据别称
   //============================================================
   void setDataAlias(String value);

   //============================================================
   // <T>获得数据别称的内容。</T>
   //
   // @return 数据别称
   //============================================================
   String getDataLogic();

   //============================================================
   // <T>设置数据别称的内容。</T>
   //
   // @param value 数据别称
   //============================================================
   void setDataLogic(String value);

   //============================================================
   // <T>获得逻辑接口的内容。</T>
   //
   // @return 逻辑接口
   //============================================================
   String getLogicName();

   //============================================================
   // <T>设置逻辑接口的内容。</T>
   //
   // @param value 逻辑接口
   //============================================================
   void setLogicName(String value);

   //============================================================
   // <T>获得处理接口的内容。</T>
   //
   // @return 处理接口
   //============================================================
   String getLogicFace();

   //============================================================
   // <T>设置处理接口的内容。</T>
   //
   // @param value 处理接口
   //============================================================
   void setLogicFace(String value);

   //============================================================
   // <T>获得单元类的内容。</T>
   //
   // @return 单元类
   //============================================================
   String getLogicEntity();

   //============================================================
   // <T>设置单元类的内容。</T>
   //
   // @param value 单元类
   //============================================================
   void setLogicEntity(String value);

   //============================================================
   // <T>获得处理类的内容。</T>
   //
   // @return 处理类
   //============================================================
   String getLogicClass();

   //============================================================
   // <T>设置处理类的内容。</T>
   //
   // @param value 处理类
   //============================================================
   void setLogicClass(String value);

   //============================================================
   // <T>获得新建逻辑的内容。</T>
   //
   // @return 新建逻辑
   //============================================================
   String getLogicInsert();

   //============================================================
   // <T>设置新建逻辑的内容。</T>
   //
   // @param value 新建逻辑
   //============================================================
   void setLogicInsert(String value);

   //============================================================
   // <T>获得更新逻辑的内容。</T>
   //
   // @return 更新逻辑
   //============================================================
   String getLogicUpdate();

   //============================================================
   // <T>设置更新逻辑的内容。</T>
   //
   // @param value 更新逻辑
   //============================================================
   void setLogicUpdate(String value);

   //============================================================
   // <T>获得删除逻辑的内容。</T>
   //
   // @return 删除逻辑
   //============================================================
   String getLogicDelete();

   //============================================================
   // <T>设置删除逻辑的内容。</T>
   //
   // @param value 删除逻辑
   //============================================================
   void setLogicDelete(String value);
}
