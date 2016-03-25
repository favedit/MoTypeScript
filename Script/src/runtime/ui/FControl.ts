import {EEvent} from './EEvent';
import {FComponent} from './FComponent';
import {MouseEvent} from './event/MouseEvent';
import {ServiceUtil} from '../core/ServiceUtil';
import {EventService} from './service/EventService';

export class FControl extends FComponent {

   //==========================================================
   // <T>将一个页面元素和已经注册过的事件相关联。</T>
   // <P>如果指定了立即函数，则发生事件时，会立即执行立即函数。
   //    该立即函数的this指针指向当前控件实例。</P>
   // <P>如果存在注册过的队列函数，则发生事件时，该事件被排到队列中等待执行。
   //    执行时该函数的this指针指向当前控件实例。</P>
   //
   // @method
   // @param name:String 注册过的事件名称
   // @param hTag 页面元素
   // @param method 立即函数
   // @param capture 捕捉
   // @return TEvent 关联的事件对象
   //==========================================================
   public attachEvent(hTag: any, eventCd: string, method: Function = null, capture: boolean = false) {
      var eventService: EventService = ServiceUtil.find(EventService);
      eventService.attachEvent(this, hTag, eventCd, method, capture);
   }
}