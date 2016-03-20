import {FObject} from '../../../../runtime/common/lang/FObject';
import {FCamera} from '../../../runtime/graphic/camera/FCamera';
import {FContext} from '../../graphic/FContext';
import {FContent} from '../../graphic/FContent';
import {FTechnique} from '../FTechnique';
import {FSelectTechnique} from '../FSelectTechnique';
import {FScene} from '../../base/FScene';
import {FRegion} from '../../base/FRegion';

//==========================================================
// <T>立方渲染纹理。</T>
//
// @author maocy
// @history 141231
//==========================================================
export abstract class FPipeline extends FContent {
   // 场景
   public scene: FScene;

   // 绘制技术
   public drawTechnique: FTechnique;

   // 选择技术
   public selectTechnique: FSelectTechnique;

   // 舞台
   public region: FRegion;

   // 舞台
   public camera: FCamera;

   // 激活状态
   public statusActive: boolean;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
   }

   //==========================================================
   // <T>配置处理。</T>
   //==========================================================
   public setup() {
   }

   //==========================================================
   // <T>逻辑处理。</T>
   //
   // @method
   //==========================================================
   public abstract onProcess(): boolean;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public process() {
      this.scene.process(this.region);
      this.onProcess();
   }

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public selectTest(x: number, y: number): any {
      return this.selectTechnique.test(this.region, x, y);
   }

   //==========================================================
   // <T>启动处理。</T>
   //==========================================================
   public start() {
      this.statusActive = true;
   }

   //==========================================================
   // <T>停止处理。</T>
   //==========================================================
   public stop() {
      this.statusActive = false;
   }
}