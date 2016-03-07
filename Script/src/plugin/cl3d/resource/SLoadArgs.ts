import {SObject} from '../../runtime/common/lang/SObject'

//==========================================================
// <T>资源加载参数。</T>
//
// @author maocy
// @history 151225
//==========================================================
export class SLoadArgs extends SObject {
   // 唯一编号
   public guid: string = null;
   // 代码
   public code: string = null;
   // 网络地址
   public url: string = null;
}
