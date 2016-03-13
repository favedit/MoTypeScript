package org.mo.data.synchronizer;

import org.mo.com.console.FConsole;
import org.mo.com.lang.FObjects;
import org.mo.com.logging.ILogger;
import org.mo.com.logging.RLogger;
import org.mo.com.xml.FXmlDocument;
import org.mo.com.xml.FXmlNode;
import org.mo.core.aop.face.ALink;
import org.mo.core.aop.face.AProperty;
import org.mo.eng.data.IDatabaseConsole;

//============================================================
// <T>数据同步器控制台。</T>
//============================================================ 
public class FSynchronizerConsole
      extends FConsole
      implements
         ISynchronizerConsole
{
   // 日志输出接口
   private static ILogger _logger = RLogger.find(FSynchronizerConsole.class);

   // 处理间隔
   @AProperty
   protected int _processInterval;

   // 数据库链接控制台
   @ALink
   protected IDatabaseConsole _databaseConsole;

   // 同步集合
   protected FObjects<FSynchronizer> _synchronizers = new FObjects<FSynchronizer>(FSynchronizer.class);

   // 来源集合
   protected FObjects<FSynchronizerTable> _tables = new FObjects<FSynchronizerTable>(FSynchronizerTable.class);

   //============================================================
   // <T>加载配置节点处理。</T>
   //
   // @param xconfig 配置节点
   //============================================================
   public void loadConfigSynchronizer(FSynchronizer synchronizer,
                                      FXmlNode xconfig){
      // 获得表格设定
      for(FXmlNode xtable : xconfig.nodes()){
         // 检查类型
         if(!xtable.isName("Table")){
            continue;
         }
         // 检查有效性
         if(!xtable.getBoolean("valid", false)){
            continue;
         }
         // 获得信息
         FSynchronizerTable table = new FSynchronizerTable();
         synchronizer.push(table);
         table.loadConfig(xtable);
         table.setup();
         _tables.push(table);
         _logger.info(this, "load", "Add synchronizer table. (source_data_name={1}, target_data_name={2})", table.sourceDataName(), table.targetDataName());
      }
   }

   //============================================================
   // <T>加载配置节点处理。</T>
   //
   // @param xconfig 配置节点
   //============================================================
   @Override
   public void loadConfig(FXmlNode xconfig){
      for(FXmlNode xsynchronizer : xconfig.nodes()){
         // 检查类型
         if(!xsynchronizer.isName("Synchronizer")){
            continue;
         }
         // 检查有效性
         if(!xsynchronizer.getBoolean("valid", false)){
            continue;
         }
         // 加载同步器
         FSynchronizer synchronizer = new FSynchronizer();
         synchronizer.setDatabaseConsole(_databaseConsole);
         synchronizer.loadConfig(xsynchronizer);
         synchronizer.setup();
         _synchronizers.push(synchronizer);
         // 加载同步器配置
         loadConfigSynchronizer(synchronizer, xsynchronizer);
      }
   }

   //============================================================
   // <T>加载配置文件名称。</T>
   //
   // @param fileName 文件名称
   //============================================================
   @Override
   public void loadFile(String fileName){
      FXmlDocument xdocument = new FXmlDocument();
      xdocument.loadFile(fileName);
      loadConfig(xdocument.root());
   }

   //============================================================
   // <T>启动处理。</T>
   //============================================================
   @Override
   public void startup(){
      // 启动所有线程
      for(FSynchronizer synchronizer : _synchronizers){
         synchronizer.startup();
      }
      // 等待线程结束
      for(FSynchronizer synchronizer : _synchronizers){
         try{
            synchronizer.thread().join();
         }catch(Exception exception){
            _logger.error(this, "startup", exception);
         }
      }
   }
}
