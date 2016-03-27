import {RuntimeUtil} from '../../runtime/common/RuntimeUtil';
import {ServiceUtil} from '../../runtime/core/ServiceUtil';
import {EnvironmentService} from '../../runtime/core/service/EnvironmentService';
import {DeviceService} from '../../runtime/ui/service/DeviceService';
import {ForwardPipeline} from '../../plugin/cl3d/technique/pipeline/ForwardPipeline';
import {FSimpleScene} from '../../plugin/cl3d/framework/FSimpleScene';
import {TemplateService} from '../../plugin/cl3d/shape/TemplateService';
import {FCanvas} from '../../plugin/cl3d/framework/FCanvas';

// 初始化空间
import * as mo from '../../index';
RuntimeUtil.namespace(mo, 'mo');
//............................................................
// 设置环境
var deviceService = ServiceUtil.find(DeviceService);
deviceService.setup(window);
var environmentConsole = ServiceUtil.find(EnvironmentService);
//environmentConsole.registerValue('resource', '/sk/res');
environmentConsole.registerValue('resource', '/asset/demo');
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
//scene.backgroundColor.set(0, 0, 0, 1);
// 创建相机
var camera = canvas.camera;
camera.position.set(0, 0, -20);
camera.lookAt(0, 0, 0);
camera.update();
//............................................................
// 创建模板
var templateService: TemplateService = ServiceUtil.find(TemplateService);
//var template = templateService.allocByUrl(context, '/sk/res/model/xiong/xiong.template');
//template.matrix.setScaleAll(0.05);
//var template = templateService.allocByUrl(context, '/sk/res/model/pvw.show.item.001/item.template');
//var template = templateService.allocByUrl(context, '/sk/res/model/pvw.show.item.002/item.template');
var template = templateService.allocByUrl(context, '${resource}/template/pvw.sc.car.01.001.template');
template.matrix.setScaleAll(0.01);
template.matrix.updateForce();
template.matrix.addRotationX(-Math.PI / 2);
//template.matrix.addRotationY(Math.PI);
scene.contentLayer.push(template);
// 设置显示
canvas.activeDisplay = template;
//............................................................
// 启动绘制
//(<ForwardPipeline>canvas.pipeline).optionShadow = true;
canvas.start();
