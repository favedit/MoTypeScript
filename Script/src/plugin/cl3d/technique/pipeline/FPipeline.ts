import {ObjectBase} from '../../../../runtime/common/lang/ObjectBase';
import {Listeners} from '../../../../runtime/common/lang/Listeners';
import {ObjectUtil} from '../../../../runtime/common/lang/ObjectUtil';
import {FCamera} from '../../../runtime/graphic/camera/FCamera';
import {FGraphicContext} from '../../graphic/FGraphicContext';
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
   // 相机
   public camera: FCamera;
   // 激活状态
   public statusActive: boolean;
   // 进入帧监听器
   public enterFrameListeners: Listeners;
   // 离开帧监听器
   public leaveFrameListeners: Listeners;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this.enterFrameListeners = new Listeners(this);
      this.leaveFrameListeners = new Listeners(this);
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
      // 进入帧处理
      this.enterFrameListeners.process();
      // 场景处理
      this.scene.process(this.region);
      // 渲染处理
      this.onProcess();
      // 离开帧处理
      this.leaveFrameListeners.process();
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

   //==========================================================
   // <T>停止处理。</T>
   //==========================================================
   public dispose() {
      this.enterFrameListeners = ObjectUtil.dispose(this.enterFrameListeners);
      this.leaveFrameListeners = ObjectUtil.dispose(this.leaveFrameListeners);
      super.dispose();
   }
}