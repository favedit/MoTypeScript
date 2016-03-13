package org.mo.web.core.service.servlet;

import java.io.OutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.mo.com.json.FJsonDocument;
import org.mo.com.json.FJsonObject;
import org.mo.com.lang.RString;
import org.mo.com.lang.cultrue.RCulture;
import org.mo.com.logging.ILogger;
import org.mo.com.logging.RLogger;
import org.mo.com.message.EMessageLevel;
import org.mo.web.core.service.common.RWebService;
import org.mo.web.core.session.IWebSession;
import org.mo.web.protocol.common.IWebContentType;
import org.mo.web.protocol.common.IWebHeaderType;
import org.mo.web.protocol.context.FWebContext;
import org.mo.web.protocol.context.FWebJsonInput;
import org.mo.web.protocol.context.FWebJsonOutput;
import org.mo.web.protocol.context.IWebContext;
import org.mo.web.protocol.context.IWebWriter;

//============================================================
// <T>页面处理模块。</T>
// <P>1. 初始化数据，创建全局应用管理对象。</P>
// <P>2. 根据页面请求，执行相应业务处理。</P>
//============================================================
public abstract class FAbstractJsonServicePostServlet
      extends FAbstractServiceServlet
{
   // 序列化标识
   private static final long serialVersionUID = 1L;

   // 日志输出接口
   private static ILogger _logger = RLogger.find(FAbstractJsonServicePostServlet.class);

   //============================================================
   // <T>网页请求逻辑对象执行开始。</T>
   //
   // @param httpRequest 页面请求对象
   // @param httpResponse 页面响应对象
   //============================================================
   @Override
   public void process(String type,
                       HttpServletRequest httpRequest,
                       HttpServletResponse httpResponse){
      long beginTick = System.nanoTime();
      String uri = null;
      FWebContext context = null;
      IWebSession session = null;
      FJsonDocument inputDocument = null;
      FJsonDocument outputDocument = null;
      FWebJsonOutput output = null;
      try{
         String language = _sessionLanguage;
         String encoding = _sessionEncoding;
         // 建立会话
         String sessionCode = null;
         if(_sessionValid){
            sessionCode = findSessionId(httpRequest);
            if(RString.isEmpty(sessionCode)){
               sessionCode = buildSessionId(httpRequest, httpResponse);
            }
            session = _sessionConsole.build(sessionCode);
            if(session != null){
               session.referIncrease();
               // 设置语言编码
               language = session.culture().countryLanguage();
               encoding = session.culture().countryEncoding();
               RCulture.link(session.culture());
            }
         }
         if(_logger.debugAble()){
            _logger.debug(this, "process", "Do{1} begin. (language={2}, charset={3}, uri={4})", type, language, encoding, httpRequest.getRequestURI());
         }
         //............................................................
         // 设置语言编码
         String serviceEncoding = _serviceConsole.encoding();
         httpRequest.setCharacterEncoding(serviceEncoding);
         httpResponse.setCharacterEncoding(serviceEncoding);
         // 获取传入内容
         inputDocument = new FJsonDocument();
         inputDocument.setOptionAttributeCareCase(false);
         // 建立网络线程信息
         context = new FWebContext(session, httpRequest, httpResponse);
         if(_logger.debugAble()){
            _logger.debug(this, "process", "Build context: {1}", context.dump());
         }
         _bindConsole.bind(IWebContext.class, context);
         _bindConsole.bind(IWebSession.class, session);
         // 设置输出信息
         httpResponse.setContentType(IWebContentType.JSON);
         httpResponse.setHeader(IWebHeaderType.PRAGMA, IWebHeaderType.NO_CACHE);
         httpResponse.setHeader(IWebHeaderType.CACHE_CONTROL, IWebHeaderType.NO_CACHE);
         httpResponse.setDateHeader(IWebHeaderType.EXPIRES, 1);
         // 设置输出内容
         outputDocument = new FJsonDocument();
         outputDocument.setOptionAttributeCareCase(false);
         // 查找服务类型
         uri = context.requestUri();
         if(uri.endsWith(".wjp")){
            uri = uri.substring(0, uri.length() - 4);
            int find = uri.lastIndexOf('/');
            if(find != -1){
               uri = uri.substring(find + 1);
            }
            // 设置URL参数到输入节点内
            FJsonObject inputNode = inputDocument.root();
            // 执行逻辑过程
            FWebJsonInput input = new FWebJsonInput(inputNode);
            FJsonObject outputNode = outputDocument.root();
            // 设置函数
            String action = context.parameter("action");
            if(RString.isEmpty(action)){
               action = input.get("action");
            }
            if(RString.isEmpty(action)){
               action = "process";
            }
            outputNode.set("method", action + "@" + uri);
            // 设置输出
            output = new FWebJsonOutput(outputNode);
            String resultCd = processLogic(uri, context, input, output);
            outputNode.set(RWebService.PtyResultCd, resultCd.toLowerCase());
            EMessageLevel levelCd = context.messages().calculateMaxLevel();
            if((levelCd != EMessageLevel.Debug) && (levelCd != EMessageLevel.Success)){
               outputNode.set(RWebService.PtyMessageCd, levelCd.toString().toLowerCase());
            }
         }
      }catch(Exception e){
         _logger.error(this, "process", e);
      }finally{
         // 释放会话引用
         if(session != null){
            RCulture.unlink();
            session.referDecrease();
         }
         _bindConsole.clear();
         // 输出内容
         if(outputDocument != null){
            try{
               // 输出服务结果
               if(_logger.debugAble()){
                  _logger.debugFull(this, "process", "Build output json.\n{1}", outputDocument.toJson());
               }
               // 转换格式
               String source = outputDocument.toJson();
               if(output != null){
                  IWebWriter writer = output.writer();
                  if(writer != null){
                     source = writer.write(source);
                  }
               }
               byte[] jsonData = source.getBytes(_sessionEncoding);
               OutputStream outputStream = httpResponse.getOutputStream();
               outputStream.write(jsonData);
            }catch(Exception e){
               _logger.error(this, "process", e);
            }
         }
         long endTick = System.nanoTime();
         if(_logger.debugAble()){
            _logger.debug(this, "process", endTick - beginTick, "Do{1} for {2}", type, uri);
         }
      }
   }
}
