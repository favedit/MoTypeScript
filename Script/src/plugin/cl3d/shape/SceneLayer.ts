import {Objects} from '../../runtime/common/lang/Objects';
import {ClassUtil} from '../../runtime/common/reflect/ClassUtil';
import {AssertUtil} from '../../runtime/common/AssertUtil';
import {DisplayLayer} from '../base/DisplayLayer';
import {SceneLayerResource} from '../resource/SceneLayerResource';
import {SceneDisplay} from './SceneDisplay';

//==========================================================
// <T>场景显示层。</T>
//
// @class
// @author maocy
// @history 150210
//==========================================================
export class SceneLayer extends DisplayLayer {
   // 资源对象
   public resource: SceneLayerResource;

   // //==========================================================
   // // <T>生成名称。</T>
   // //
   // // @method
   // // @return String 名称
   // //==========================================================
   // MO.FE3dSceneLayer_makeLabel = function FE3dSceneLayer_makeLabel(){
   //    var o = this;
   //    var resource = o.resource();
   //    var code = resource.code();
   //    var label = resource.label();
   //    if(label){
   //       return code + '[' + label + ']';
   //    }
   //    return code;
   // }

   //==========================================================
   // <T>加载空间资源。</T>
   //
   // @param resource 层资源
   //==========================================================
   public loadResource(resource: SceneLayerResource) {
      this.resource = resource;
      // 设置属性
      this.name = resource.code;
      // 加载显示集合
      var displaysResource = resource.displays;
      if (displaysResource) {
         var count = displaysResource.count();
         for (var i = 0; i < count; i++) {
            var displayResource = displaysResource.at(i);
            var display: SceneDisplay = ClassUtil.create(SceneDisplay);
            display.linkGraphicContext(this.graphicContext);
            display.loadResource(displayResource);
            this.pushDisplay(display);
         }
      }
   }

   // //==========================================================
   // // <T>逻辑处理。</T>
   // //
   // // @method
   // // @param p:region:FG3dReigon 区域
   // //==========================================================
   // MO.FE3dSceneLayer_process = function FE3dSceneLayer_process(p){
   //    var o = this;
   //    o.__base.FDisplayLayer.process.call(o, p)
   //    // 变换处理
   //    var c = o._resource.transformCd();
   //    if(c){
   //       if(c == MO.EDisplayTransform.CameraPosition){
   //          var cp = p.camera().position();
   //          o._matrix.setTranslate(cp.x, cp.y, cp.z);
   //          o._matrix.update();
   //       }
   //    }
   // }
}