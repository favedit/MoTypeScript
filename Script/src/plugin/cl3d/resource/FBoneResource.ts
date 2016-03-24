import {ObjectBase} from '../../runtime/common/lang/ObjectBase';
import {Objects} from '../../runtime/common/lang/Objects';
import {RClass} from '../../runtime/common/reflect/RClass';
import {FDataStream} from '../../runtime/common/io/FDataStream';

//==========================================================
// <T>资源骨头信息。</T>
//
// @author maocy
// @history 150110
//==========================================================
export class FBoneResource extends ObjectBase {
   // 索引
   public index: number = null;
   // 跟踪
   public track: any = null;
   // 骨头集合
   public bones: Objects<FBoneResource> = null;

   //==========================================================
   // <T>从输入流里反序列化信息内容</T>
   //
   // @method
   // @param input 数据流
   //==========================================================
   public unserialize(input: FDataStream) {
      // 读取属性
      this.index = input.readUint8();
      // 读取所有子骨头
      var count: number = input.readUint8();
      if (count > 0) {
         var bones = this.bones = new Objects<FBoneResource>();
         for (var n: number = 0; n < count; n++) {
            var bone = RClass.create(FBoneResource);
            bone.unserialize(input);
            bones.push(bone);
         }
      }
   }
}