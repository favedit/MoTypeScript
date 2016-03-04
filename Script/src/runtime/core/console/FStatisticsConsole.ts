import {EScope} from '../../common/lang/EScope';
import {FDictionary} from '../../common/lang/FDictionary';
import {FConsole} from '../FConsole';

//==========================================================
// <T>统计控制台。</T>
//
// @console
// @author maocy
// @version 150303
//==========================================================
export class FStatisticsConsole extends FConsole {
   // @attribute
   protected _scopeCd = EScope.Local;
   //_statisticses = MO.Class.register(o, new MO.AGetter('_statisticses'));
   protected _statisticses = new FDictionary();

   //==========================================================
   // <T>注册一个统计器。</T>
   //
   // @method
   // @param n:name:String 名称
   // @param s:statistics:FStatistics 统计器
   //==========================================================
   public register(n, s) {
      this._statisticses.set(n, s);
   }

   //==========================================================
   // <T>注销一个统计器。</T>
   //
   // @method
   // @param n:name:String 名称
   // @return FStatistics 统计器
   //==========================================================
   public unregister(n) {
      return this._statisticses.remove(n);
   }

   //==========================================================
   // <T>查找一个统计器。</T>
   //
   // @method
   // @return 节点链接
   //==========================================================
   public find(n) {
      return this._statisticses.get(n);
   }

   //==========================================================
   // <T>重置所有数据。</T>
   //
   // @method
   //==========================================================
   public reset(e) {
      var statisticses = this._statisticses;
      for (var i = statisticses.count() - 1; i >= 0; i--) {
         statisticses.at(i).reset();
      }
   }

   //==========================================================
   // <T>重置所有帧数据。</T>
   //
   // @method
   //==========================================================
   public resetFrame(u, d) {
      var statisticses = this._statisticses;
      for (var i = statisticses.count() - 1; i >= 0; i--) {
         statisticses.at(i).resetFrame();
      }
   }
}
