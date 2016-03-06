import * as mo from './index';

mo.runtime.common.RRuntime.namespace(mo, 'mo');

var loggerConsole = mo.runtime.core.RConsole.find(mo.runtime.core.console.FLoggerConsole);

var hCanvas = (window as any).hCanvas;
var context = new mo.plugin.cl3d.graphic.wgl.FWglContext();
context.linkCanvas(hCanvas);

var stage = new mo.plugin.cl3d.base.FScene();
var layer = new mo.plugin.cl3d.base.FDisplayLayer();
stage.registerLayer('scene', layer);

var camera = new mo.plugin.cl3d.graphic.FPerspectiveCamera();
camera.position.set(0, 0, -10);
camera.lookAt(0, 0, 0);
camera.update();
camera.projection.size.set(hCanvas.offsetWidth, hCanvas.offsetHeight);
camera.projection.update();

var cube = new mo.plugin.cl3d.engine.shape.FE3dCube();
cube.setup(context);
layer.pushRenderable(cube);

var environmentConsole = mo.runtime.core.RConsole.find(mo.runtime.core.console.FEnvironmentConsole);
environmentConsole.registerValue('resource', '/ts/res');

var techniqueConsole = mo.runtime.core.RConsole.find(mo.plugin.cl3d.graphic.FTechniqueConsole);
var technique = techniqueConsole.find(context, mo.plugin.cl3d.engine.effect.FGeneralTechnique);

var pipelineConsole = mo.runtime.core.RConsole.find(mo.plugin.cl3d.graphic.pipeline.FPipelineConsole);
var pipeline = pipelineConsole.allocPipeline();
pipeline.context = context;
pipeline.region = new mo.plugin.cl3d.engine.FRegion();
pipeline.technique = technique;
pipeline.camera = camera;
pipeline.stage = stage;
pipeline.process();


var resourceConsole:mo.runtime.core.resource.FResourceConsole = mo.runtime.core.RConsole.find(mo.runtime.core.resource.FResourceConsole);
resourceConsole.loadPackageByUrl('http://localhost/ts/res/world.dat');
