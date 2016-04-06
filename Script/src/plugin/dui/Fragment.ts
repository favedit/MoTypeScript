import {Container} from './Container';

export class Fragment extends Container {

   public properties: any;

   //==========================================================
   // <T>设置属性集合。</T>
   //
   // @params attributes 属性集合
   //==========================================================
   public setProperties(attributes: any) {
      this.properties = attributes;
   }

}