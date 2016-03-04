import {FObject} from '../../runtime/common/lang/FObject';

export class FContentObject extends FObject {

   //==========================================================
   // <T>加载JSON内容。</T>
   //
   // @param config 配置对象
   //==========================================================
   public loadJson(config: any): void {
   }

   //==========================================================
   // <T>保存JSON内容。</T>
   //
   // @param config 配置对象
   //==========================================================
   public saveJson(config: any): void {
   }

   //==========================================================
   // <T>获得JSON字符串。</T>
   //
   // @return 字符串
   //==========================================================
   public toJson(): string {
      var data: any = new Object();
      this.saveJson(data);
      return JSON.stringify(data);
   }
}
