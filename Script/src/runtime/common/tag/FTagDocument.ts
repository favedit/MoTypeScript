import {ObjectBase} from '../lang/ObjectBase';
import {StringBuffer} from '../lang/StringBuffer';
import {StringUtil} from '../lang/StringUtil';
import {Fatal} from '../lang/Fatal';
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
export class FTagDocument extends ObjectBase {
   // @attribute
   public space: string = null;
   //_root = MO.Class.register(o, MO.AGetter('_root'));
   public root: FTag = null;

   //==========================================================
   // <T>创建一个标签对象。</T>
   //
   // @method
   // @param name  名称
   // @return FTag 标签
   //==========================================================
   public create(p) {
      // 获得名称
      var spaceName = this.space + '_';
      var name = null;
      if (StringUtil.startsWith(p, spaceName)) {
         name = p.substring(spaceName.length);
      } else {
         name = p;
      }
      // 创建节点
      var tag = null;
      switch (name) {
         case 'source':
            tag = RClass.create(FTag);
            break;
         case 'write':
            tag = RClass.create(FTagWrite);
            break;
         case 'true':
            tag = RClass.create(FTagTrue);
            break;
         case 'false':
            tag = RClass.create(FTagFalse);
            break;
         case 'equals':
            tag = RClass.create(FTagEquals);
            break;
         case 'notEquals':
            tag = RClass.create(FTagNotEquals);
            break;
         default:
            throw new Fatal(this, 'Unknown tag type. (name={1})', name);
      }
      return tag;
   }

   //===========================================================
   // 遍历构建XML节点树
   //
   // @method
   // @param node 父节点
   // @param element:XmlElement 页面元素
   // @see RXml.fromText
   // @see TXmlDoc.create
   //===========================================================
   public loadNode(node, element) {
      // 创建节点
      var tag = this.create(element.nodeName);
      if (node) {
         node.push(tag);
      } else {
         this.root = tag;
      }
      // 建立属性集合
      var elementAttributes = element.attributes;
      if (elementAttributes) {
         var elementCount = elementAttributes.length;
         for (var i: number = 0; i < elementCount; i++) {
            var elementAttribute = elementAttributes[i];
            if (elementAttribute.nodeName) {
               tag.set(elementAttribute.nodeName, RXml.formatText(elementAttribute.value));
            }
         }
      }
      // 建立标签集合
      var elementNodes = element.childNodes
      if (elementNodes) {
         var elementCount = elementNodes.length;
         for (var i: number = 0; i < elementCount; i++) {
            var elementNode = elementNodes[i];
            switch (elementNode.nodeType) {
               case ENodeType.Text:
                  var tagText: FTagText = RClass.create(FTagText);
                  tagText.text = elementNode.nodeValue;
                  tag.push(tagText);
                  break;
               case ENodeType.Data:
                  var tagText: FTagText = RClass.create(FTagText);
                  tagText.text = elementNode.data;
                  tag.push(tagText);
                  break;
               case ENodeType.Node:
                  this.loadNode(tag, elementNode);
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
      value = value.replace(new RegExp('<' + this.space + ':', 'g'), '<' + this.space + '_');
      value = value.replace(new RegExp('</' + this.space + ':', 'g'), '</' + this.space + '_');
      value = value.replace(new RegExp(' & ', 'g'), ' &amp; ');
      value = value.replace(new RegExp(' < ', 'g'), ' &lt; ');
      value = value.replace(new RegExp(' > ', 'g'), ' &gt; ');
      // 解析内容
      var xnode = RXml.makeString(value);
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
      this.root.parse(context);
      return context.source();
   }

   //==========================================================
   // <T>获得运行信息。</T>
   //
   // @method
   // @return String 运行信息
   //==========================================================
   public dump() {
      var result = new StringBuffer();
      result.appendLine(RClass.dump(this));
      //r.appendLine(this.root().dump(r));
      return result.flush();
   }
}
