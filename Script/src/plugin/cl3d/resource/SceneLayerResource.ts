import {Objects} from '../../runtime/common/lang/Objects';
import {ObjectUtil} from '../../runtime/common/lang/ObjectUtil';
import {ClassUtil} from '../../runtime/common/reflect/ClassUtil';
import {ResourceObject} from './ResourceObject';
import {SceneDisplayResource} from './SceneDisplayResource';

//==========================================================
// <T>资源场景显示层。</T>
//
// @author maocy
// @history 150115
//==========================================================
export class SceneLayerResource extends ResourceObject {
   // 代码
   public code: string;
   // 显示集合
   public displays: Objects<SceneDisplayResource>;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this.displays = new Objects<SceneDisplayResource>();
   }

   //==========================================================
   // <T>从配置里加载信息内容</T>
   //
   // @param jconfig 配置
   //==========================================================
   public loadConfig(jconfig: any) {
      // 设置属性
      this.code = jconfig.code;
      // 加载显示集合
      var jdisplays = jconfig.displays;
      var count = jdisplays.length;
      for (var n: number = 0; n < count; n++) {
         var jdisplay = jdisplays[n];
         var display: SceneDisplayResource = ClassUtil.create(SceneDisplayResource);
         display.loadConfig(jdisplay);
         this.displays.push(display);
      }
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      // 设置属性
      this.displays = ObjectUtil.dispose(this.displays);
      // 父处理
      super.dispose();
   }
}
