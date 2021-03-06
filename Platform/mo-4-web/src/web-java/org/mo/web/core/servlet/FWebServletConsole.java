package org.mo.web.core.servlet;

import org.mo.com.data.ASqlConnect;
import org.mo.com.lang.EResult;
import org.mo.com.lang.FFatalError;
import org.mo.com.lang.FMap;
import org.mo.com.lang.IRelease;
import org.mo.com.lang.RString;
import org.mo.com.lang.reflect.FClass;
import org.mo.com.lang.reflect.FMethod;
import org.mo.com.lang.reflect.RClass;
import org.mo.com.logging.ILogger;
import org.mo.com.logging.RLogger;
import org.mo.com.message.FFatalMessage;
import org.mo.core.aop.RAop;
import org.mo.core.aop.face.ALink;
import org.mo.core.aop.face.AProperty;
import org.mo.core.bind.IBindConsole;
import org.mo.data.logic.FLogicContext;
import org.mo.data.logic.ILogicContext;
import org.mo.eng.data.IDatabaseConsole;
import org.mo.eng.data.common.ISqlContext;
import org.mo.web.core.container.AContainer;
import org.mo.web.core.container.IWebContainerConsole;
import org.mo.web.core.container.common.FWebContainerItem;
import org.mo.web.core.face.AWebAuthority;
import org.mo.web.core.face.AWebRole;
import org.mo.web.core.servlet.common.FServletDescriptor;
import org.mo.web.core.servlet.common.FServletMethodDescriptor;
import org.mo.web.core.servlet.common.FWebServlet;
import org.mo.web.core.servlet.common.FWebServletMap;
import org.mo.web.core.servlet.common.IWebServletRequest;
import org.mo.web.core.servlet.common.IWebServletResponse;
import org.mo.web.core.servlet.common.XAopServlet;
import org.mo.web.core.session.IWebSession;
import org.mo.web.protocol.common.IWebAccessRule;
import org.mo.web.protocol.context.IWebContext;

//============================================================
// <T>网络处理控制台。</T>
// <P>根据访问的地址，对页面处理执行分发处理。</P>
//============================================================
public class FWebServletConsole
      implements
         IWebServletConsole
{
   // 日志输出接口
   private static ILogger _logger = RLogger.find(FWebServletConsole.class);

   // 绑定控制台
   @ALink
   protected IBindConsole _bindConsole;

   // 数据控制台
   @ALink
   protected IDatabaseConsole _databaseConsole;

   // 表单控制台
   @ALink
   protected IWebContainerConsole _formConsole;

   // 传送数据时使用编码方式
   @AProperty
   protected String _encoding;

   // 数据环境类名称
   @AProperty(name = "logic_context")
   protected String _logicContextClassName;

   // 逻辑环境类对象
   protected Class<FLogicContext> _logicContextClass;

   // 访问规则类名称
   @AProperty(name = "access_rule")
   protected String _accessRuleClassName;

   // 访问规则
   protected IWebAccessRule _accessRule;

   // 描述器集合
   @SuppressWarnings("rawtypes")
   protected FMap<Class, FServletDescriptor> _descriptors = new FMap<Class, FServletDescriptor>(Class.class, FServletDescriptor.class);

   // 处理集合
   protected FWebServletMap _servlets = new FWebServletMap();

   //============================================================
   // <T>获得编码。</T>
   //
   // @return 编码
   //============================================================
   public String encoding(){
      return _encoding;
   }

   //============================================================
   // <T>根据名称查找函数。</T>
   //
   // @param clazz 类名称
   // @param name 函数名称
   // @return 函数
   //============================================================
   public FServletMethodDescriptor findMethod(FClass<?> clazz,
                                              String name){
      // 查找类描述器
      FServletDescriptor descriptor = _descriptors.get(clazz.nativeObject(), null);
      if(descriptor == null){
         descriptor = new FServletDescriptor(clazz.nativeObject());
         _descriptors.set(clazz.nativeObject(), descriptor);
      }
      // 查找函数描述器
      name = (name != null) ? name.toLowerCase() : "process";
      FServletMethodDescriptor methodDescriptor = null;
      if(descriptor.contains(name)){
         methodDescriptor = descriptor.find(name);
      }else{
         for(FMethod method : clazz.methods(false)){
            if(name.equalsIgnoreCase(method.name())){
               methodDescriptor = new FServletMethodDescriptor();
               methodDescriptor.setServletDescriptor(descriptor);
               methodDescriptor.build(method.nativeObject());
               break;
            }
         }
         descriptor.push(name, methodDescriptor);
      }
      return methodDescriptor;
   }

   //============================================================
   // <T>根据名称查找处理。</T>
   //
   // @param name 名称
   // @return 处理
   //============================================================
   public FWebServlet findServlet(String name){
      name = RString.nvl(name).toLowerCase();
      FWebServlet servlet = _servlets.get(name, null);
      if(servlet == null){
         XAopServlet xservlet = RAop.configConsole().findNode(XAopServlet.NAME, name);
         if(xservlet != null){
            servlet = new FWebServlet();
            servlet.construct(xservlet);
            _servlets.set(name, servlet);
         }
      }
      return servlet;
   }

   //============================================================
   // <T>根据名称查找实例。</T>
   //
   // @param name 名称
   // @return 实例
   //============================================================
   @Override
   public Object findInstance(String name){
      Object instance = null;
      FWebServlet servlet = findServlet(name);
      if(null != servlet){
         String face = servlet.face();
         if(!RString.isBlank(face)){
            instance = RAop.find(face);
            if(instance == null){
               _logger.debug(this, "execute", "Can't find servlet [face:{1}]", face);
            }
         }
      }
      if(_logger.debugAble()){
         _logger.debug(this, "execute", "Find servlet [{1}]->{2}]", name, instance);
      }
      return instance;
   }

   //============================================================
   // <T>查找指定类对应的参数信息。</T>
   //
   // @param clazz 类对象
   // @param name 名称
   // @return 参数信息
   //============================================================
   protected Object findTypeParameter(IWebContext context,
                                      Class<?> clazz){
      return null;
   }

   //   //============================================================
   //   // <T>检查会话是否有效。</T>
   //   //
   //   // @param context 页面环境
   //   // @param logicContext 逻辑环境
   //   // @param input 输入信息
   //   // @param output 输出信息
   //   // @return 处理结果
   //   //============================================================
   //   public EResult checkSession(IWebContext context,
   //                               ILogicContext logicContext,
   //                               IWebServletRequest request,
   //                               IWebServletResponse response){
   //      return EResult.Success;
   //   }
   //
   //   //============================================================
   //   // <T>检查会话是否登录。</T>
   //   //
   //   // @param context 页面环境
   //   // @param logicContext 逻辑环境
   //   // @param input 输入信息
   //   // @param output 输出信息
   //   // @return 处理结果
   //   //============================================================
   //   public EResult checkLogin(IWebContext context,
   //                             ILogicContext logicContext,
   //                             IWebServletRequest request,
   //                             IWebServletResponse response){
   //      IWebSession session = context.session();
   //      if(!session.user().isLogin()){
   //         // 返回用户未登录画面
   //         return null;
   //      }
   //      return EResult.Success;
   //   }

   //============================================================
   // <T>执行后处理。</T>
   //
   // @return 处理结果
   //============================================================
   public EResult executeBefore(){
      return EResult.Success;
   }

   //============================================================
   // <T>执行后处理。</T>
   //
   // @return 处理结果
   //============================================================
   public EResult executeAfter(Object result){
      return EResult.Success;
   }

   //============================================================
   // <T>逻辑处理。</T>
   //
   // @param name 名称
   // @param context 环境
   // @param request 请求
   // @param response 应答
   // @return 处理结果
   //============================================================
   @Override
   public Object execute(String name,
                         IWebContext context,
                         IWebServletRequest request,
                         IWebServletResponse response){
      Throwable throwable = null;
      FWebServlet servlet = findServlet(name);
      if(servlet == null){
         _logger.warn(this, "execute", "Can't find servlet config [{1} -> {2}]", name, servlet);
         return null;
      }
      Object instance = findInstance(name);
      if(instance == null){
         _logger.warn(this, "execute", "Can't find servlet instance [{1} -> {2}]", name, instance);
         return null;
      }
      // find invoke method
      String action = RString.nvl(context.parameter("do"), "process");
      FServletMethodDescriptor methodDescriptor = findMethod(servlet.faceClass(), action);
      if(methodDescriptor == null){
         _logger.warn(this, "execute", "Can't find method in servlet. [{1}.{2}]", instance, action);
         return null;
      }
      _logger.debug(this, "execute", "Process servlet. {1}:{2}->{3}", name, instance, action);
      //............................................................
      // 建立数据环境
      ILogicContext logicContext = null;
      if(_logicContextClass != null){
         try{
            FLogicContext newLogicContext = _logicContextClass.newInstance();
            newLogicContext.linkDatabaseConsole(_databaseConsole);
            logicContext = newLogicContext;
         }catch(Exception e){
            throw new FFatalError(e);
         }
      }else{
         logicContext = new FLogicContext(_databaseConsole);
      }
      // 检查当前处理是否需要会话
      if(methodDescriptor.sessionRequire()){
         if(_accessRule != null){
            EResult resultCd = _accessRule.checkSession(context, logicContext);
            if(resultCd != EResult.Success){
               return null;
            }
         }
      }
      // 检查当前处理是否需要登录
      if(methodDescriptor.loginRequire()){
         if(_accessRule != null){
            EResult resultCd = _accessRule.checkLogin(context, logicContext);
            if(resultCd != EResult.Success){
               return null;
            }
         }
      }
      // 检查当前处理是否需要登录
      AWebRole role = methodDescriptor.role();
      AWebAuthority authority = methodDescriptor.authority();
      if((role != null) || (authority != null)){
         if(_accessRule != null){
            EResult resultCd = _accessRule.checkAuthority(context, logicContext, role, authority);
            if(resultCd != EResult.Success){
               return null;
            }
         }
      }
      //............................................................
      Object result = null;
      Class<?>[] types = methodDescriptor.types();
      AContainer[] aforms = methodDescriptor.forms();
      ASqlConnect[] aconnects = methodDescriptor.sqlConnects();
      int paramCount = types.length;
      FWebContainerItem[] forms = new FWebContainerItem[paramCount];
      Object[] params = new Object[paramCount];
      try{
         for(int n = 0; n < paramCount; n++){
            Class<?> type = types[n];
            Object value = null;
            if(type == IWebContext.class){
               // 参数为网络环境对象时
               value = context;
            }else if(type == IWebSession.class){
               // 参数为网络线程对象时
               value = context.session();
            }else if((type == ISqlContext.class) || (type == ILogicContext.class)){
               // 参数对象为数据环境对象
               value = logicContext;
               ASqlConnect aconnect = aconnects[n];
               if(aconnect != null){
                  logicContext.setDefaultName(aconnect.name());
               }
            }else if(type == IWebServletRequest.class){
               // 参数对象为网络输入对象
               value = request;
            }else if(type == IWebServletResponse.class){
               // 参数对象为网络输出对象
               value = response;
            }else if(aforms[n] != null){
               // 参数为表单对象时
               forms[n] = _formConsole.findContainer(context, aforms[n], type);
               value = forms[n].container();
               context.define(aforms[n].name(), value);
            }else{
               // 内部设置
               value = findTypeParameter(context, type);
               // 绑定类型
               if(value == null){
                  value = _bindConsole.find(type);
               }
               // 接口类型
               if(value == null){
                  if(type.isInterface()){
                     value = _bindConsole.find(type);
                  }
               }
               // 未知类型
               if(value == null){
                  throw new FFatalError("Unknown param type. (type={1})", type);
               }
            }
            params[n] = value;
         }
         result = methodDescriptor.invoke(instance, params);
      }catch(Exception exception){
         throwable = exception;
         _logger.error(this, "execute", exception);
         context.messages().push(new FFatalMessage(exception));
      }finally{
         // 释放所有调用参数
         if(params != null){
            for(Object param : params){
               if(param != logicContext){
                  if(param instanceof IRelease){
                     try{
                        ((IRelease)param).release();
                     }catch(Exception e){
                        throwable = e;
                     }
                  }
               }
            }
         }
         // 释放数据库链接
         if(logicContext != null){
            if(throwable == null){
               logicContext.commit();
            }else{
               logicContext.rollback();
            }
            try{
               logicContext.release();
            }catch(Exception e){
               throw new FFatalError(e);
            }
            logicContext = null;
         }
      }
      return result;
   }

   //============================================================
   // <T>逻辑处理。</T>
   //
   // @param uri 地址
   // @param context 环境
   // @param request 请求
   // @param response 应答
   // @return 处理结果
   //============================================================
   @Override
   public Object executeUri(String uri,
                            IWebContext context,
                            IWebServletRequest request,
                            IWebServletResponse response){
      // 分解地址
      int index = uri.indexOf('/', 1);
      if(index == -1){
         return null;
      }
      String name = uri.substring(0, index);
      String parameter = uri.substring(index);
      context.parameters().set(IWebServletConstant.PARAMETER_URI, parameter);
      // 执行处理
      return execute(name, context, request, response);
   }

   //============================================================
   // <T>初始化配置信息。</T>
   //============================================================
   public void initializeConfig(){
      // 设置逻辑环境类对象
      if(!RString.isEmpty(_logicContextClassName)){
         _logicContextClass = RClass.findClass(_logicContextClassName);
      }
      // 设置访问权限类对象
      if(!RString.isEmpty(_accessRuleClassName)){
         try{
            Class<?> accessRuleClass = RClass.findClass(_accessRuleClassName);
            _accessRule = (IWebAccessRule)accessRuleClass.newInstance();
         }catch(Exception exception){
            throw new FFatalError(exception);
         }
      }
   }
}
