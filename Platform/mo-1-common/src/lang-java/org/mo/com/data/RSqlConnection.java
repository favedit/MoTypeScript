package org.mo.com.data;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import org.mo.com.collections.SDataField;
import org.mo.com.lang.FFatalError;
import org.mo.com.lang.RString;

//============================================================
// <T>SQL数据链接工具类。</T>
//============================================================
public class RSqlConnection
{
   //============================================================
   // <T>填充数据单元。</T>
   //
   // @param unit 数据单元
   // @param columnCount 列数
   // @param names 名称
   // @param types 类型
   // @param resultSet 结果集合
   //============================================================ 
   public static SDataField[] fillFields(ResultSet resultSet) throws Exception{
      SDataField[] fields = null;
      try{
         ResultSetMetaData metaData = resultSet.getMetaData();
         int columnCount = metaData.getColumnCount();
         fields = new SDataField[columnCount];
         for(int n = 0; n < columnCount; n++){
            int columnIndex = n + 1;
            SDataField field = new SDataField();
            String name = metaData.getColumnLabel(columnIndex);
            if(RString.isEmpty(name)){
               name = metaData.getColumnName(columnIndex);
            }
            field.name = name.toLowerCase();
            field.typeCd = metaData.getColumnType(columnIndex);
            fields[n] = field;
         }
      }catch(Exception exception){
         throw new FFatalError(exception);
      }
      return fields;
   }
}
