import {Struct} from '../../runtime/common/lang/Struct'

//==========================================================
// <T>资源加载参数。</T>
//
// @author maocy
// @history 151225
//==========================================================
export class LoadArgs extends Struct {
   // 环境
   public context: any;
   // 唯一编号
   public guid: string;
   // 代码
   public code: string;
   // 网络地址
   public url: string;
}
