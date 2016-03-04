import {FObject} from '../lang/FObject';
import {FString} from '../lang/FString';
import {RString} from '../lang/RString';
import {FError} from '../lang/FError';
import {RClass} from '../reflect/RClass';
import {ENodeType} from '../xml/ENodeType';
import {RXml} from '../xml/RXml';
import {FTag} from './FTag';
import {FTagWrite} from './FTagWrite';
import {FTagTrue} from './FTagTrue';
import {FTagFalse} from './FTagFalse';
import {FTagEquals} from './FTagEquals';
import {FTagNotEquals} from './FTagNotEquals';
import {FTagText} from './FTagText';

//==========================================================
// <T>配置文档。</T>
//
// @tool
// @author maocy
// @version 150104
//==========================================================
export class FTagDocument extends FObject {
   // @attribute
   //_space = MO.Class.register(o, MO.AGetSet('_space'));
   protected _space: string = null;
   //_root = MO.Class.register(o, MO.AGetter('_root'));
   protected _root: FTag = null;

   public root(): FTag {
      return this._root;
   }

   //==========================================================
   // <T>创建一个标签对象。</T>
   //
   // @method
   // @param p:name:String 名称
   // @return FTag 标签
   //==========================================================
   public create(p) {
      var o = this;
      // 获得名称
      var sn = o._space + '_';
      var n = null;
      if (RString.startsWith(p, sn)) {
         n = p.substring(sn.length);
      } else {
         n = p;
      }
      // 创建节点
      var t = null;
      switch (n) {
         case 'source':
            t = RClass.create(FTag);
            break;
         case 'write':
            t = RClass.create(FTagWrite);
            break;
         case 'true':
            t = RClass.create(FTagTrue);
            break;
         case 'false':
            t = RClass.create(FTagFalse);
            break;
         case 'equals':
            t = RClass.create(FTagEquals);
            break;
         case 'notEquals':
            t = RClass.create(FTagNotEquals);
            break;
         default:
            throw new FError(o, 'Unknown tag type. (name={1})', n);
      }
      return t;
   }

   //===========================================================
   // 遍历构建XML节点树
   //
   // @method
   // @param pn:node:TXmlNode 父节点
   // @param pe:element:XmlElement 页面元素
   // @see RXml.fromText
   // @see TXmlDoc.create
   //===========================================================
   public loadNode(pn, pe) {
      var o = this;
      // 创建节点
      var x = o.create(pe.nodeName);
      if (pn) {
         pn.push(x);
      } else {
         o._root = x;
      }
      // 建立属性集合
      var eas = pe.attributes;
      if (eas) {
         var c = eas.length;
         for (var i = 0; i < c; i++) {
            var ea = eas[i];
            if (ea.nodeName) {
               x.set(ea.nodeName, RXml.formatText(ea.value));
            }
         }
      }
      // 建立标签集合
      var ens = pe.childNodes
      if (ens) {
         var c = ens.length;
         for (var i = 0; i < c; i++) {
            var en = ens[i];
            switch (en.nodeType) {
               case ENodeType.Text:
                  var xt = RClass.create(FTagText);
                  xt.setText(en.nodeValue);
                  x.push(xt);
                  break;
               case ENodeType.Data:
                  var xt = RClass.create(FTagText);
                  xt.setText(en.data);
                  x.push(xt);
                  break;
               case ENodeType.Node:
                  o.loadNode(x, en);
                  break;
            }
         }
      }
   }

   //==========================================================
   // <T>加载来源。</T>
   //
   // @method
   // @param source:String 来源
   //==========================================================
   public load(source) {
      // 格式化代码
      var value = '<source>' + source + '</source>'
      value = value.replace(new RegExp('<' + this._space + ':', 'g'), '<' + this._space + '_');
      value = value.replace(new RegExp('</' + this._space + ':', 'g'), '</' + this._space + '_');
      value = value.replace(new RegExp(' & ', 'g'), ' &amp; ');
      value = value.replace(new RegExp(' < ', 'g'), ' &lt; ');
      value = value.replace(new RegExp(' > ', 'g'), ' &gt; ');
      // 解析内容
      var xnode = RXml.formatText(value);
      this.loadNode(null, xnode.firstChild);
   }

   //==========================================================
   // <T>解析处理。</T>
   //
   // @method
   // @param context:FTagContext 环境
   //==========================================================
   public parse(context) {
      context.resetSource();
      this._root.parse(context);
      return context.source();
   }

   //==========================================================
   // <T>获得运行信息。</T>
   //
   // @method
   // @return String 运行信息
   //==========================================================
   public dump() {
      var result = new FString();
      result.appendLine(RClass.dump(this));
      //r.appendLine(this.root().dump(r));
      return result.flush();
   }
}
