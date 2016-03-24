// 初始化空间
import * as mo from './index';
mo.runtime.common.RuntimeUtil.namespace(mo, 'mo');

// 设置参数
var settings = new mo.editor.design.application.SSettings();
settings.hWindow = window;
settings.hPanel = document.body;
settings.size.set(800, 400);
// 启动应用
var application = new mo.editor.design.application.FApplication();
application.start(settings);
