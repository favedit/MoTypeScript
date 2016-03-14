import {EScope} from '../common/lang/EScope';
import {FObject} from '../common/lang/FObject';

//==========================================================
// <T>后台服务基类。</T>
//
// @reference
// @author maocy
// @version 141231
//==========================================================
export class FConsole extends FObject {
   //..........................................................
   // @attribute 范围类型
   public scopeCd = EScope.Global;
   // @attribute 设置状态
   public statusSetup: boolean = false;
   // @attribute 激活状态
   public statusActive: boolean = false;
   // @attribute 加载状态
   public statusLoad: boolean = false;

   //==========================================================
   // <T>配置处理。</T>
   //
   // @method
   //==========================================================
   public onSetup(args?: any): void {
   }

   //==========================================================
   // <T>配置处理。</T>
   //
   // @method
   //==========================================================
   public setup(args?: any): void {
      if (!this.statusSetup) {
         this.onSetup(args);
         this.statusSetup = true;
      }
   }

   /*
      //==========================================================
      // <T>加载处理。</T>
      //
      // @method
      //==========================================================
      public onLoad(): void {
      }
   
      //==========================================================
      // <T>加载处理。</T>
      //
      // @method
      //==========================================================
      public load() :void{
         if (!this._statusLoad) {
            this.onLoad();
            this._statusLoad = true;
         }
      }*/

   //==========================================================
   // <T>激活处理。</T>
   //
   // @method
   //==========================================================
   public onActive(): void {
   }

   //==========================================================
   // <T>激活处理。</T>
   //
   // @method
   //==========================================================
   public active(): void {
      if (!this.statusActive) {
         this.onActive();
         this.statusActive = true;
      }
   }

   //==========================================================
   // <T>取消激活处理。</T>
   //
   // @method
   //==========================================================
   public onDeactive(): void {
   }

   //==========================================================
   // <T>取消激活处理。</T>
   //
   // @method
   //==========================================================
   public deactive(): void {
      if (this.statusActive) {
         this.onDeactive();
         this.statusActive = false;
      }
   }

   //==========================================================
   // <T>卸载处理。</T>
   //
   // @method
   //==========================================================
   public onUnload(): void {
   }

   //==========================================================
   // <T>卸载处理。</T>
   //
   // @method
   //==========================================================
   public unload(): void {
      if (this.statusLoad) {
         this.onUnload();
         this.statusLoad = false;
      }
   }
}
