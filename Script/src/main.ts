import * as mo from './index';
// 初始化控件
mo.runtime.common.RRuntime.namespace(mo, 'mo');
// 设置参数
var settings = new mo.runtime.framework.SSettings();
settings.hDocument = document;
settings.hPanel = document.body;
settings.size.set(800, 400);
// 启动应用
var application = new mo.editor.design.application.FApplication();
application.start(settings);


// import {FEnvironmentConsole} from './runtime/core/console/FEnvironmentConsole';
// import {FTemplateResourceConsole} from './plugin/cl3d/resource/FTemplateResourceConsole';
// import {FE3dModelConsole} from './plugin/cl3d/engine/instance/FE3dModelConsole';

// var loggerConsole = mo.runtime.core.RConsole.find(mo.runtime.core.console.FLoggerConsole);

// var hCanvas = (window as any).hCanvas;
// var context = new mo.plugin.cl3d.graphic.wgl.FWglContext();
// context.linkCanvas(hCanvas);

// var scene = new mo.plugin.cl3d.base.FScene();
// var layer = new mo.plugin.cl3d.base.FDisplayLayer();
// scene.registerLayer('scene', layer);

// var camera = new mo.plugin.cl3d.graphic.FPerspectiveCamera();
// camera.position.set(0, 0, -20);
// camera.lookAt(0, 0, 0);
// camera.update();
// camera.projection.size.set(hCanvas.offsetWidth, hCanvas.offsetHeight);
// camera.projection.update();

// //var cube = new mo.plugin.cl3d.engine.shape.FCube();
// //var cube = new mo.plugin.cl3d.engine.shape.FSphere();
// //cube.setup(context);
// //layer.pushRenderable(cube);

// var environmentConsole = mo.runtime.core.RConsole.find(mo.runtime.core.console.FEnvironmentConsole);
// environmentConsole.registerValue('resource', '/ts/res');

// var templateResourceConsole: FTemplateResourceConsole = mo.runtime.core.RConsole.find(FTemplateResourceConsole);
// var templateResource = templateResourceConsole.loadByUrl('http://localhost/ts/res/model/xiong/xiong.template');
// // model.matrix.rx = -Math.PI / 2;
// // model.matrix.ry = Math.PI / 2;
// // model.matrix.sx = 0.1;
// // model.matrix.sy = 0.1;
// // model.matrix.sz = 0.1;
// // model.matrix.updateForce();
// // layer.pushDisplay(model);

// // var modelConsole: FE3dModelConsole = mo.runtime.core.RConsole.find(FE3dModelConsole);
// // var model = modelConsole.allocByUrl(context, 'http://localhost/ts/res/model/xiong/xiong.model');
// // model.matrix.rx = -Math.PI / 2;
// // model.matrix.ry = Math.PI / 2;
// // model.matrix.sx = 0.1;
// // model.matrix.sy = 0.1;
// // model.matrix.sz = 0.1;
// // model.matrix.updateForce();
// // layer.pushDisplay(model);

// var techniqueConsole = mo.runtime.core.RConsole.find(mo.plugin.cl3d.graphic.FTechniqueConsole);
// var technique = techniqueConsole.find(context, mo.plugin.cl3d.engine.effect.FGeneralTechnique);

// var pipelineConsole = mo.runtime.core.RConsole.find(mo.plugin.cl3d.graphic.pipeline.FPipelineConsole);
// var pipeline = pipelineConsole.alloc();
// pipeline.context = context;
// pipeline.region = new mo.plugin.cl3d.engine.FRegion();
// pipeline.technique = technique;
// pipeline.camera = camera;
// pipeline.scene = scene;
// pipeline.start();

// //var resourceConsole:mo.runtime.core.resource.FResourceConsole = mo.runtime.core.RConsole.find(mo.runtime.core.resource.FResourceConsole);
// //resourceConsole.loadPackageByUrl('http://localhost/ts/res/world.dat');

// //var modelResourceConsole: mo.plugin.cl3d.resource.FModelResourceConsole = mo.runtime.core.RConsole.find(mo.plugin.cl3d.resource.FModelResourceConsole);
// //var modelResource = modelResourceConsole.loadByUrl('http://localhost/ts/res/model/xiong.model');
