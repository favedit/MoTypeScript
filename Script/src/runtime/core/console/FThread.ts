import {FObject} from '../../common/lang/FObject';
import {EThreadStatus} from './EThreadStatus';

//==========================================================
// <T>线程。</T>
//
// @class
// @author maocy
// @version 150105
//==========================================================
export class FThread extends FObject { 
   //..........................................................
   // @attribute
   //_name = MO.Class.register(o, new MO.AGetter('_name'));
   protected _name: string = null;
   //_statusCd = MO.Class.register(o, new MO.AGetter('_statusCd'), MO.EThreadStatus.Sleep);
   protected _statusCd: EThreadStatus = EThreadStatus.Sleep;
   //_interval = MO.Class.register(o, new MO.AGetSet('_interval'), 100);
   protected _interval: number = 100;
   protected _delay: number = 0;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
   }

   //==========================================================
   // <T>启动处理。</T>
   //
   // @method
   //==========================================================
   public start() {
      this._statusCd = EThreadStatus.Active;
   }

   //==========================================================
   // <T>停止处理。</T>
   //
   // @method
   //==========================================================
   public stop() {
      this._statusCd = EThreadStatus.Finish;
   }

   //==========================================================
   // <T>调用处理。</T>
   //
   // @method
   // @param interval:integer 调用间隔
   // @return 名称
   //==========================================================
   public process(interval) {
      var o = this;
      if (o._delay <= 0) {
         //o.processProcessListener(o);
         o._delay = o._interval;
      } else {
         o._delay -= interval;
      }
   }
}
