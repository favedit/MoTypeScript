import {Container} from './Container';

export class Element extends Container {

   public typeName: string

   //==========================================================
   // <T>设置属性集合。</T>
   //
   // @params attributes 属性集合
   //==========================================================
   public setProperties(attributes: any) {
      if (attributes) {
         for (var name in attributes) {
            var value = attributes[name];
            this.properties.set(name, value);
         }
      }
   }

   //==========================================================
   // <T>配置处理。</T>
   //==========================================================
   public setup(parameters?: any) {
   }

   //==========================================================
   // <T>配置处理。</T>
   //==========================================================
   public render() {
      var hPanel = this._hPanel = this.renderContext.hDocument.createElement(this.typeName);
      var properties = this.properties;
      var count = properties.count();
      for (var i = 0; i < count; i++) {
         var name = properties.name(i);
         var value = properties.value(i);
         hPanel[name] = value;
      }
   }

}