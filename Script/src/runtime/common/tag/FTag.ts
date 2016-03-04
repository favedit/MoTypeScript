import {EResult} from '../lang/EResult';
import {FObject} from '../lang/FObject';
import {FObjects} from '../lang/FObjects';
import {FString} from '../lang/FString';
import {RString} from '../lang/RString';
import {FError} from '../lang/FError';
import {RClass} from '../reflect/RClass';

//==========================================================
// <T>标签类。</T>
//
// @class
// @author maocy
// @version 150114
//==========================================================
export class FTag extends FObject {
   //..........................................................
   // @attribute
   protected _name = 'Tag';
   protected _children = null;
   protected _trimLeft = false;
   protected _trimRight = false;

   //==========================================================
   // <T>开始处理。</T>
   //
   // @method
   // @param p:context:FTagContext 环境
   // @return EResult 处理结果
   //==========================================================
   public onBegin(p) {
      return EResult.Continue;
   }

   //==========================================================
   // <T>结束处理。</T>
   //
   // @method
   // @param p:context:FTagContext 环境
   // @return EResult 处理结果
   //==========================================================
   public onEnd(p) {
      return EResult.Continue;
   }

   //==========================================================
   // <T>获得名称。</T>
   //
   // @method
   // @return String 名称
   //==========================================================
   public name() {
      return this._name;
   }

   //==========================================================
   // <T>设置属性值。</T>
   //
   // @method
   // @param n:name:String 名称
   // @param v:level:Integer 内容
   //==========================================================
   public set(n, v) {
      throw new FError(this, 'Unknown attribute name. (name={1}, value={2})', n, v);
   }

   //==========================================================
   // <T>增加一个子标签。</T>
   //
   // @method
   // @param p:tag:FTag 子标签
   //==========================================================
   public push(p) {
      var o = this;
      var ts = o._children;
      if (ts == null) {
         ts = o._children = new FObjects();
      }
      ts.push(p);
   }

   //==========================================================
   // <T>解析处理。</T>
   //
   // @method
   // @param p:context:FTagContext 环境
   //==========================================================
   public parse(p) {
      var o = this;
      // 开始处理
      var r = o.onBegin(p);
      if (r == EResult.Continue) {
         // 子标签处理
         var ts = o._children;
         if (ts) {
            var c = ts.count();
            for (var i = 0; i < c; i++) {
               var t = ts.get(i);
               r = t.parse(p);
               if (r == EResult.Cancel) {
                  return r;
               }
               p._trimLeft = t._trimLeft;
               p._trimRight = t._trimRight;
            }
         }
         return o.onEnd(p);
      }
      return r;
   }

   //==========================================================
   //<T>获得字符串。</T>
   //
   // @method
   // @return String 字符串
   //==========================================================
   public toString() {
      return null;
   }

   //==========================================================
   //<T>获取运行时信息。</T>
   //
   // @method
   // @param ps:source:TString 信息
   // @param pt:tag:FTag 标签
   // @param pl:level:Integer 级别
   //==========================================================
   public innerDump(ps, pt, pl) {
      var o = this;
      ps.appendRepeat('   ', pl);
      ps.append(RClass.dump(pt));
      // 追加属性
      var s = pt.toString();
      if (!RString.isEmpty(s)) {
         ps.append(' [', s, ']');
      }
      // 追加子标签
      var ts = pt._children;
      if (ts) {
         ps.append('\n');
         var c = ts.count();
         for (var i = 0; i < c; i++) {
            var t = ts.get(i);
            o.innerDump(ps, t, pl + 1);
            if (i < c - 1) {
               ps.append('\n');
            }
         }
      }
   }

   //==========================================================
   //<T>获取运行时信息。</T>
   //
   // @method
   // @return String 运行信息
   //==========================================================
   public dump() {
      var result = new FString();
      this.innerDump(result, this, 0);
      return result.flush();
   }
}
