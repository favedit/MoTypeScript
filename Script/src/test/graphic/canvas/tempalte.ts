import {RRuntime} from '../../runtime/common/RRuntime';
import {RConsole} from '../../runtime/core/RConsole';
import {FEnvironmentConsole} from '../../runtime/core/console/FEnvironmentConsole';
import {FDeviceConsole} from '../../runtime/ui/console/FDeviceConsole';
import {FSimpleScene} from '../../plugin/cl3d/framework/FSimpleScene';
import {FTemplateConsole} from '../../plugin/cl3d/shape/FTemplateConsole';
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
canvas.size.set(800, 400);
canvas.setup(window.document.body);
var context = canvas.graphicContext;
// 创建场景
var scene = canvas.scene = new FSimpleScene();
scene.linkGraphicContext(context);
scene.setup();
scene.backgroundColor.set(1, 1, 1, 1);
// 创建相机
var camera = canvas.camera;
camera.position.set(0, 0, -20);
camera.lookAt(0, 0, 0);
camera.update();
//............................................................
// 创建模板
var templateConsole: FTemplateConsole = RConsole.find(FTemplateConsole);
var template = templateConsole.allocByUrl(context, '/sk/res/model/xiong/xiong.template');
template.matrix.setScaleAll(0.05);
template.matrix.updateForce();
template.matrix.addRotationX(-Math.PI / 2);
template.matrix.addRotationY(Math.PI);
scene.contentLayer.push(template);
//............................................................
// 启动绘制
canvas.start();
