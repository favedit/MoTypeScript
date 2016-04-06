import {Dictionary} from './runtime/common/lang/Dictionary';
import {ClassUtil} from './runtime/common/reflect/ClassUtil';
import {React} from './plugin/dui/React';
import {RenderContext} from './plugin/dui/RenderContext';
import {FrameSet as BaseFrameSet} from './plugin/dui/frame/FrameSet';

export class FrameSet extends BaseFrameSet {
   //    o._activeGuid           = null;
   //    o._activeCode           = null;
   public activePropertyFrame;
   // @attribute
   public propertyContainer;

   public _propertyFrames: Dictionary<any>;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this._propertyFrames = new Dictionary<any>();
   }

   //==========================================================
   // <T>创建一个控件容器。</T>
   //
   // @param context 环境信息
   //==========================================================
   public onBuildPanel(context: RenderContext) {
      super.onBuildPanel(context);
      // 设置样式
      var hPanel = this._hPanel;
      hPanel.style.width = '100%';
      hPanel.style.height = '100%';
   }

   //==========================================================
   // <T>根据名称获得属性页面。</T>
   //
   // @param code 代码
   // @return 页面
   //==========================================================
   public findPropertyFrame(clazz) {
      var frameName = ClassUtil.shortName(clazz);
      var frame = this._propertyFrames.get(frameName);
      if (!frame) {
         frame = React.build(this.renderContext, clazz);
         //frame._frameSet = this;
         this._propertyFrames.set(frameName, frame);
      }
      return frame;
   }

   //==========================================================
   // <T>获得属性页面集合。</T>
   //
   // @return 页面集合
   //==========================================================
   public propertyFrames() {
      return this._propertyFrames;
   }

   //==========================================================
   // <T>隐藏属性界面集合。</T>
   //==========================================================
   public hidePropertyFrames() {
      var frames = this._propertyFrames;
      var count = frames.count();
      for (var i = 0; i < count; i++) {
         var frame = frames.at(i);
         //this.propertyContainer.removeChild(frame);
         frame.hide();
      }
   }

   //==========================================================
   // <T>隐藏属性界面集合。</T>
   //==========================================================
   public selectFrame(clazz) {
      // 隐藏激活页面
      var activeFrame = this.activePropertyFrame;
      if (activeFrame) {
         this.propertyContainer.removeChild(activeFrame);
      }
      // 显示选择页面
      var frame = this.findPropertyFrame(clazz);
      this.propertyContainer.appendChild(frame);
      this.activePropertyFrame = frame;
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      // 清空属性
      //this._activeSpace = null;
      // 释放属性集合
      var frames = this._propertyFrames;
      var count = frames.count();
      for (var i = 0; i < count; i++) {
         var frame = frames.at(i);
         frame.dispose();
      }
      //this._propertyFrames = MO.Lang.Object.dispose(this._propertyFrames);
      // 父处理
      super.dispose();
   }
}