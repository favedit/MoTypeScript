import {RClass} from '../reflect/RClass';
import {FString} from '../lang/FString';
import {FError} from '../lang/FError';
import {FAttributes} from '../lang/FAttributes';
import {RString} from '../lang/RString';
import {RMethod} from '../reflect/RMethod';
import {ENodeType} from './ENodeType';
import {FNode} from './FNode';
import {FXmlDocument} from './FXmlDocument';

//==========================================================
// <T>配置工具类。</T>
//
// @reference
// @author maocy
// @version 150104
//==========================================================
export class RXml {
   //==========================================================
   // 判断是否是一个节点(TNode)类型
   //
   // @method
   // @param n:Node:TNode 节点对象
   // @return Boolean 返回Boolean类型
   //==========================================================
   public static isNode(n) {
      return RClass.isName(n, 'TNode');
   }

   //==========================================================
   // <T>格式化文本。</T>
   //
   // @method
   // @param s:string:String 字符串
   // @return String  替换后的字符串
   //==========================================================
   public static formatText(s) {
      if (s != null) {
         s = s.replace(/\\n/g, '\n');
      }
      return s;
   }

   //==========================================================
   // <T>替换字符串中的转义字符。</T>
   //
   // @method
   // @param s:string:FString 字符串
   // @param v:value:String 内容
   // @return FString 字符串
   //==========================================================
   public static buildText(s, v) {
      if (v != null) {
         v = v.toString();
         var c = v.length;
         for (var i = 0; i < c; i++) {
            var ch = v.charAt(i);
            switch (ch) {
               case '<':
                  s.append('&lt;');
                  break;
               case '>':
                  s.append('&gt;');
                  break;
               case '&':
                  s.append('&amp;');
                  break;
               case '\'':
                  s.append('&apos;');
                  break;
               case '"':
                  s.append('&quot;');
                  break;
               case '\r':
                  continue;
               case '\n':
                  s.append('\\n');
                  break;
               default:
                  s.append(ch);
            }
         }
      }
      return s;
   }

   //==========================================================
   // 遍历构建XML节点树
   //
   // @method
   // @param pd:document:TXmlDocument JS系统中的XML文件
   // @param pn:node:TXmlNode 父节点
   // @param pe:element:XmlElement 页面元素
   // @see RXml.fromText
   // @see TXmlDoc.create
   //==========================================================
   public static buildNode(pd, pn, pe) {
      // 建立属性集合
      var xas = null;
      var eas = pe.attributes;
      if (eas) {
         var eac = eas.length;
         if (eac > 0) {
            xas = new FAttributes();
            for (var n = 0; n < eac; n++) {
               var ea = eas[n];
               if (ea.nodeName) {
                  xas.set(ea.nodeName, this.formatText(ea.value));
               }
            }
         }
      }
      // 建立文本
      var xt = new FString();
      xt.append(pe.value);
      var ecs = pe.childNodes
      if (ecs) {
         var ecc = ecs.length;
         for (var n = 0; n < ecc; n++) {
            var en = ecs[n];
            var ect = en.nodeType;
            if (ect == ENodeType.Text) {
               xt.append(en.nodeValue);
            } else if (ect == ENodeType.Data) {
               xt.append(en.data);
            }
         }
      }
      // 创建节点
      var xc = pd.create(pe.nodeName, xas, RString.trim(xt.toString()));
      if (pn) {
         pn.push(xc);
      } else {
         pd._root = xc;
      }
      // 创建子节点集合
      if (ecs) {
         var cc = ecs.length;
         for (var n = 0; n < cc; n++) {
            if (ecs[n].nodeType == ENodeType.Node) {
               this.buildNode(pd, xc, ecs[n]);
            }
         }
      }
   }

   //==========================================================
   // <T>根据页面中的配置节点对象构建配置节点。</T>
   //
   // @method
   // @param p:document:document 嵌在页面中的配置节点
   // @return TXmlNode 配置节点
   //==========================================================
   public static makeNode(p) {
      var o: any = this;
      if (p.documentElement) {
         var d = new FXmlDocument();
         o.buildNode(d, null, p.documentElement);
         return d.root();
      } else if (p.tagName == 'SCRIPT') {
         var s = p.textContent;
         if (!s) {
            s = p.text;
         }
         if (s) {
            var d = new FXmlDocument();
            var xd = o.makeString(s)
            o.buildNode(d, null, xd.documentElement);
            return d.root();
         }
      }
      return null;
   }

   //==========================================================
   // <T>根据页面中的配置节点对象构建配置文档。</T>
   //
   // @method
   // @param p:document:document 嵌在页面中的配置节点
   // @return TXmlDocument 配置文档
   //==========================================================
   public static makeDocument(p) {
      var d = new FXmlDocument();
      if (p.documentElement) {
         this.buildNode(d, null, p.documentElement);
      }
      return d;
   }

   //==========================================================
   // <T>解包节点字符串。</T>
   //
   // @method
   // @param s:string:String 打包字符串
   // @param n:node:TNode 节点对象
   // @return TNode 节点对象
   //==========================================================
   public static unpack(s, n) {
      var o = this;
      if (RString.isEmpty(s)) {
         return null;
      }
      if (!n) {
         n = new FNode();
      }
      var np = new FAttributes();
      np.unpack(s);
      n.name = np.get('name');
      n.value = np.get('value');
      if (np.contains('attributes')) {
         n.attributes().unpack(np.get('attributes'));
      }
      if (np.contains('nodes')) {
         //var ns = new sk.common.FStrings();
         //ns.unpack(np.get('nodes'));
         //for (var i = 0; i < ns.count; i++) {
         //   o.unpack(ns.get(i), n.create());
         //}
      }
      return n;
   }

   //==========================================================
   // <T>存储对象。</T>
   //
   // @method
   // @param xconfig:TXmlNode 配置节点
   // @param item:Object 对象
   //==========================================================
   public static saveObject(xconfig, tag, item) {
      var o = this;
      for (var name in item) {
         var value = item[name];
         if (value != null) {
            var xtag = xconfig.create(tag);
            xtag.set('name', name);
            var typeName = typeof (value);
            switch (typeName) {
               case 'boolean':
               case 'number':
               case 'date':
               case 'string':
                  xtag.setValue(value);
                  break;
               case 'function':
                  xtag.setValue(RMethod.shortName(value));
                  break;
               case 'object':
                  o.saveObject(xtag, 'Property', value);
                  break;
               default:
                  throw new FError(this, 'Invalid object.');
            }
         }
      }
   }
}
