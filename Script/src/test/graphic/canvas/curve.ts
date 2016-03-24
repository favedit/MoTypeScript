import {RRuntime} from '../../runtime/common/RRuntime';
import {RConsole} from '../../runtime/core/RConsole';
import {FEnvironmentConsole} from '../../runtime/core/console/FEnvironmentConsole';
import {FDeviceConsole} from '../../runtime/ui/console/FDeviceConsole';
import {FSimpleScene} from '../../plugin/cl3d/framework/FSimpleScene';
import {FPath3} from '../../runtime/graphic/shape/brep/FPath3';
import {FCurve3Renderable} from '../../plugin/cl3d/shape/FCurve3Renderable';
import {FCanvas} from '../../plugin/cl3d/framework/FCanvas';

// 初始化空间
import * as mo from '../../index';
RRuntime.namespace(mo, 'mo');
//............................................................
// 设置环境
var deviceConsole = RConsole.find(FDeviceConsole);
deviceConsole.setup(window);
var environmentConsole = RConsole.find(FEnvironmentConsole);
environmentConsole.registerValue('resource', '/sk/res');
//............................................................
// 创建画板
var canvas = new FCanvas();
canvas.size.set(800, 200);
canvas.setup(window.document.body);
var context = canvas.graphicContext;
// 创建场景
var scene = canvas.scene = new FSimpleScene();
scene.linkGraphicContext(context);
scene.setup();
scene.backgroundColor.set(0.9, 0.9, 0.9, 1);
// 创建相机
var camera = canvas.camera;
camera.position.set(0, 0, -20);
camera.lookAt(0, 0, 0);
camera.update();
//............................................................
// 创建线段
var path3 = new FPath3();
path3.moveTo(0, 0, 0);
path3.lineTo(1, 1, 0);
path3.lineTo(2, 2, 1);
path3.lineTo(2, 2, 2);
var renderable = new FCurve3Renderable(path3);
renderable.setup(context);
scene.contentLayer.push(renderable);
//............................................................
// 启动绘制
canvas.start();
