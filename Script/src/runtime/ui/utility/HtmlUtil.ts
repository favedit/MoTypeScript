﻿import {Fatal} from '../../common/lang/Fatal';
import {BooleanUtil} from '../../common/lang/BooleanUtil';
import {ObjectIdUtil} from '../../common/lang/ObjectIdUtil';
import {ServiceUtil} from '../../core/ServiceUtil';
import {ScrollEnum} from '../../ui/ScrollEnum';
import {DeviceService} from '../../ui/service/DeviceService';
import {BrowserEnum} from '../../ui/BrowserEnum';
import {HtmlItem} from './HtmlItem';

//==========================================================
// <T>页面对象的管理类。</T>
//
// @reference
// @author maocy
// @version 141229
//==========================================================
export class HtmlUtil {
   // 关联集合
   public static _links: any = new Object();
   // 客户端位置
   public static _clientPosition: any;

   //==========================================================
   // <T>获得对象的唯一编号。</T>
   // <P>外部会引用这个函数，不要在内部使用this对象。</P>
   //
   // @param value 对象
   // @return Integer 编号
   //==========================================================
   public static uid(value) {
      var uuid = value.__puuid;
      if (uuid == null) {
         uuid = value.__puuid = ObjectIdUtil.nextId('html');
      }
      return uuid;
   }

   //==========================================================
   // <T>获得可见性。</T>
   //
   // @param hTag 页面对象
   // @return 可见性
   //==========================================================
   public static visibleGet(hTag: HTMLElement): boolean {
      var result = null;
      var text = hTag.style.display;
      var deviceService: DeviceService = ServiceUtil.find(DeviceService);
      if (deviceService.isBrowser(BrowserEnum.Explorer)) {
         result = (text == 'block');
      } else {
         result = (text != 'none');
      }
      return result;
   }

   //==========================================================
   // <T>设置可见性。</T>
   //
   // @param hTag 页面对象
   // @param visible 可见性
   //==========================================================
   public static visibleSet(hTag: HTMLElement, visible: boolean) {
      var text = null;
      var deviceService: DeviceService = ServiceUtil.find(DeviceService);
      if (deviceService.isBrowser(BrowserEnum.Explorer)) {
         text = visible ? '' : 'none';
      } else {
         text = visible ? null : 'none';
      }
      hTag.style.display = text;
   }

   // //==========================================================
   // // <T>获得显示性。</T>
   // //
   // // @method
   // // @param hTag:HtmlTag 页面对象
   // // @return Boolean 显示性
   // //==========================================================
   // public static displayGet(hTag) {
   //    var result = null;
   //    var text = hTag.style.display;
   //    // if (MO.Window.Browser.isBrowser(MO.EBrowser.Explorer)) {
   //    //    result = (text == 'inline');
   //    // } else {
   //    result = (text != 'none');
   //    // }
   //    return result;
   // }

   // //==========================================================
   // // <T>设置显示性。</T>
   // //
   // // @method
   // // @param hTag:HtmlTag 页面对象
   // // @param visible:Boolean 显示性
   // //==========================================================
   // public static displaySet(hTag, visible) {
   //    var text = null;
   //    // if (MO.Window.Browser.isBrowser(MO.EBrowser.Explorer)) {
   //    //    text = visible ? 'inline' : 'none';
   //    // } else {
   //    text = visible ? null : 'none';
   //    // }
   //    hTag.style.display = text;
   // }

   //==========================================================
   // <T>获得文本内容。</T>
   //
   // @param hTag 页面对象
   // @return 文本内容
   //==========================================================
   public static textGet(hTag: HTMLElement, defaultText: string): string {
      var text = null;
      text = hTag.textContent;
      var deviceService: DeviceService = ServiceUtil.find(DeviceService);
      if (deviceService.isBrowser(BrowserEnum.FireFox)) {
         text = hTag.textContent;
      } else {
         text = hTag.innerText;
      }
      return text;
   }

   //==========================================================
   // <T>设置文本内容。</T>
   //
   // @param hTag 页面对象
   // @param text 文本内容
   //==========================================================
   public static textSet(hTag: HTMLElement, text: string) {
      hTag.textContent = text;
      var deviceService: DeviceService = ServiceUtil.find(DeviceService);
      if (deviceService.isBrowser(BrowserEnum.FireFox)) {
         hTag.textContent = text;
      } else {
         hTag.innerText = text;
      }
   }

   //==========================================================
   // <T>获得复选框内容。</T>
   //
   // @param hTag 页面对象
   // @return 文本内容
   //==========================================================
   public static checkGet(hTag) {
      return BooleanUtil.toString(hTag.checked);
   }

   //==========================================================
   // <T>设置复选框内容。</T>
   //
   // @param hTag 页面对象
   // @param value 文本内容
   //==========================================================
   public static checkSet(hTag, value) {
      hTag.checked = BooleanUtil.parse(value);
   }

   //==========================================================
   // <T>获得单选框内容。</T>
   //
   // @param hTag 页面对象
   // @return 文本内容
   //==========================================================
   public static radioGet(hTag) {
      if (hTag) {
         var count: number = hTag.length;
         for (var n: number = 0; n < count; n++) {
            var hItem = hTag[n];
            if (hItem.checked) {
               return hItem.value;
            }
         }
      }
      return null;
   }

   //==========================================================
   // <T>设置单选框内容。</T>
   //
   // @param hTag 页面对象
   // @param value 文本内容
   //==========================================================
   public static radioSet(hTag, value) {
      if (hTag) {
         var count: number = hTag.length;
         for (var n: number = 0; n < count; n++) {
            var hItem = hTag[n];
            if (hItem.value == value) {
               hItem.checked = true;
               break;
            }
         }
      }
   }

   //==========================================================
   // <T>设置鼠标样式。</T>
   //
   // @param hTag 页面对象
   // @param value 鼠标样式
   //==========================================================
   public static cursorSet(hTag: HTMLElement, value) {
      if (hTag) {
         hTag.style.cursor = value;
      }
   }

   //==========================================================
   // <T>获得页面对象上的存储信息。</T>
   //
   // @param hTag 页面对象
   // @param name 名称
   // @return 内容
   //==========================================================
   public static linkGet(hTag: HTMLElement, name: string): any {
      var uid = this.uid(hTag);
      var item = this._links[uid];
      return item ? item.get(name) : null;
   }

   //==========================================================
   // <T>设置页面对象上的存储信息。</T>
   //
   // @param hTag 页面对象
   // @param name 名称
   // @param value 内容
   //==========================================================
   public static linkSet(hTag: HTMLElement, name: string, value: any): void {
      var links = this._links;
      var uid = this.uid(hTag);
      var item = links[uid];
      if (!item) {
         item = links[uid] = new HtmlItem();
         item._link = hTag;
      }
      item.set(name, value);
   }

   //===========================================================
   // <T>设置页面元素滚动样式。</T>
   //
   // @param hElement 页面元素
   // @param scrollCd 滚动枚举
   //===========================================================
   public static setStyleScroll(hElement: HTMLElement, scrollCd: ScrollEnum) {
      var hStyle = hElement.style;
      switch (scrollCd) {
         case ScrollEnum.None:
            hStyle.overflowX = '';
            hStyle.overflowY = '';
            break;
         case ScrollEnum.Horizontal:
            hStyle.overflowX = 'scroll';
            break;
         case ScrollEnum.HorizontalAuto:
            hStyle.overflowX = 'auto';
            break;
         case ScrollEnum.Vertical:
            hStyle.overflowY = 'scroll';
            break;
         case ScrollEnum.VerticalAuto:
            hStyle.overflowY = 'auto';
            break;
         case ScrollEnum.Both:
            hStyle.overflow = 'scroll';
            break;
         case ScrollEnum.BothAuto:
            hStyle.overflow = 'auto';
            break;
         default:
            throw new Fatal(this, 'Unknown scroll type. (scroll_cd={1})', scrollCd);
      }
   }

   // //==========================================================
   // // <T>计算一个控件到指定容器的位置。</T>
   // // 计算 table的 offsets.
   // // 计算 绝对定位的元素(position:absolute).
   // // 在其它容器内出现的Scroll offsets(scrollLeft,scrollTop).
   // // 所有父元素溢出的边框(overflow:visible).
   // // 误算绝对定位的父元素.
   // //
   // // @method
   // // @param h:html:HtmlTag 页面元素
   // // @param t:top:HtmlTag 顶层元素
   // //==========================================================
   // public static clientPosition(hTag, hTop) {
   //    var o = this;
   //    var position = o._clientPosition;
   //    if (!position) {
   //       position = o._clientPosition = new MO.SPoint2();
   //    }
   //    position.set(0, 0);
   //    while (hTag != hTop) {
   //       position.x += hTag.offsetLeft + hTag.clientLeft - hTag.scrollLeft;
   //       position.y += hTag.offsetTop + hTag.clientTop - hTag.scrollTop;
   //       //if('absolute' != RHtml.currentStyle(h).position){
   //       //break;
   //       //}
   //       hTag = hTag.offsetParent;
   //    }
   //    return position;
   // }

   // //==========================================================
   // // <T>计算一个页面元素到左侧的距离。</T>
   // //
   // // @method
   // // @param p:html:HtmlTag 页面元素
   // // @param t:top:HtmlTag 顶层元素
   // // @return Intger 距离
   // //==========================================================
   // public static clientX(p, t) {
   //    var r = 0;
   //    while (p != t) {
   //       r += p.offsetLeft - p.scrollLeft;
   //       p = p.offsetParent;
   //    }
   //    return r;
   // }

   // //==========================================================
   // // <T>计算一个页面元素到上侧的距离。</T>
   // //
   // // @method
   // // @param p:html:HtmlTag 页面元素
   // // @param t:top:HtmlTag 顶层元素
   // // @return Intger 距离
   // //==========================================================
   // public static clientY(p, t) {
   //    var r = 0;
   //    while (p != t) {
   //       r += p.offsetTop - p.scrollTop;
   //       p = p.offsetParent;
   //    }
   //    return r;
   // }

   //==========================================================
   // <T>设置页面元素大小。</T>
   //
   // @param hTag 页面元素
   // @param width 宽度
   // @param height 高度
   //==========================================================
   public static setSize(hTag: HTMLElement, width?: string, height?: string) {
      if (width) {
         hTag.style.width = width;
      }
      if (height) {
         hTag.style.height = height;
      }
   }

   // //==========================================================
   // // <T>将页面内容转换成文本内容。</T>
   // //
   // // @method
   // // @param p:html:String 页面内容
   // // @return String 文本内容
   // //==========================================================
   // public static toText(p) {
   //    if (p != null) {
   //       p = p.toString();
   //       p = p.replace(/&lt;/, '<');
   //       p = p.replace(/&gt;/g, '>');
   //       p = p.replace(/&nbsp;/g, ' ');
   //       p = p.replace(/<BR>/g, '\n');
   //    }
   //    return p;
   // }

   // //==========================================================
   // // <T>将文本内容转换成页面内容。</T>
   // //
   // // @method
   // // @param p:text:String 文本内容
   // // @return String 页面内容
   // //==========================================================
   // public static toHtml(p) {
   //    if (p != null) {
   //       p = p.toString();
   //       p = p.replace(/</g, '&lt;');
   //       p = p.replace(/>/g, '&gt;');
   //       p = p.replace(/ /g, '&nbsp;');
   //       p = p.replace(/\n/g, '<BR>');
   //       p = p.replace(/\\n/g, '<BR>');
   //       p = p.replace(/\r/g, '');
   //       p = p.replace(/\\r/g, '');
   //    }
   //    return p;
   // }

   //==========================================================
   // <T>获得事件来源。</T>
   //
   // @method
   // @param hEvent 页面事件
   //==========================================================
   public static eventSource(hEvent) {
      return hEvent.srcElement ? hEvent.srcElement : hEvent.target;
   }

   // //==========================================================
   // // <T>根据名称获得页面元素。</T>
   // //
   // // @method
   // // @param name:String 名称
   // // @return HtmlTag 页面元素
   // //==========================================================
   // public static get(name) {
   //    return document.getElementById(name);
   // }

   // //==========================================================
   // // <T>根据名称获得指定类型的页面元素。</T>
   // //
   // // @method
   // // @param name:String 名称
   // // @param typeName:String 类型名称
   // // @return HtmlTag 页面元素
   // //==========================================================
   // public static parent(tag, typeName) {
   //    if (tag && t) {
   //       typeName = typeName.toLowerCase();
   //       while (tag) {
   //          if (tag.tagName.toLowerCase() == typeName) {
   //             return tag;
   //          }
   //          tag = tag.parentElement;
   //       }
   //    }
   //    return null;
   // }

   // //==========================================================
   // // <T>查找关联对象。</T>
   // //
   // // @method
   // // @param hTag:HtmlTag 页面元素
   // // @param clazz:Class 类对象
   // // @return FObject 对象
   // //==========================================================
   // public static searchLinker(hTag, clazz) {
   //    while (hTag) {
   //       var linker = hTag.__linker;
   //       if (linker) {
   //          if (MO.Class.isClass(linker, clazz)) {
   //             return linker;
   //          }
   //       }
   //       hTag = hTag.parentElement;
   //    }
   //    return null;
   // }

   // //==========================================================
   // // <T>查找关联对象。</T>
   // //
   // // @method
   // // @param hTag:HtmlTag 页面元素
   // // @param name:String 属性名称
   // // @return FObject 对象
   // //==========================================================
   // public static searchObject(hTag, name) {
   //    while (hTag) {
   //       var flag = hTag[name];
   //       if (flag) {
   //          return flag;
   //       }
   //       hTag = hTag.parentElement;
   //    }
   //    return null;
   // }

   //==========================================================
   // <T>移动表格中的一行。</T>
   //
   // @param hTable
   // @param sourceIndex
   // @param targetIndex
   //==========================================================
   public static tableMoveRow(hTable, sourceIndex, targetIndex) {
      // 检查参数
      if (hTable.tagName != 'TABLE') {
         throw new Fatal(this, 'Html table is invalid.');
      }
      if (sourceIndex == targetIndex) {
         return false;
      }
      // 移动处理
      if (hTable.moveRow) {
         // 原始处理
         hTable.moveRow(sourceIndex, targetIndex);
      } else {
         // 兼容处理
         var hb = hTable.getElementsByTagName('tbody')[0];
         var sr = hb.rows[sourceIndex];
         var tr = hb.rows[targetIndex];
         if ((sr == null) || (tr == null)) {
            return false;
         }
         var nr = null;
         if (sourceIndex <= targetIndex) {
            nr = tr;
            while (nr = nr.nextSibling) {
               if (nr.tagName == 'TR') {
                  break;
               }
            }
         }
         if (nr == null) {
            hb.insertBefore(sr, tr);
         } else {
            if (nr == null) {
               hb.appendChild(sr);
            } else {
               hb.insertBefore(sr, nr);
            }
         }
      }
      return true;
   }

   // //==========================================================
   // // <T>清空处理。</T>
   // //
   // // @param hTag:HtmlTag 页面标签
   // //==========================================================
   // public static clear(hTag) {
   //    var o = this;
   //    if (hTag) {
   //       var hChildren = hTag.children;
   //       if (hChildren) {
   //          var count = hChildren.length;
   //          for (var i = count - 1; i >= 0; i--) {
   //             var hChild = hChildren[i];
   //             hTag.removeChild(hChild);
   //          }
   //       }
   //    }
   // }

   // //==========================================================
   // // <T>全部清空处理。</T>
   // //
   // // @param hTag:HtmlTag 页面标签
   // //==========================================================
   // public static clearAll(hTag) {
   //    var o = this;
   //    if (hTag) {
   //       var hChildren = hTag.children;
   //       if (hChildren) {
   //          var count = hChildren.length;
   //          for (var i = count - 1; i >= 0; i--) {
   //             var hChild = hChildren[i];
   //             if (hChild.children) {
   //                o.clear(hChild);
   //             }
   //             hTag.removeChild(hChild);
   //          }
   //       }
   //    }
   // }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @param hElement 页面标签
   //==========================================================
   public static dispose(hElement) {
      return null;
   }

   //   //==========================================================
   //   MO.RHtml.prototype.clone = function RHtml_clone(o, s, t){
   //      if(!t){
   //         t = s.cloneNode(true);
   //      }
   //      // 设置名称
   //      if(s._pname){
   //         o[s._pname] = t;
   //      }
   //      if(s._ptyName){
   //         o[s._ptyName] = t;
   //      }
   //      // 复制事件
   //      var e = REvent.find(s).events;
   //      t._psource = s;
   //      for(var n in e){
   //         t[e[n].handle] = s[e[n].handle];
   //         if(t[e[n].handle]){
   //            RHtml.link(t, '_plink', o);
   //         }
   //      }
   //      // 复制子
   //      var p = s.children;
   //      var n = p.length;
   //      while(--n >= 0){
   //         RHtml_clone(o, p[n], t.children[n]);
   //      }
   //      return t;
   //   }
   //
   //   //==========================================================
   //   // <T>计算一个控件到指定容器的位置。</T>
   //   //
   //   // @method
   //   // @param h:panel:<Html> 页面对象
   //   // @param t:top<Html> 顶层页面对象
   //   //==========================================================
   //   // 计算 table的 offsets.
   //   // 计算 绝对定位的元素(position:absolute).
   //   // 在其它容器内出现的Scroll offsets(scrollLeft,scrollTop).
   //   // 所有父元素溢出的边框(overflow:visible).
   //   // 误算绝对定位的父元素.
   //   MO.RHtml.prototype.offsetPosition = function RHtml_offsetPosition(h, t){
   //      var p = new TPoint();
   //      while(h != t){
   //         p.x += h.offsetLeft - h.scrollLeft;
   //         p.y += h.offsetTop - h.scrollTop;
   //         if('absolute' != RHtml.currentStyle(h).position){
   //            //break;
   //         }
   //         p.x += h.clientLeft;
   //         p.y += h.clientTop;
   //         h = h.offsetParent;
   //      }
   //      return p;
   //   }
   //   //==========================================================
   //   MO.RHtml.prototype.offsetX = function RHtml_offsetX(h){
   //      var x = 0;
   //      while(h){
   //         x += h.offsetLeft;
   //         h = h.offsetParent;
   //      }
   //      return x;
   //   }
   //   //==========================================================
   //   MO.RHtml.prototype.offsetY = function RHtml_offsetY(h){
   //      var y = 0;
   //      while(h){
   //         y += h.offsetTop;
   //         h = h.offsetParent;
   //      }
   //      return y;
   //   }
   //
   //   //==========================================================
   //   //
   //   //==========================================================
   //   MO.RHtml.prototype.bodyWidth = function RHtml_bodyWidth(doc){
   //      return doc.all ? doc.body.scrollWidth : doc.documentElement.scrollWidth;
   //   }
   //
   //   //==========================================================
   //   //
   //   //==========================================================
   //   MO.RHtml.prototype.bodyHeight = function RHtml_bodyHeight(doc){
   //      return doc.all ? doc.body.scrollHeight : doc.documentElement.scrollHeight;
   //   }
   //
   //   //==========================================================
   //   //
   //   //==========================================================
   //   MO.RHtml.prototype.frameHeight = function RHtml_frameHeight(f){
   //      var hd = f.contentWindow.document;
   //      var oh = hd.body.scrollHeight;
   //      var sh = hd.documentElement.scrollHeight;
   //      return Math.max(oh, sh);
   //   }
   //
   //   //==========================================================
   //   //
   //   //==========================================================
   //   MO.RHtml.prototype.scrollWidth = function RHtml_scrollWidth(h){
   //      var r = 0;
   //      if(h.offsetWidth){
   //         r += h.offsetWidth;
   //      }
   //      if(h.borderTopWidth){
   //         r -= parseInt(h.borderLeftWidth);
   //      }
   //      if(h.borderBottomWidth){
   //         r -= parseInt(h.borderRightWidth);
   //      }
   //      if(h.clientWidth){
   //         r -= h.clientWidth;
   //      }
   //      return r;
   //   }
   //
   //   //==========================================================
   //   //
   //   //==========================================================
   //   MO.RHtml.prototype.scrollHeight = function RHtml_scrollHeight(h){
   //      var r = 0;
   //      if(h.offsetHeight){
   //         r += h.offsetHeight;
   //      }
   //      if(h.borderTopWidth){
   //         r -= parseInt(h.borderTopWidth);
   //      }
   //      if(h.borderBottomWidth){
   //         r -= parseInt(h.borderBottomWidth);
   //      }
   //      if(h.clientHeight){
   //         r -= h.clientHeight;
   //      }
   //      return r;
   //   }
   //
   //   //==========================================================
   //   //
   //   //==========================================================
   //   MO.RHtml.prototype.currentStyle = function RHtml_currentStyle(p){
   //      if(p.currentStyle){
   //         return p.currentStyle;
   //      }
   //      return window.getComputedStyle(p, null);
   //   }
   //
   //   //==========================================================
   //   //
   //   //==========================================================
   //   MO.RHtml.prototype.point = function RHtml_point(o, p){
   //      return this.toPoint(new TPoint(), o, p);
   //   }
   //
   //   //==========================================================
   //   //
   //   //==========================================================
   //   MO.RHtml.prototype.toPoint = function RHtml_toPoint(r, o, p){
   //      if(r && o){
   //         p = RObject.nvl(p, window.document.body);
   //         var cs = RHtml.currentStyle(o);
   //         r.x = -RInt.parse(cs.borderLeftWidth);
   //         r.y = -RInt.parse(cs.borderTopWidth);
   //         while(o && o != p){
   //            r.x += o.offsetLeft - o.scrollLeft;
   //            r.y += o.offsetTop - o.scrollTop;
   //            if('absolute' != RHtml.currentStyle(o).position){
   //               r.x += o.clientLeft;
   //               r.y += o.clientTop;
   //            }
   //            o = o.offsetParent;
   //         }
   //      }
   //      return r;
   //   }
   //
   //   //==========================================================
   //   //
   //   //==========================================================
   //   MO.RHtml.prototype.rect = function RHtml_rect(o, p){
   //      return this.toRect(new TRect(), o, p);
   //   }
   //
   //   //==========================================================
   //   //
   //   //==========================================================
   //   MO.RHtml.prototype.toRect = function RHtml_toRect(r, o, p){
   //      if(r && o){
   //         p = RObject.nvl(p, window.document.body);
   //         var cs = RHtml.currentStyle(o);
   //         r.left = -RInt.parse(cs.borderLeftWidth);
   //         r.top = -RInt.parse(cs.borderTopWidth);
   //         var w = o.offsetWidth; w = o.offsetWidth-1;
   //         var h = o.offsetHeight; h = o.offsetHeight-1;
   //         while(o && o != p){
   //            r.left += o.offsetLeft - o.scrollLeft;
   //            r.top += o.offsetTop - o.scrollTop;
   //            if('absolute' != RHtml.currentStyle(o).position){
   //               r.left += o.clientLeft;
   //               r.top += o.clientTop;
   //            }
   //            o = o.offsetParent;
   //         }
   //         r.right = r.left + w;
   //         r.bottom = r.top + h;
   //      }
   //      return r;
   //   }
   //
   //   //==========================================================
   //   //
   //   //==========================================================
   //   MO.RHtml.prototype.top = function RHtml_top(h){
   //      var r = 0;
   //      if(h){
   //         var cs = RHtml.currentStyle(o);
   //         r = -RInteger.parse(cs.borderTopWidth);
   //         while(h){
   //            r += h.offsetTop - h.scrollTop;
   //            if('absolute' != RHtml.currentStyle(o).position){
   //               r += h.clientTop;
   //            }
   //            h = h.offsetParent;
   //         }
   //      }
   //      return r;
   //   }
   //
   //   //==========================================================
   //   //
   //   //==========================================================
   //   MO.RHtml.prototype.clientRect = function RHtml_clientRect(o){
   //      if(o){
   //         var x = 0;
   //         var y = 0;
   //         var w = o.offsetWidth-1;
   //         var h = o.offsetHeight-1;
   //         while(o){
   //            x += o.offsetLeft;
   //            y += o.offsetTop;
   //            o = o.offsetParent;
   //         }
   //         return new TRect(x, y, x+w, y+h);
   //      }
   //      return null;
   //   }
   //
   //   //==========================================================
   //   //
   //   //==========================================================
   //   MO.RHtml.prototype.offsetRect = function RHtml_offsetRect(o){
   //      if(o){
   //         var x = 0;
   //         var y = 0;
   //         var w = o.offsetWidth-1;
   //         var h = o.offsetHeight-1;
   //         while(o){
   //            x += o.offsetLeft + o.clientLeft;
   //            y += o.offsetTop + o.clientTop;
   //            o = o.offsetParent;
   //         }
   //         return new TRect(x, y, x+w, y+h);
   //      }
   //      return null;
   //   }
   //
   //
   //   //==========================================================
   //   // HtmlObject, Rect
   //   // HtmlObject, left, top, width, height
   //   //
   //   //==========================================================
   //   MO.RHtml.prototype.setRect = function RHtml_setRect(h, r){
   //      if(h && h.style){
   //         var s = h.style;
   //         s.left = r.left;
   //         s.top = r.top;
   //         s.width = r.width();
   //         s.height = r.height();
   //      }
   //   }
   //
   //   //==========================================================
   //   // HtmlObject, left, top, width, height
   //   //
   //   //==========================================================
   //   MO.RHtml.prototype.setBounds = function RHtml_setBounds(r, l, t, w, h){
   //      if(r && r.style){
   //         var s = r.style;
   //         if(null != l){
   //            s.left = l;
   //         }
   //         if(null != t){
   //            s.top = t;
   //         }
   //         if(null != w){
   //            s.width = w;
   //         }
   //         if(null != h){
   //            s.height = h;
   //         }
   //      }
   //   }
   //
   //   //==========================================================
   //   // Object, Rect
   //   //
   //   //==========================================================
   //   MO.RHtml.prototype.setPixelRect = function RHtml_setPixelRect(o, r){
   //      if(o && o.style){
   //         var s = o.style;
   //         s.pixelLeft = r.left;
   //         s.pixelTop = r.top;
   //         s.pixelWidth = r.width();
   //         s.pixelHeight = r.height();
   //      }
   //   }
   //
   //   //==========================================================
   //   // HtmlObject, left, top, width, height
   //   //
   //   //==========================================================
   //   MO.RHtml.prototype.setPixelBounds = function RHtml_setPixelBounds(o, l, t, w, h){
   //      if(o && o.style){
   //         var s = o.style;
   //         if(null != l){
   //            s.pixelLeft = l;
   //         }
   //         if(null != t){
   //            s.pixelTop = t;
   //         }
   //         if(null != w){
   //            s.pixelWidth = w;
   //         }
   //         if(null != h){
   //            s.pixelHeight = h;
   //         }
   //      }
   //   }
   //
   //   //==========================================================
   //   // source, target
   //   //
   //   //==========================================================
   //   MO.RHtml.prototype.changeWidth = function RHtml_changeWidth(s, t){
   //      if(s && t){
   //         //var sw = parseInt(s.currentStyle.paddingLeft) + parseInt(s.currentStyle.paddingRight);
   //         var ts = RHtml.currentStyle(t);
   //         var tw = parseInt(ts.paddingLeft) + parseInt(ts.paddingRight);
   //         t.style.pixelWidth = s.offsetWidth - tw;
   //      }
   //   }
   //
   //   //==========================================================
   //   // Html, Object
   //   //
   //   //==========================================================
   //   MO.RHtml.prototype.showNodes = function RHtml_showNodes(h, o){
   //      if(h && h.childNodes){
   //         for(var n=0; n<h.childNodes.length; n++){
   //            var c = h.childNodes(n);
   //            if(c.tagName && c.style){
   //               c.style.display = 'block';
   //            }else if(c.nodeName == '#text'){
   //               c.nodeValue = o[n];
   //            }
   //         }
   //      }
   //   }
   //
   //   //==========================================================
   //   // Html, Object
   //   //
   //   //==========================================================
   //   MO.RHtml.prototype.hideNodes = function RHtml_hideNodes(h, o){
   //      if(h && h.childNodes){
   //         for(var n=0; n<h.childNodes.length; n++){
   //            var c = h.childNodes(n);
   //            if(c.tagName && c.style){
   //               c.style.display = 'none';
   //            }else if(c.nodeName == '#text'){
   //               o[n] = c.nodeValue;
   //               c.nodeValue = '';
   //            }
   //         }
   //      }
   //   }
   //
   //   //==========================================================
   //   //
   //   //==========================================================
   //   MO.RHtml.prototype.showChildren = function RHtml_showChildren(h){
   //      if(h && h.children){
   //         for(var n=0; n<h.children.length; n++){
   //            var c = h.children(n);
   //            if(c.tagName && c.style){
   //               c.style.display = 'block';
   //            }
   //         }
   //      }
   //   }
   //
   //   //==========================================================
   //   //
   //   //==========================================================
   //   MO.RHtml.prototype.hideChildren = function RHtml_hideChildren(h){
   //      if(h && h.children){
   //         for(var n=0; n<h.children.length; n++){
   //            var c = h.children(n);
   //            if(c.tagName && c.style){
   //               c.style.display = 'none';
   //            }
   //         }
   //      }
   //   }
   //
   //   //==========================================================
   //   //
   //   //==========================================================
   //   MO.RHtml.prototype.posParent = function RHtml_posParent(h){
   //      while(h){
   //         if('visible' != h.currentStyle.overflow){
   //            return h;
   //         }
   //         h = h.offsetParent;
   //      }
   //      return null;
   //   }
   //
   //   //==========================================================
   //   //
   //   //==========================================================
   //   MO.RHtml.prototype.form = function RHtml_form(h){
   //      if(h){
   //         var f = this.parent(h, 'FORM');
   //         return f ? f : h.ownerDocument.forms[0];
   //      }
   //      return window.document.forms[0];
   //   }
   //
   //   //==========================================================
   //   // uri, width, height
   //   //==========================================================
   //   MO.RHtml.prototype.popup = function RHtml_popup(u, w, h){
   //      var l = (screen.width - w)/2;
   //      var t = (screen.height - h)/2 - 20;
   //      var s = RString.format('left={0},top={1},width={2},height={3},toolbar=no,location=no,directories=no,status=no,menubar=no,resizable=yes,scrollbars=yes,dependent=yes', l, t, w, h);
   //      window.open(u, '_blank', s);
   //   }
   //
   //   //==========================================================
   //   // 可以获得一些保护内容的值
   //   //==========================================================
   //   MO.RHtml.prototype.selectText = function RHtml_selectText(){
   //      var ip = document.getElementById(id);
   //      ip.select();
   //      return document.selection.createRange().text;
   //   }
   //
   //
   //   MO.RHtml.getTRNode = function getTRNode(nowTR, sibling) {
   //      while(nowTR = nowTR[sibling]){
   //         if(nowTR.tagName == 'TR'){
   //            break;
   //         }
   //      }
   //      return nowTR;
   //   }
}