import {Objects} from '../../../runtime/common/lang/Objects';
import {ObjectUtil} from '../../../runtime/common/lang/ObjectUtil';
import {IDisplayLayer} from '../../../runtime/graphic/IDisplayLayer';
import {DisplayContainer} from './DisplayContainer';
import {Region} from './Region';

//==========================================================
// <T>显示对象层。</T>
//
// @author maocy
// @history 141231
//==========================================================
export class DisplayLayer extends DisplayContainer implements IDisplayLayer {
   // 代码
   public code: string = null;
   // 清空深度配置
   public optionClearDepth = false;
   // 激活状态
   public statusActive: boolean = false;
   // 技术
   public technique = null;
   // 可见渲染集合
   public visibleRenderables = null;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      // 设置参数
      this.visibleRenderables = new Objects();
   }

   //==========================================================
   // <T>选择渲染技术。</T>
   //
   // @method
   // @param context:FG3dContext 渲染环境
   // @param name:String 名称
   //==========================================================
   //public selectTechnique(context, name) {
   //var o = this;
   //o._technique = RConsole.find(FG3dTechniqueConsole).find(context, name);
   //var technique = MO.Console.find(MO.FG3dTechniqueConsole).find(context, name);
   //this.selectTechnique(technique);
   //}

   //==========================================================
   // <T>过滤渲染集合。</T>
   //
   // @method
   // @param p:region:FRegion 渲染区域
   //==========================================================
   public filterRenderables(region: Region): boolean {
      var result: boolean = super.filterRenderables(region);
      // 复制可见列表
      if (result) {
         this.visibleRenderables.assign(region.renderables);
      }
      return result;
   }

   //==========================================================
   // <T>激活处理。</T>
   //==========================================================
   public active() {
      this.statusActive = true;
   }

   //==========================================================
   // <T>取消激活处理。</T>
   //==========================================================
   public deactive() {
      this.statusActive = false;
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose(): void {
      // 释放所有子节点
      this.visibleRenderables = ObjectUtil.dispose(this.visibleRenderables);
      // 父处理
      super.dispose();
   }
}