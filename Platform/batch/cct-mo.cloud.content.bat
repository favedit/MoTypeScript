@CLS

@SET APP_ROOT=%cd%\..

@SET JAVA_HOME=C:\Program Files\Java\jdk1.8.0_66
@SET CATALINA_OPTS=-Xms512m -Xmx2048m
@SET CATALINA_HOME=%APP_ROOT%\mt-server\cloud.content
@SET MOBJ_MODE=Logic
@SET MOBJ_JS=Test
@SET MOBJ_CONFIG=application-work
@SET JAVA_OPTS=-Duser.mobj.application=%APP_ROOT% -Duser.mobj.mode=%MOBJ_MODE% -Duser.mobj.js=%MOBJ_JS% -Duser.mobj.config=%MOBJ_CONFIG%

@"%CATALINA_HOME%\bin\catalina.bat" run
