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
   protected _scopeCd = EScope.Global;
   // @attribute 设置状态
   protected _statusSetup: boolean = false;
   // @attribute 激活状态
   protected _statusActive: boolean = false;
   // @attribute 加载状态
   protected _statusLoad: boolean = false;

   //==========================================================
   // <T>获得范围类型。</T>
   //
   // @method
   // @return 范围类型
   //==========================================================
   public get scopeCd(): EScope {
      return this._scopeCd;
   }

   //==========================================================
   // <T>配置处理。</T>
   //
   // @method
   //==========================================================
   public onSetup(): void {
   }

   //==========================================================
   // <T>配置处理。</T>
   //
   // @method
   //==========================================================
   public setup(): void {
      if (!this._statusSetup) {
         this.onSetup();
         this._statusSetup = true;
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
      if (!this._statusActive) {
         this.onActive();
         this._statusActive = true;
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
      if (this._statusActive) {
         this.onDeactive();
         this._statusActive = false;
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
      if (this._statusLoad) {
         this.onUnload();
         this._statusLoad = false;
      }
   }
}
