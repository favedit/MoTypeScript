import {FObject} from '../../../runtime/common/lang/FObject';
import {SMaterialInfo} from './SMaterialInfo';

//==========================================================
// <T>基础渲染材质。</T>
//
// @author maocy
// @history 150107
//==========================================================
export class FBaseMaterial extends FObject {
   // @attribute 名称
   public name: string = null;
   // @attribute 材质信息
   public info = new SMaterialInfo();

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
   }

   //==========================================================
   // <T>接收数据。</T>
   //
   // @method
   // @param info:SG3dMaterialInfo 材质信息
   //==========================================================
   public assignInfo(info) {
      this.info.assign(info);
   }

   //==========================================================
   // <T>接收材质信息。</T>
   //
   // @method
   // @param material:SG3dMaterialInfo 材质信息
   //==========================================================
   public assign(material) {
      this.info.assign(material.info());
   }

   //==========================================================
   // <T>计算材质信息。</T>
   //
   // @method
   // @param material:SG3dMaterialInfo 材质信息
   //==========================================================
   public calculate(material) {
      this.info.calculate(material.info());
   }
}
