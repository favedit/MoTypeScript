import {FObject} from '../../../runtime/common/lang/FObject';
import {FObjects} from '../../../runtime/common/lang/FObjects';
import {FError} from '../../../runtime/common/lang/FError';
import {RObject} from '../../../runtime/common/lang/RObject';
import {SPoint3} from '../../../runtime/common/math/SPoint3';
import {SVector3} from '../../../runtime/common/math/SVector3';
import {SVector4} from '../../../runtime/common/math/SVector4';
import {SMatrix3d} from '../../../runtime/common/math/SMatrix3d';
import {ERegionParameter} from './ERegionParameter';
import {FRenderable} from './FRenderable';
import {FDisplay} from './FDisplay';


//==========================================================
// <T>区域。</T>
//
// @class
// @author maocy
// @history 160305
//==========================================================
export class FRegion extends FObject {
   // @attribute
   public changed = false;
   public spaceName = null;
   public technique = null;
   public techniquePass = null;
   public camera = null;
   public projection = null;
   public directionalLight = null;
   public lights = null;
   public allRenderables = null;
   public renderables = null;
   // @attribute
   public ratioMatrix = null;
   public cameraPosition = null;
   public cameraDirection = null;
   public cameraViewMatrix = null;
   public cameraProjectionMatrix = null;
   public cameraViewProjectionMatrix = null;
   // @attribute
   public lightPosition = null;
   public lightDirection = null;
   public lightViewMatrix = null;
   public lightProjectionMatrix = null;
   public lightViewProjectionMatrix = null;
   public lightInfo = null;
   public finish = false;
   public backgroundColor = null;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 初始化参数
      this.lights = new FObjects();
      this.renderables = new FObjects();
      this.allRenderables = new FObjects();
      // 初始化参数
      this.ratioMatrix = new SMatrix3d();
      this.cameraPosition = new SPoint3();
      this.cameraDirection = new SVector3();
      this.cameraViewMatrix = new SMatrix3d();
      this.cameraProjectionMatrix = new SMatrix3d();
      this.cameraViewProjectionMatrix = new SMatrix3d();
      this.lightPosition = new SPoint3();
      this.lightDirection = new SVector3();
      this.lightViewMatrix = new SMatrix3d();
      this.lightProjectionMatrix = new SMatrix3d();
      this.lightViewProjectionMatrix = new SMatrix3d();
      this.lightInfo = new SVector4();
      //o._materialMap = RClass.create(FG3dMaterialMap);
   }

   //==========================================================
   // <T>判断是否变更过。</T>
   //
   // @method
   // @return Boolean 变更过
   //==========================================================
   public isChanged() {
      // return this._changed;
      return true;
   }

   //==========================================================
   // <T>设置技术过程。</T>
   //
   // @method
   // @param pass 技术过程
   //==========================================================
   public setTechniquePass(pass: any, finish: boolean) {
      this.techniquePass = pass;
      this.spaceName = pass.fullCode;
      this.finish = finish;
   }

   //==========================================================
   // <T>增加一个渲染对象。</T>
   //
   // @method
   // @param renderable:FRenderable 渲染对象
   //==========================================================
   public pushDisplay(display: FDisplay): void {
   }

   //==========================================================
   // <T>增加一个渲染对象。</T>
   //
   // @method
   // @param renderable:FRenderable 渲染对象
   //==========================================================
   public pushRenderable(renderable: FRenderable): void {
      this.renderables.push(renderable);
      this.allRenderables.push(renderable);
   }

   //==========================================================
   // <T>准备处理。</T>
   //
   // @method
   //==========================================================
   public prepare() {
      // 数据未改变
      this.changed = false;
      // 设置相机信息
      var camera = this.camera;
      var projection = camera.projection;
      camera.updateFrustum();
      // 修正屏幕比例
      //var pixelRatio = MO.Window.Browser.capability().pixelRatio;
      var ratioMatrix = this.ratioMatrix.identity();
      //ratioMatrix.setScaleAll(pixelRatio);
      //ratioMatrix.update();
      // 设置视角内容
      this.cameraPosition.assign(camera.position);
      this.cameraDirection.assign(camera.direction);
      //o._cameraViewMatrix.assign(ratioMatrix);
      //o._cameraViewMatrix.append(camera.matrix());
      this.cameraViewMatrix.assign(camera.matrix);
      this.cameraProjectionMatrix.assign(projection.matrix);
      this.cameraViewProjectionMatrix.assign(camera.matrix);
      //o._cameraViewProjectionMatrix.assign(ratioMatrix);
      //o._cameraViewProjectionMatrix.append(camera.matrix());
      this.cameraViewProjectionMatrix.append(projection.matrix);
      // 设置光源信息
      var light = this.directionalLight;
      if (light) {
         var lightCamera = light.camera;
         var lightCameraPosition = lightCamera.position;
         //var lp = lc.projection();
         this.lightPosition.assign(lightCamera.position);
         this.lightDirection.assign(lightCamera.direction);
         this.lightViewMatrix.assign(lightCamera.matrix);
         //o._lightProjectionMatrix.assign(lp.matrix());
         //o._lightViewProjectionMatrix.assign(lc.matrix());
         //o._lightViewProjectionMatrix.append(lp.matrix());
         //o._lightInfo.set(0, 0, lp._znear, 1.0 / lp.distance());
      }
      // 清空全部渲染对象
      this.allRenderables.clear();
   }
   
   //==========================================================
   // <T>重置处理。</T>
   //
   // @method
   //==========================================================
   public reset() {
      // 清空渲染集合
      this.renderables.clear();
   }

   //==========================================================
   // <T>计算参数数据。</T>
   //
   // @method
   // @param parameterCd:EG3dRegionParameter 参数类型
   // @return 参数内容
   //==========================================================
   public calculate(parameterCd) {
      switch (parameterCd) {
         case ERegionParameter.CameraPosition:
            return this.cameraPosition;
         case ERegionParameter.CameraDirection:
            return this.cameraDirection;
         case ERegionParameter.CameraViewMatrix:
            return this.cameraViewMatrix;
         case ERegionParameter.CameraProjectionMatrix:
            return this.cameraProjectionMatrix;
         case ERegionParameter.CameraViewProjectionMatrix:
            return this.cameraViewProjectionMatrix;
         case ERegionParameter.LightPosition:
            return this.lightPosition;
         case ERegionParameter.LightDirection:
            return this.lightDirection;
         case ERegionParameter.LightViewMatrix:
            return this.lightViewMatrix;
         case ERegionParameter.LightProjectionMatrix:
            return this.lightProjectionMatrix;
         case ERegionParameter.LightViewProjectionMatrix:
            return this.lightViewProjectionMatrix;
         case ERegionParameter.LightInfo:
            return this.lightInfo;
      }
      throw new FError(this, 'Unknown parameter type. (type_cd={1})', parameterCd);
   }

   //==========================================================
   // <T>更新处理。</T>
   //
   // @method
   //==========================================================
   public update() {
      var renderables = this.renderables;
      var count = renderables.count();
      for (var i:number = 0; i < count; i++) {
         var renderable = renderables.at(i);
         renderable.update(this);
      }
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      this.ratioMatrix = RObject.free(this.ratioMatrix);
      this.renderables = RObject.free(this.renderables);
      this.allRenderables = RObject.free(this.allRenderables);
      super.dispose();
   }
}
