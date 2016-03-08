import {FObjects} from '../../../runtime/common/lang/FObjects';
import {FRequest} from '../FRequest';

//==========================================================
// <T>复合请求处理。</T>
//==========================================================
export class FCompositeRequest extends FRequest {
   // 子请求集合
   public requests: FObjects<FRequest> = null;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor(requests: FObjects<FRequest> = null) {
      super();
      if (requests) {
         this.requests = requests;
      } else {
         this.requests = new FObjects<FRequest>();
      }
   }

   //==========================================================
   // <T>创建处理。</T>
   //==========================================================
   public static create(request1: FRequest, request2: FRequest): FCompositeRequest {
      var result: FCompositeRequest = null;
      if (request1 instanceof FCompositeRequest) {
         result = request1.append(request2);
      } else {
         result = new FCompositeRequest();
         result.append(request1);
         result.append(request2);
      }
      return result;
   }

   //==========================================================
   // <T>追加处理。</T>
   //==========================================================
   public append(request: FRequest) {
      this.requests.push(request);
      return this;
   }

   //==========================================================
   // <T>撤销处理。</T>
   //==========================================================
   public onUndo() {
      var subRequests: FObjects<FRequest> = this.requests;
      var unlock = subRequests.count() - 1;
      for (; 0 <= unlock; unlock--) {
         subRequests[unlock].onUndo();
      }
   }

   //==========================================================
   // <T>重做处理。</T>
   //==========================================================
   public onRedo() {
      var subRequests: FObjects<FRequest> = this.requests;
      var count: number = subRequests.count();
      for (var n: number = 0; n < count; n++) {
         var request: FRequest = subRequests.at(n);
         request.onRedo();
      }
   }

   //==========================================================
   // <T>提交处理。</T>
   //==========================================================
   public onCommit() {
   }
}
