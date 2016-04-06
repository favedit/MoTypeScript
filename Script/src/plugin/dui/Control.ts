import {DataTypeEnum} from './runtime/common/lang/DataTypeEnum';
import {Fatal} from './runtime/common/lang/Fatal';
import {Listeners} from './runtime/common/lang/Listeners';
import {StringUtil} from './runtime/common/lang/StringUtil';
import {LoggerUtil} from './runtime/common/lang/LoggerUtil';
import {AnnotationEnum} from './runtime/common/reflect/AnnotationEnum';
import {Property} from './runtime/common/reflect/Property';
import {PropertyAnnotation} from './runtime/common/reflect/PropertyAnnotation';
import {ClassUtil} from './runtime/common/reflect/ClassUtil';
import {Point2} from './runtime/common/math/Point2';
import {Size2} from './runtime/common/math/Size2';
import {AssertUtil} from './runtime/common/AssertUtil';
import {ServiceUtil} from './runtime/core/ServiceUtil';
import {EventEnum} from './runtime/ui/EventEnum';
import {DockEnum} from './runtime/ui/DockEnum';
import {AnchorEnum} from './runtime/ui/AnchorEnum';
import {PanelEnum} from './runtime/ui/PanelEnum';
import {SizeEnum} from './runtime/ui/SizeEnum';
import {LayoutEnum} from './runtime/ui/LayoutEnum';
import {EventService} from './runtime/ui/service/EventService';
import {DispatchEvent} from './runtime/ui/event/DispatchEvent';
import {HtmlUtil} from './runtime/ui/utility/HtmlUtil';
import {BuilderUtil} from './runtime/ui/utility/BuilderUtil';
import {RenderContext} from './RenderContext';
import {Component} from './Component';
import {Render} from './Render';

// import {Event} from './event/Event';

//==========================================================
// <T>控件的基类。</T>
// <P>支持控件的样式、建立、显示、设计、模式功能。</P>
//
//  hParent<TAG>
// ┌-------------------┐
// │ hContainer<DIV>   │
// │┌---------------┐│
// ││Control        ││
// │└---------------┘│
// └-------------------┘
//
// @class
// @author maocy
// @version 141231
//==========================================================
export class Control extends Component {
   // 渲染器
   public renderContext: RenderContext;
   public renderOptionFragment: boolean;
   //..........................................................
   // 是否可见
   public visible: boolean;
   // 是否禁止
   public disable: boolean;
   // 停靠方式
   @Property('dock_cd', DataTypeEnum.Enum, null, DockEnum)
   public dockCd: DockEnum;
   // 锚点方式
   @Property('anchor_cd', DataTypeEnum.Enum, null, AnchorEnum)
   public anchorCd: AnchorEnum;
   public hint: string;
   // 样式
   @Property('style_class', DataTypeEnum.String)
   public styleClass: string;
   // 位置
   @Property('location', DataTypeEnum.Struct, null, Point2)
   protected _location: Point2;
   // 宽度
   @Property('width', DataTypeEnum.String)
   public width: number;
   // 宽度
   @Property('height', DataTypeEnum.String)
   public height: string;
   // 大小
   // @Property('size', DataTypeEnum.Struct, null, Size2)
   // protected _size: Size2;
   // 提示信息
   @Property('hint', DataTypeEnum.String)
   // 不回行
   public nowrap: boolean;
   public foreColor: string;
   public foreFont: string;
   public backColor: string;
   public backFont: string;
   // //..........................................................
   // // @style
   // o._stylePanel = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   // // @style
   // //o._styleDesign = MO.Class.register(o, new MO.AStyle('Design'));
   // // @style
   // //o._styleDesignHover = MO.Class.register(o, new MO.AStyle('DesignHover'));
   // // @style
   // //o._styleDesignDrag  = MO.Class.register(o, new MO.AStyle('DesignDrag'));
   // // @style
   // //o._styleDesignMove  = MO.Class.register(o, new MO.AStyle('DesignMove'));
   // //..........................................................
   // // @attribute
   protected _layoutCd: LayoutEnum;
   protected _sizeCd: SizeEnum;
   // @attribute
   // 构建状态
   protected _statusBuild: boolean;
   // 可见状态
   protected _statusVisible: boolean;
   // 允许状态
   protected _statusEnable: boolean;
   // protected _statusBuilded = false;
   // o._storage = null;
   // //o._events      = null;
   //..........................................................
   // @html 父容器
   protected _hParent: HTMLElement;
   // @html 面板容器
   protected _hPanel: any;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this.renderOptionFragment = true;
      this.visible = true;
      this.dockCd = DockEnum.LeftTop;
      this.anchorCd = AnchorEnum.None;
      this._location = new Point2();
      //this._size = new Size2();
      this._layoutCd = LayoutEnum.Display;
      this._sizeCd = SizeEnum.Normal;
      this._statusVisible = true;
      this._statusEnable = true;
   }

   //==========================================================
   // <T>设置属性集合。</T>
   //
   // @params name 属性名称
   // @params value 属性内容
   //==========================================================
   // public setAttribute(name: string, value: string) {
   // }

   //==========================================================
   // <T>创建一个控件容器。</T>
   // <P>默认为DIV页面元素。</P>
   //
   // @param context 环境信息
   //==========================================================
   public onBuildListeners(context: RenderContext) {
      // 事件绑定处理
      var clazz = ClassUtil.get(this.constructor);
      var annotations = clazz.findAnnotations(AnnotationEnum.Property);
      if (annotations) {
         var parentComponent = context.parentComponent;
         var count = annotations.count();
         for (var n = 0; n < count; n++) {
            var annotation: PropertyAnnotation = <PropertyAnnotation>annotations.at(n);
            if (annotation.dataCd == DataTypeEnum.Listeners) {
               // 获得监听处理
               var dataName = annotation.dataName;
               var dataValue = this.properties.get(dataName);
               var invoker = parentComponent[dataValue];
               if (invoker) {
                  var name = annotation.name;
                  // 创建监听器
                  var listeners: Listeners = this[name];
                  if (!listeners) {
                     listeners = this[name] = new Listeners(this);
                  }
                  // 注册监听器
                  listeners.register(parentComponent, invoker);
                  LoggerUtil.debug(this, 'Register listener. (name={1}, data_name={2}, invoker={3})', name, dataName, dataValue);
               }
            }
         }
      }
   }

   //==========================================================
   // <T>创建一个控件容器。</T>
   // <P>默认为DIV页面元素。</P>
   //
   // @param context 环境信息
   //==========================================================
   public onBuildPanel(context: RenderContext) {
      if (this.renderOptionFragment) {
         this._hPanel = context.createFragment();
      } else {
         this._hPanel = context.createDiv(this.styleName('Panel'));
      }
   }

   //==========================================================
   // <T>建立显示框架。</T>
   //
   // @param context 参数集合
   //==========================================================
   public onBuild(context: RenderContext) {
      this.renderContext = context;
      // 建立事件监听
      this.onBuildListeners(context);
      // 建立控件容器
      this.onBuildPanel(context);
      // // 设置可见性
      // if (this._statusVisible != this._visible) {
      //    this.setVisible(this._visible);
      // }
      // // 设置容器样式
      var hPanel = this._hPanel;
      // HtmlUtil.linkSet(hPanel, 'control', this);
      // // 关联容器事件
      this.attachEvent(hPanel, EventEnum.Enter, this.onEnter);
      this.attachEvent(hPanel, EventEnum.Leave, this.onLeave);
      // this.attachEvent('onMouseOver', h);
      // this.attachEvent('onMouseOut', h);
      // this.attachEvent('onMouseDown', h);
      // this.attachEvent('onMouseUp', h);
      // this.attachEvent('onClick', h);
      // this.attachEvent('onDoubleClick', h);
      // this.attachEvent('onKeyDown', h);
      // this.attachEvent('onKeyPress', h);
      // this.attachEvent('onKeyUp', h);
      // this.attachEvent('onResize', h);
      // // 设置容器位置 / 大小 / 空白
      this.setSize(this.width, this.height);
      // this.refreshBounds();
      // this.refreshPadding();
      // this.refreshMargin();
      // 如果父容器是可以容纳控件的，则将自己添加到父容器
      // if (MO.Class.isClass(this.parent, MContainer)) {
      //    this.parent.appendChild(this);
      // }
   }

   //==========================================================
   // <T>判断当前控件是否显示。</T>
   //
   // @return 是否显示
   //==========================================================
   public isVisible() {
      return this._statusVisible;
   }

   //==========================================================
   // <T>设置控件的隐藏和显示。</T>
   //
   // @param visible 是否显示
   //==========================================================
   public setVisible(visible: boolean) {
      var hPanel = this._hPanel;
      if (hPanel) {
         HtmlUtil.visibleSet(hPanel, visible);
      }
      this._statusVisible = visible;
   }

   //==========================================================
   // <T>显示状态切换。</T>
   //==========================================================
   public show() {
      if (!this._statusVisible) {
         this.setVisible(true);
      }
   }

   //==========================================================
   // <T>隐藏状态切换。</T>
   //==========================================================
   public hide() {
      if (this._statusVisible) {
         this.setVisible(false);
      }
   }

   //==========================================================
   // <T>判断当前控件是否可以操作。</T>
   //
   // @return 是否可以
   //==========================================================
   public isEnable() {
      return this._statusEnable;
   }

   //==========================================================
   // <T>设置控件的可操作和禁止。</T>
   //
   // @param enable 是否可操作
   //==========================================================
   public setEnable(enable) {
      var hPanel = this._hPanel;
      if (hPanel) {
         hPanel.style.disabled = !enable;
      }
      this._statusEnable = enable;
   }

   //==========================================================
   // <T>可操作状态切换。</T>
   //==========================================================
   public enable() {
      if (!this._statusEnable) {
         this.setEnable(true);
      }
   }

   // //==========================================================
   // // <T>获得宽度。</T>
   // //
   // // @return 宽度
   // //==========================================================
   // public width() {
   //    return this._size.width;
   // }

   //==========================================================
   // <T>设置宽度。</T>
   //
   // @param width 宽度
   //==========================================================
   public setWidth(width) {
      this.setSize(width, null);
   }

   // //==========================================================
   // // <T>获得高度。</T>
   // //
   // // @return 高度
   // //==========================================================
   // public height() {
   //    return this._size.width;
   // }

   //==========================================================
   // <T>设置高度。</T>
   //
   // @param height 高度
   //==========================================================
   public setHeight(height) {
      this.setSize(null, height);
   }

   // //==========================================================
   // // <T>获得大小。</T>
   // //
   // // @method
   // // @return SSize2 大小
   // //==========================================================
   // public get size() {
   //    return this._size;
   // }

   //==========================================================
   // <T>设置大小。</T>
   //
   // @method
   // @param width:Number 宽度
   // @param height:Number 高度
   //==========================================================
   public setSize(width, height) {
      var hPanel = this.getPanel(PanelEnum.Size);
      // 设置宽度
      if (width != null) {
         //this._size.width = width;
         //if (hPanel && !hPanel.__fragment) {
         if (hPanel) {
            if (hPanel.tagName == 'TD') {
               if (width != 0) {
                  (hPanel as any).width = width;
               }
            } else {
               if (StringUtil.contains(width, '%')) {
                  hPanel.style.width = width;
               } else {
                  hPanel.style.width = (width == 0) ? null : width + 'px';
               }
            }
         }
      }
      // 设置高度
      if (height != null) {
         //this._size.height = height;
         //if (hPanel && !hPanel.__fragment) {
         if (hPanel) {
            if (hPanel.tagName == 'TD') {
               if (height != 0) {
                  (hPanel as any).height = height;
               }
            } else {
               if (StringUtil.contains(height, '%')) {
                  hPanel.style.height = height;
               } else {
                  hPanel.style.height = (height == 0) ? null : height + 'px';
               }
            }
         }
      }
   }

   //==========================================================
   // <T>禁止状态切换。</T>
   //==========================================================
   // public disable() {
   //    if (this._statusEnable) {
   //       this.setEnable(false);
   //    }
   // }

   //==========================================================
   // <T>获得定义的样式名称。</T>
   // <P>样式不存在的话，产生例外。</P>
   //
   // @param name 名称
   // @param clazz 类对象
   // @return String 样式名称
   //==========================================================
   public styleName(name: string, clazz?: Function) {
      var findClazz = clazz ? clazz : this;
      var className = ClassUtil.shortName(findClazz);
      return className + '_' + name;
      //var clazz = ClassUtil.forName(className);
      //return clazz.style(name);
   }

   // //==========================================================
   // // <T>获得定义的样式图标名称。</T>
   // //
   // // @param name:String 名称
   // // @param method:Function 类对象
   // // @return String 图标名称
   // //==========================================================
   // public styleIcon(name, method) {
   //    //var className = MO.Class.name(method ? method : this, true);
   //    //return className + '_' + name;
   // }

   // //==========================================================
   // // <T>获得定义的样式图标路径。</T>
   // //
   // // @param name:String 名称
   // // @param method:Function 类对象
   // // @return String 图标路径
   // //==========================================================
   // public styleIconPath(name, method) {
   //    //var className = MO.Class.name(method ? method : this, true);
   //    //var iconName = className + '_' + name;
   //    //return MO.RResource.iconPath(iconName);
   // }

   //==========================================================
   // <T>根据底板类型得到相应的页面元素。</T>
   //
   // @param panelCd 底板类型
   // @return 页面元素
   //==========================================================
   public getPanel(panelCd: PanelEnum): HTMLElement {
      switch (panelCd) {
         case PanelEnum.Parent:
            return this._hParent;
         case PanelEnum.Panel:
         case PanelEnum.Container:
         case PanelEnum.Size:
            return this._hPanel;
         default:
            throw new Fatal(this, 'Unknown panel type.');
      }
   }

   //==========================================================
   // <T>根据类型设置控件的页面元素。</T>
   //
   // @param panelCd 底板类型
   // @param hPanel 页面元素
   //==========================================================
   public setPanel(panelCd: PanelEnum, hPanel: HTMLElement) {
      switch (panelCd) {
         case PanelEnum.Parent:
            this._hParent = hPanel;
            break;
         default:
            throw new Fatal(this, 'Unknown panel type.');
      }
   }

   //==========================================================
   // <T>设置控件的父页面元素。</T>
   //
   // @param hParent 父页面元素
   //==========================================================
   public setParentPanel(hParent: HTMLElement) {
      this._hParent = hParent;
      if (hParent) {
         hParent.appendChild(this._hPanel);
      }
   }

   //==========================================================
   // <T>将一个页面元素和已经注册过的事件相关联。</T>
   // <P>如果指定了立即函数，则发生事件时，会立即执行立即函数。
   //    该立即函数的this指针指向当前控件实例。</P>
   // <P>如果存在注册过的队列函数，则发生事件时，该事件被排到队列中等待执行。
   //    执行时该函数的this指针指向当前控件实例。</P>
   //
   // @param name 注册过的事件名称
   // @param hTag 页面元素
   // @param method 立即函数
   // @param capture 捕捉
   // @return TEvent 关联的事件对象
   //==========================================================
   public attachEvent(hTag: any, eventCd: string, method: Function = null, capture: boolean = false) {
      var eventService: EventService = ServiceUtil.find(EventService);
      eventService.attachEvent(this, hTag, eventCd, method, capture);
   }

   //==========================================================
   // <T>当该控件获得热点时的处理</T>
   //
   // @param e:event:TEvent 事件对象
   //==========================================================
   public onEnter(sender, event) {
      // MO.Console.find(MO.FDuiFocusConsole).enter(this);
      // if (this._hint) {
      //    MO.RWindow.setStatus(this._hint);
      // }
   }

   //==========================================================
   // <T>当该控件失去热点时的处理</T>
   //
   // @param e:event:TEvent 事件对象
   //==========================================================
   public onLeave(sender, event) {
      // MO.Console.find(MO.FDuiFocusConsole).leave(this);
      // if (this._hint) {
      //    MO.RWindow.setStatus();
      // }
   }

   //==========================================================
   // <T>构建处理。</T>
   //
   // @param context 环境
   //==========================================================
   public render(): any {
      return null;
   }

   //==========================================================
   // <T>构建处理。</T>
   //
   // @param context 环境
   //==========================================================
   public build(context: RenderContext) {
      AssertUtil.debugNotNull(context);
      if (!this._statusBuild) {
         // 构建处理
         this.renderContext = context;
         this.onBuild(context);
         // 设置状态
         this._statusBuild = true;
      }
   }

   //==========================================================
   // <T>构建处理。</T>
   //
   // @param context 环境
   //==========================================================
   public builded() {
   }

   // //==========================================================
   // // <T>控件模式变更处理。</T>`
   // //
   // // @method
   // // @param event:SUiDispatchEvent 事件信息
   // // @return EEventStatus 处理状态
   // //==========================================================
   // public oeMode(event) {
   //    // this._modeCd = event.modeCd;
   //    // return MO.EEventStatus.Continue;
   // }

   // //==========================================================
   // // <T>获得指定类型的父控件。</T>
   // //
   // // @method
   // // @param c:class:Class 类
   // // @return FDuiControl 父控件
   // //==========================================================
   // public topControl(c) {
   //    var r = this;
   //    if (c) {
   //       while (r._parent) {
   //          if (MO.Class.isClass(r._parent, c)) {
   //             return r._parent;
   //          }
   //          r = r._parent;
   //       }
   //       if (!MO.Class.isClass(r, c)) {
   //          return null;
   //       }
   //    } else {
   //       while (r._parent) {
   //          if (!MO.Class.isClass(r._parent, FDuiControl)) {
   //             break;
   //          }
   //          r = r._parent;
   //       }
   //    }
   //    return r;
   // }

   // //==========================================================
   // // <T>设置填充空白。</T>
   // //
   // // @method
   // // @param left:Integer 左空白
   // // @param top:Integer 上空白
   // // @param right:Integer 右空白
   // // @param bottom:Integer 下空白
   // //==========================================================
   // public setMargin(left, top, right, bottom) {
   //    var o = this;
   //    var padding = o._padding;
   //    var hPanel = o.panel(MO.EPanel.Container);
   //    // 获得样式
   //    var hStyle = null;
   //    if (hPanel && !hPanel.__fragment) {
   //       hStyle = hPanel.style;
   //    }
   //    // 设置左空白
   //    if (left != null) {
   //       padding.left = left;
   //       if (hStyle) {
   //          hStyle.marginLeft = (left == 0) ? null : left + 'px';
   //       }
   //    }
   //    // 设置上空白
   //    if (top != null) {
   //       padding.top = top;
   //       if (hStyle) {
   //          hStyle.marginTop = (top == 0) ? null : top + 'px';
   //       }
   //    }
   //    // 设置右空白
   //    if (right != null) {
   //       padding.right = right;
   //       if (hStyle) {
   //          hStyle.marginRight = (right == 0) ? null : right + 'px';
   //       }
   //    }
   //    // 设置下空白
   //    if (bottom != null) {
   //       padding.bottom = bottom;
   //       if (hStyle) {
   //          hStyle.marginBottom = (bottom == 0) ? null : bottom + 'px';
   //       }
   //    }
   // }

   // //==========================================================
   // // <T>刷新填充空白。</T>
   // //
   // // @method
   // //==========================================================
   // public refreshMargin() {
   //    var o = this;
   //    var p = o._margin;
   //    o.setMargin(p.left, p.top, p.right, p.bottom);
   // }

   // //==========================================================
   // // <T>设置填充空白。</T>
   // //
   // // @method
   // // @param left:Integer 左空白
   // // @param top:Integer 上空白
   // // @param right:Integer 右空白
   // // @param bottom:Integer 下空白
   // //==========================================================
   // public setPadding(left, top, right, bottom) {
   //    var o = this;
   //    var padding = o._padding;
   //    var hPanel = o.panel(MO.EPanel.Container);
   //    // 获得样式
   //    var hStyle = null;
   //    if (hPanel && !hPanel.__fragment) {
   //       hStyle = hPanel.style;
   //    }
   //    // 设置左空白
   //    if (left != null) {
   //       padding.left = left;
   //       if (hStyle) {
   //          hStyle.paddingLeft = (left == 0) ? null : left + 'px';
   //       }
   //    }
   //    // 设置上空白
   //    if (top != null) {
   //       padding.top = top;
   //       if (hStyle) {
   //          hStyle.paddingTop = (top == 0) ? null : top + 'px';
   //       }
   //    }
   //    // 设置右空白
   //    if (right != null) {
   //       padding.right = right;
   //       if (hStyle) {
   //          hStyle.paddingRight = (right == 0) ? null : right + 'px';
   //       }
   //    }
   //    // 设置下空白
   //    if (bottom != null) {
   //       padding.bottom = bottom;
   //       if (hStyle) {
   //          hStyle.paddingBottom = (bottom == 0) ? null : bottom + 'px';
   //       }
   //    }
   // }

   // //==========================================================
   // // <T>刷新填充空白。</T>
   // //
   // // @method
   // //==========================================================
   // public refreshPadding() {
   //    var o = this;
   //    var p = o._padding;
   //    o.setPadding(p.left, p.top, p.right, p.bottom);
   // }

   // //==========================================================
   // // <T>将一个页面元素和已经注册过的事件相关联。</T>
   // // <P>如果指定了立即函数，则发生事件时，会立即执行立即函数。
   // //    该立即函数的this指针指向当前控件实例。</P>
   // // <P>如果存在注册过的队列函数，则发生事件时，该事件被排到队列中等待执行。
   // //    执行时该函数的this指针指向当前控件实例。</P>
   // //
   // // @method
   // // @param name:String 注册过的事件名称
   // // @param hTag:HtmlTag 页面元素
   // // @param method:Function 立即函数
   // // @param capture:Boolean 捕捉
   // // @return TEvent 关联的事件对象
   // //==========================================================
   // public attachEvent(name, hTag, method, capture) {
   //    return MO.Dui.Control.attachEvent(this, name, hTag, method, capture);
   // }

   // //==========================================================
   // // <T>将一个页面元素和已经注册过的事件相关联。</T>
   // // <P>如果指定了立即函数，则发生事件时，会立即执行立即函数。
   // //    该立即函数的this指针指向到达者控件实例。
   // //    可以通过事件对象的发出者访问到该发出对象。</P>
   // // <P>如果存在注册过的队列函数，则发生事件时，该事件被排到队列中等待执行。
   // //    执行时该函数的this指针指向到达者控件实例。
   // //    可以通过事件对象的发出者访问到该发出对象。</P>
   // //
   // // @method
   // // @param control:FDuiControl 控件
   // // @param name:String 注册过的事件名称
   // // @param hTag:HtmlTag 页面元素
   // // @param method:Function 立即函数
   // // @param capture:Boolean 是否捕捉
   // // @return TEvent 关联的事件对象
   // //==========================================================
   // public linkEvent(control, name, hTag, method, capture) {
   //    return MO.Dui.Control.linkEvent(this, control, name, hTag, method, capture);
   // }

   // //==========================================================
   // // <T>调用控件的关联事件。</T>
   // //
   // // @method
   // // @param name:String 事件名称
   // // @param source:FDuiControl 事件源
   // // @param event:TEvent 事件对象
   // //==========================================================
   // public callEvent(name, source, event) {
   //    var o = this;
   //    var es = o._events;
   //    if (es) {
   //       var ec = es.get(name);
   //       if (ec) {
   //          ec.invoke(source, source, event);
   //       }
   //    }
   // }

   // //==========================================================
   // // <T>判断是否已经构建。</T>
   // //
   // // @method
   // // @return Boolean 是否构建
   // //==========================================================
   // public isBuild() {
   //    return this._statusBuild;
   // }

   // //==========================================================
   // // <T>构建完成处理。</T>
   // //
   // // @method
   // // @param p:html:HtmlTag 页面元素
   // //==========================================================
   // public builded(p) {
   //    var o = this;
   //    // 检查状态
   //    if (!o._statusBuild) {
   //       throw new MO.TError(o, 'Current control is not build.');
   //    }
   //    // 检查完成状态
   //    if (o._statusBuilded) {
   //       throw new MO.TError(o, 'Current control is already builded.');
   //    }
   //    // 构建完成处理
   //    o.onBuilded(p);
   //    // 设置状态
   //    o._statusBuilded = true;
   // }

   // //==========================================================
   // // <T>刷新处理。</T>
   // // <P>构件后，重新加载内容时，需要刷新处理。</P>
   // //
   // // @method
   // //==========================================================
   // public refresh() {
   //    var o = this;
   //    // 检查状态
   //    if (!o._statusBuild) {
   //       throw new MO.TError(o, 'Current control is not build.');
   //    }
   // }

   //==========================================================
   // <T>分发改变控件可操作和禁止的事件。</T>
   //
   // @method
   // @param enable:Boolean 是否允许
   // //==========================================================
   // public processEnable(enable) {
   //    var o = this;
   //    // 创建事件
   //    var event = o._eventEnable;
   //    if (!event) {
   //       event = o._eventEnable = new MO.SUiDispatchEvent(o, 'oeEnable', MO.MUiControl);
   //    }
   //    event.enable = enable;
   //    // 处理消息
   //    o.process(event);
   // }

   // //==========================================================
   // // <T>分发改变控件隐藏和显示的事件。</T>
   // //
   // // @method
   // // @param visible:Boolean 是否可见
   // //==========================================================
   // public processVisible(visible) {
   //    var o = this;
   //    // 创建事件
   //    var event = o._eventVisible;
   //    if (!event) {
   //       event = o._eventVisible = new MO.SUiDispatchEvent(o, 'oeVisible', MO.MUiControl);
   //    }
   //    event.visible = visible;
   //    // 处理消息
   //    o.process(event);
   // }

   //==========================================================
   // <T>分发改变控件大小的事件。</T>
   //
   // @method
   //==========================================================
   public processResize(parameters?: any) {
      // 创建事件
      var event = new DispatchEvent();
      event.invoke = 'oeResize';
      event.clazz = Control;
      event.owner = this;
      event.parameters = parameters;
      // 处理消息
      this.process(event);
   }

   // //==========================================================
   // // <T>分发控件刷新的事件。</T>
   // //
   // // @method
   // //==========================================================
   // public processRefresh() {
   //    var o = this;
   //    // 创建事件
   //    var event = o._eventRefresh;
   //    if (!event) {
   //       event = o._eventRefresh = new MO.SUiDispatchEvent(o, 'oeRefresh', MO.MUiControl);
   //    }
   //    // 处理消息
   //    o.process(event);
   // }

   // //==========================================================
   // // <T>分发控件帧的事件。</T>
   // //
   // // @method
   // //==========================================================
   // public processFrame() {
   //    // 创建事件
   //    var event = this._eventFrame;
   //    if (!event) {
   //       event = this._eventFrame = new MO.SUiDispatchEvent(this, 'oeFrame', MO.MUiControl);
   //    }
   //    // 处理消息
   //    this.process(event);
   // }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      // 释放属性
      // this._disable = null;
      // this._hint = null;
      // // 释放属性
      // this._styleContainer = null;
      // // 释放属性
      // this._statusVisible = null;
      // this._statusEnable = null;
      // this._statusBuild = null;
      // // 释放属性
      // this._hParent = null;
      // this._hPanel = MO.Window.Html.free(this._hPanel);
      // 释放处理
      super.dispose();
   }
}