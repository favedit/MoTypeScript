import {FError} from '../../../../runtime/common/lang/FError';
import {ObjectUtil} from '../../../../runtime/common/lang/ObjectUtil';
import {SBorderLine} from './SBorderLine';

//==========================================================
// <T>边框。</T>
//
// @struct
// @author maocy
// @version 150611
//==========================================================
export class SBorder {
   // @attribute
   public valid: boolean = false;
   public left: SBorderLine = new SBorderLine();
   public top: SBorderLine = new SBorderLine();
   public right: SBorderLine = new SBorderLine();
   public bottom: SBorderLine = new SBorderLine();

   //============================================================
   // <T>解析字符串。</T>
   //
   // @param source:String 字符串
   //============================================================
   public parse(source) {
      var items = source.split(',')
      if (items.length == 4) {
         this.left.parse(items[0]);
         this.top.parse(items[1]);
         this.right.parse(items[2]);
         this.bottom.parse(items[3]);
      } else {
         throw new FError(this, "Parse value failure. (source={1})", source);
      }
   }

   //============================================================
   // <T>获得字符串。</T>
   //
   // @return String 字符串
   //============================================================
   public toString() {
      return this.left + ',' + this.top + ',' + this.right + ',' + this.bottom;
   }

   //============================================================
   // <T>释放处理。</T>
   //
   // @method
   //============================================================
   public dispose() {
      this.left = ObjectUtil.dispose(this.left)
      this.top = ObjectUtil.dispose(this.top)
      this.right = ObjectUtil.dispose(this.right)
      this.bottom = ObjectUtil.dispose(this.bottom)
   }
}
