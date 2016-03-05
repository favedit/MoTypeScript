import * as mo from './index';

mo.runtime.common.RRuntime.namespace(mo, 'mo');

var hCanvas = (window as any).hCanvas;
var context = new mo.plugin.coolight.graphic.g3d.wgl.FWglContext();
context.linkCanvas(hCanvas);

var stage = new mo.plugin.coolight.graphic.base.FStage();
var layer = new mo.plugin.coolight.graphic.base.FDisplayLayer();
stage.registerLayer('scene', layer);

var camera = new mo.plugin.coolight.graphic.g3d.FPerspectiveCamera();
camera.position.set(0, 0, -10);
camera.lookAt(0, 0, 0);
camera.update();
camera.projection.size.set(hCanvas.offsetWidth, hCanvas.offsetHeight);
camera.projection.update();

var cube = new mo.plugin.coolight.engine.e3d.shape.FE3dCube();
cube.setup(context);
layer.pushRenderable(cube);

var environmentConsole = mo.runtime.core.RConsole.find(mo.runtime.core.console.FEnvironmentConsole);
environmentConsole.registerValue('resource', '/ts/res');

var techniqueConsole = mo.runtime.core.RConsole.find(mo.plugin.coolight.graphic.g3d.FTechniqueConsole);
var technique = techniqueConsole.find(context, mo.plugin.coolight.engine.e3d.effect.FGeneralTechnique);

var pipelineConsole = mo.runtime.core.RConsole.find(mo.plugin.coolight.graphic.g3d.pipeline.FPipelineConsole);
var pipeline = pipelineConsole.allocPipeline();
pipeline.context = context;
pipeline.region = new mo.plugin.coolight.engine.e3d.FE3dRegion();
pipeline.technique = technique;
pipeline.camera = camera;
pipeline.stage = stage;
pipeline.process();

